import type { Metadata } from "next";
import { Geist, Roboto } from "next/font/google"; 
import "./globals.css";
import Header from "@/components/shared/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto", 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plants shop",
  description: "Shop of the best plants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${roboto.variable} antialiased`}>
        <main className="min-h-screen">
          <Header className="" />
          {children}
        </main>
      </body>
    </html>
  );
}
