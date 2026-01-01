import Header from "@/components/layout/Header";
import { Toaster } from "sonner";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abide App",
  description: "Devocionais e Crescimento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <Header />

        <main className="flex-grow container mx-auto">{children}</main>

        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
