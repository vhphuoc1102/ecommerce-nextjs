import React from "react";
import {Separator} from "@/components/ui/separator";
import {Card, CardContent} from "@/components/ui/card";
import SidebarNav from "@/app/(pages)/(web)/profile/components/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Order",
    href: "/profile/order",
  },
  {
    title: "Order History",
    href: "/profile/order-history",
  },
  {
    title: "Settings",
    href: "/profile/settings",
  }
]

export default function ProfileLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
      <Card className="w-full">
        <CardContent className="w-full">
          <div className="hidden space-y-6 p-10 pb-16 md:block">
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">Preferences</h2>
              <p className="text-muted-foreground">
                Access and manage your profile, view order history, and update settings.
              </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="-mx-4 lg:w-1/5 lg:flex-none">
                <SidebarNav items={sidebarNavItems} />
              </aside>
              <div className="flex-1 lg:grow">{children}</div>
            </div>
          </div>
        </CardContent>
      </Card>
  );
}
