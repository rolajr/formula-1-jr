import type { Metadata } from 'next';
import { Inter, Rajdhani, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const rajdhani = Rajdhani({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Formula 1 App | Live Standings, Drivers & Race Results',
  description:
    'Your ultimate Formula 1 companion. Track live standings, explore driver profiles, view race schedules, and dive into F1 statistics and history.',
  keywords: [
    'Formula 1',
    'F1',
    'Racing',
    'Standings',
    'Drivers',
    'Teams',
    'Grand Prix',
    'Motorsport',
  ],
  authors: [{ name: 'Formula 1 Fan App' }],
  creator: 'Formula 1 Fan App',
  publisher: 'Formula 1 Fan App',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://formula1app.com',
    title: 'Formula 1 App | Live Standings, Drivers & Race Results',
    description:
      'Your ultimate Formula 1 companion. Track live standings, explore driver profiles, and more.',
    siteName: 'Formula 1 App',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Formula 1 App | Live Standings, Drivers & Race Results',
    description:
      'Your ultimate Formula 1 companion. Track live standings, explore driver profiles, and more.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add verification tokens when available
    // google: 'your-google-verification-token',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${rajdhani.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex flex-col min-h-screen">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-red-500 focus:text-light-50 focus:rounded-lg"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
