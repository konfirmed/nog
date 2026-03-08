const CACHE_VERSION = 'nog-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const API_CACHE = `${CACHE_VERSION}-api`;

// App shell resources to pre-cache
const PRECACHE_URLS = [
  '/',
  '/names',
  '/graph',
  '/manifest.webmanifest',
];

// Install: pre-cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key.startsWith('nog-') && !key.startsWith(CACHE_VERSION))
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests except for Supabase API and Bible API
  if (url.origin !== self.location.origin) {
    if (url.hostname.includes('supabase.co') || url.hostname.includes('bible-api.com')) {
      event.respondWith(networkFirstWithCache(request, API_CACHE));
    }
    return;
  }

  // Static assets (_next/static): cache-first (immutable, hashed filenames)
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // HTML pages: network-first with cache fallback
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirstWithCache(request, DYNAMIC_CACHE));
    return;
  }

  // Everything else (fonts, images, etc.): stale-while-revalidate
  event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
});

// Cache-first: return cached version, only fetch if not cached
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Network-first: try network, fall back to cache
async function networkFirstWithCache(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;

    // Offline fallback for HTML pages
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('/');
    }

    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Stale-while-revalidate: return cached immediately, update cache in background
async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        caches.open(cacheName).then((cache) => cache.put(request, response.clone()));
      }
      return response;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}
