"use client"

import {cva} from "class-variance-authority";
import { usePathname } from "next/navigation";
import {cn} from "@/libs/utils";
import Link from "next/link";
import React from "react";
import {Separator} from "@/components/ui/separator";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href?: string,
    title: string,
  }[]
}

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
      variants: {
        variant: {
          default:
              "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          destructive:
              "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
          outline:
              "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
          secondary:
              "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-9 px-4 py-2",
          sm: "h-8 rounded-md px-3 text-xs",
          lg: "h-10 rounded-md px-8",
          icon: "h-9 w-9",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
)

export default function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  const handleSignOut = () => {
    // Add your sign-out logic here
    console.log("Sign out clicked");
  }

  return (
      <nav
          className={cn(
              "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
              className
          )}
          {...props}
      >
        {items.map((item) => (
            <Link
                key={item.href}
                href={item.href ?? "/"}
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    pathname === item.href
                        ? "bg-muted hover:bg-muted"
                        : "hover:bg-transparent hover:underline",
                    "justify-start"
                )}
            >
              {item.title}
            </Link>
        ))}
        <Separator/>
        <button
            onClick={handleSignOut}
            className={cn(
                buttonVariants({ variant: "ghost" }),
                "hover:bg-transparent hover:underline justify-start"
            )}
        >
          Sign Out
        </button>
      </nav>
  )
}
