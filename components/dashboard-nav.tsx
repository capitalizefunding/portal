"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Users, DollarSign, Bell, LogOut, Menu, X, User } from "lucide-react"
import { useState } from "react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Applications",
    href: "/dashboard/applications",
    icon: FileText,
  },
  {
    title: "Contacts",
    href: "/dashboard/contacts",
    icon: Users,
  },
  {
    title: "Commissions",
    href: "/dashboard/commissions",
    icon: DollarSign,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Account",
    href: "/dashboard/account",
    icon: User,
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="flex flex-col h-full">
      <div className="flex lg:hidden items-center justify-between p-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Capitalize Funding" width={60} height={60} className="h-10 w-auto" priority />
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
          {mobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <div className={cn("lg:flex lg:flex-col lg:h-full", mobileNavOpen ? "block" : "hidden lg:block")}>
        <div className="flex h-full flex-col gap-2 p-4 lg:p-6">
          <div className="hidden lg:flex items-center gap-2 px-2 py-4">
            <Link href="/dashboard">
              <Image src="/logo.png" alt="Capitalize Funding" width={60} height={60} className="h-10 w-auto" priority />
            </Link>
          </div>
          <nav className="grid gap-1 px-2 lg:mt-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100",
                  pathname === item.href ? "bg-gray-100 text-brand-green" : "text-gray-500",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Link
              href="/login"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

