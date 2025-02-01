import type { Metadata } from "next";
import "@/app/globals.css";
import React from "react";

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
          {children}
      </>
  );
}
