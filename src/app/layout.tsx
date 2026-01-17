import type { Metadata } from "next";
import { JetBrains_Mono, Red_Hat_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const redHatMono = Red_Hat_Mono({
  variable: "--font-redhat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "OTONOMY LABS — Humanoid Data Infrastructure",
  description: "Factory-embedded data collection for the robotics era. We capture, process, and deliver manipulation trajectories at scale.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Doto:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${jetbrainsMono.variable} ${redHatMono.variable}`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
