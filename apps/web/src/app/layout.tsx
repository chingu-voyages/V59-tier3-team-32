import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'Web client',
  description: 'An interview question generator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} antialiased`}>
        <Header />{children}</body>
    </html>
  );
}
