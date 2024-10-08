import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'], variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "Devstore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
