import type { Metadata } from "next";
import "@/app/globals.css";
import React from "react";
import {SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/layout/admin/app-sidebar";
import BreadCrumb from "@/components/layout/admin/breadcrumb";

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
      <SidebarProvider>
        <AppSidebar/>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              {/*<BreadCrumb/>*/}
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
  );
}
