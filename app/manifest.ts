import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NAMES of G_D Across Cultures',
    short_name: 'Names of G_D',
    description: 'A collection of names of G_D across different cultures and languages.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a1a1a',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['education', 'reference', 'books'],
    lang: 'en',
    dir: 'ltr',
  };
}
