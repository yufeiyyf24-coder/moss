import type { Metadata } from "next";
import "@fontsource/dm-sans/300.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "./globals.css";
import { TransitionProvider } from "@/lib/transition-context";
import { TransitionEngine } from "@/components/transition-engine";

export const metadata: Metadata = {
  title: "Project Moss",
  description: "A place where ideas grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full font-sans">
        <TransitionProvider>
          {children}
          <TransitionEngine />
        </TransitionProvider>
      </body>
    </html>
  );
}
