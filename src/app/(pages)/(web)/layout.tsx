import type { Metadata } from "next";
import "@/app/globals.css";
import React from "react";
import NavigationBar from "@/components/layout/web/navigation-bar";
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
      <div>
        <div className="border-b">
          <NavigationBar/>
        </div>
        <div className="max-w-full flex justify-center mt-3">
          <div className="flex justify-between w-[76rem]">
            <ProgressProvider>
              {children}
            </ProgressProvider>
          </div>
        </div>
      </div>
  );
}
