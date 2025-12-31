import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/lazor/Providers";


export const metadata: Metadata = {
  title: "LazorKit SDK Demo",
  description: "A Next.js application showcasing LazorKit's biometric authentication and gasless transaction features on Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
