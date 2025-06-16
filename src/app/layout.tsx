import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Html, Head, Main, NextScript } from "next/document";
import { Sidebar } from "@/components/sidebar";

import Providers from "./providers/providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "하하하",
  description: "김수한무",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="flex bg-gray-50">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-white">
            <Providers>{children}</Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
