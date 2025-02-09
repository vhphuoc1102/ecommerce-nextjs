"use client"

import type * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  ShoppingBag,
  Package,
  PersonStanding,
  Smile,
  LayoutDashboard,
  Ribbon,
  ChartColumnStacked,
  Blocks
} from "lucide-react"

import { NavMain } from "@/components/layout/admin/nav-main"
import { NavUser } from "@/components/layout/admin/nav-user"
import { TeamSwitcher } from "@/components/layout/admin/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ]
}

const teams = [
  {
    name: "Product Management",
    logo: Package,
    plan: "",
  },
  {
    name: "Order Management",
    logo: ShoppingBag,
    plan: "",
  },
  {
    name: "Customer Care",
    logo: Smile,
    plan: "",
  },
  {
    name: "Marketing",
    logo: LayoutDashboard,
    plan: "",
  },
  {
    name: "Analytics",
    logo: PieChart,
    plan: "",
  },
  {
    name: "User Management",
    logo: PersonStanding,
    plan: "",
  }
]

const productManagement = [
  {
    title: "Product",
    url: "/dashboard/product",
    icon: Package,
    isActive: true,
  },{
    title: "Attribute",
    url: "",
    icon: Blocks,
    items: [
      {
        title: "Search Attribute",
        url: "attribute",
      },
      {
        title: "Search Group",
        url: "attribute-group",
      }
    ]
  },
  {
    title: "Brand",
    url: "/dashboard/brand",
    icon: Ribbon,
  },
  {
    title: "Category",
    url: "/dashboard/category",
    icon: ChartColumnStacked,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={productManagement} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
  )
}

