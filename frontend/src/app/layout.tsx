import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Legaci — Your story, in motion.",
  description: "Legaci — a privacy-first memory companion that models your personality and memories.",
  themeColor: "#5B5BD6",
  icons: {
    icon: [
      { url: '/brand/legaci-mark.svg' },
      { url: '/brand/legaci-wordmark.svg' }
    ],
    apple: [{ url: '/brand/legaci-mark.svg' }]
  },
  openGraph: {
    title: "Legaci — Your story, in motion.",
    description: "Legaci — a privacy-first memory companion that models your personality and memories.",
    siteName: "Legaci",
    images: [
      {
        url: "/brand/legaci-preview.svg",
        width: 1200,
        height: 630,
        alt: "Legaci — Your story, in motion."
      }
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}