import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cardConfig } from "@/config/card.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: cardConfig.seo.title,
  description: cardConfig.seo.description,
  icons: {
    icon: cardConfig.seo.favicon,
  },
  openGraph: {
    title: cardConfig.seo.title,
    description: cardConfig.seo.description,
    images: [{ url: cardConfig.seo.ogImage }],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: cardConfig.seo.title,
    description: cardConfig.seo.description,
    images: [cardConfig.seo.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased selection:bg-indigo-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}