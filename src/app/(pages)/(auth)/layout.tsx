import type { Metadata } from "next";
import "@/app/globals.css";
import React from "react";
import ProgressProvider from "@/components/progress-bar-provider";

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Made by Vu Hong Phuoc",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <ProgressProvider>
          {children}
        </ProgressProvider>
      </>
  );
}
