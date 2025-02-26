import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/app/providers";
import { BackToTop } from "@/components/back-to-top";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
};

const description =
  "Discover beautiful anime artwork in our responsive gallery. Browse through a diverse collection of high-quality illustrations.";

export const metadata: Metadata = {
  title: {
    template: "Flare | %s",
    default: "Flare",
  },
  description,
  keywords: [
    "anime art",
    "anime gallery",
    "anime artwork",
    "anime illustrations",
    "anime wallpapers",
    "anime artists",
    "digital art",
    "art gallery",
    "image gallery",
    "content rating",
    "curated collection",
    "responsive gallery",
  ],
  authors: [
    {
      name: "Lucas Trecente",
      url: "https://github.com/trecente",
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "Flare",
    description,
    siteName: "Flare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flare",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <BackToTop />
            <Analytics />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
