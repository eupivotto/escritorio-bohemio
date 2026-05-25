import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Escritório de Bohemio",
  description: "Restaurante com alma. Almoço executivo, eventos e atendimento externo em Campo Grande - MS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${hanken.variable} ${jetbrains.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
          <Header />
          <main className="flex-1 pt-[72px]">{children}</main>
          <Footer />
        </body>
    </html>
  );
}
