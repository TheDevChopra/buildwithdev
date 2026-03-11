import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "BUILDWITHDEV",
  description: "Product Lab + Blog by Dev Chopra. Building internet products publicly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#E3E2DE]">
      <body className="antialiased min-h-screen flex flex-col font-sans text-[#141414]">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
