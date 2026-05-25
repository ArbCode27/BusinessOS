import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/app/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "BusinessOS | AI Operating System for Commerce",
  description: "A premium SaaS demo for CRM, commerce, automation, analytics and AI support."
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <html lang="en" suppressHydrationWarning>
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
