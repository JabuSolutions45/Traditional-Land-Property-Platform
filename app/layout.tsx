import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Umeli | Customary-land property information",
    template: "%s | Umeli",
  },
  description:
    "Find places and understand property-information review steps for customary and traditional land in South Africa.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
