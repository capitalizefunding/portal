import type React from "react"
import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col lg:flex-row">
        <aside className="w-full lg:w-64 border-r">
          <DashboardNav />
        </aside>
        <main className="flex-1">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

