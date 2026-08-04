import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { UnauthorizedToast } from "@/components/ui/UnauthorizedToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lyke India - Elevate Your Style",
  description: "Discover the finest collection of fashion, electronics, and home essentials. Elevate your everyday style with Lyke India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex flex-col">
              {children}
            </main>
            <Footer />
          </div>
          <UnauthorizedToast />
        </CartProvider>
      </body>
    </html>
  );
}
