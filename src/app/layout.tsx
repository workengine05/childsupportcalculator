import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  title: {
    default: 'Child Support Calculator – Free Online Tools for Every State',
    template: '%s | State Support',
  },
  description: 'Free, accurate child support calculators for all 50 states. Understand state-specific laws and estimate your monthly support payments.',
  openGraph: {
    title: 'Child Support Calculator – Free Online Tools for Every State',
    description: 'Free, accurate child support calculators for all 50 states. Understand state-specific laws and estimate your monthly support payments.',
    type: 'website',
    url: 'https://childsupportcalculator.org', // Replace with actual domain
    siteName: 'State Support',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="google-site-verification" content="p9MJzu7-iZd5bzD-YHBM840HaChjEN4GEHouHGWEiaY" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
