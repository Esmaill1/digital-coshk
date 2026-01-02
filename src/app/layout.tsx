import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Coshk | Instant Digital Codes",
  description: "Buy Steam, PlayStation, Netflix, and software keys instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <head>
        <link rel="preconnect" href="https://humorous-garfish-40.clerk.accounts.dev" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} bg-gray-950 text-white antialiased pb-20 md:pb-0`}>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}