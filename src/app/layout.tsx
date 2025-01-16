import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const sourceCodePro = Source_Code_Pro({
  // variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["400", "700"], // Optional: Choose font weights
});

export const metadata: Metadata = {
  title: "Color Converter | Thesion",
  description: "Convert one web color format to another",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${sourceCodePro.className} antialiased`}
        >
          {children}
          <Analytics />
        </body>
      </Providers>
    </html>
  );
}
