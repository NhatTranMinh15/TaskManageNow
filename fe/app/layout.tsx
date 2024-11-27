import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@/public/css/button.css"
import Header from "./components/Header";
import { Suspense } from "react";
import Loading from "./loading";
import Footer from "./components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Task Manage Now",
  description: "Organize all your tasks here",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header></Header>
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Footer></Footer>
      </body>

    </html>
  );
}
