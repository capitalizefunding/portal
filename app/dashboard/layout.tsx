import type React from "react"
import Link from "next/link"
import Image from "next/image"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Capitalize Funding" width={60} height={60} className="h-10 w-auto" priority />
            <span className="font-vectora-bold">Partner Portal</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/dashboard/applications" className="text-sm font-medium">
              Applications
            </Link>
            <Link href="/dashboard/contacts" className="text-sm font-medium">
              Contacts
            </Link>
            <Link href="/dashboard/account" className="text-sm font-medium">
              Account
            </Link>
            <Link href="/login" className="text-sm font-medium">
              Sign Out
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6 px-4">{children}</div>
      </main>
      <footer className="border-t py-4 bg-gray-50">
        <div className="container flex justify-center text-center text-sm text-gray-500 font-vectora-roman">
          © 2025 Capitalize Funding. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

