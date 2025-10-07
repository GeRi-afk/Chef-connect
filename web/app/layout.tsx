import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider  from "@/components/AuthProvider";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chef Connect",
  description: "Connecting chefs and restaurants",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-8rem)] bg-gray-50">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
