import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "NAMES of G_D Across Cultures",
  description: "A collection of names of G_D across different cultures and languages.",
  openGraph: {
    title: "NAMES of G_D Across Cultures",
    description: "A collection of names of G_D across different cultures and languages.",
    url: defaultUrl,
    siteName: "NAMES of G_D Across Cultures",
    images: [
      {
        url: `${defaultUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "NAMES of G_D Across Cultures",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NAMES of G_D Across Cultures",
    description: "A collection of names of G_D across different cultures and languages.",
    images: [`${defaultUrl}/opengraph-image.png`],
    creator: "@vercel",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  verification: {
    google: "google-site-verification=your-google-site-verification-code",
    yandex: "your-yandex-site-verification-code",
    other: {
      name: "example",
      value: "example-verification-code",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    maxSnippet: -1,
    maxImagePreview: "large",
    maxVideoPreview: -1,
    allow: {
      "*": true,
      "/api/*": true,
      "/static/*": true,
    },
    disallow: {
      "/private/*": true,
      "/secret/*": true,
    },
    noindex: false,
    nofollow: false,
    noarchive: false,
    noimageindex: false,
    novideoindex: false,
    noydir: false,
    nosnippet: false,
    notranslate: false,
    noimagepreview: false,
  },
  appleMobileWebAppCapable: "yes",
  appleMobileWebAppStatusBarStyle: "black-translucent",
  applicationName: "NAMES of G_D Across Cultures",
  formatDetection: {  
    telephone: false,
    address: false,
    email: false,
  },
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-5 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>NAMES of G_D</Link>
                    <Link href={"/graph"} className="text-sm font-normal text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                      Relationship Map
                    </Link>
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-20 max-w-5xl p-5">
                {children}
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
