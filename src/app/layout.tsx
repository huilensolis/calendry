import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils/cn";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Calendry",
  description: "open source calendar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${fontSans.variable}`}>
        <main className="min-h-screen bg-background font-sans antialiased flex justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
