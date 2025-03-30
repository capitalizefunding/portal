import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, Clock, AlertCircle, Search, Filter } from "lucide-react"

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-vectora-bold tracking-tight">Applications</h2>
          <p className="text-muted-foreground font-vectora-roman">Manage your client applications</p>
        </div>
        <Link href="/dashboard/applications/new">
          <Button className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand">
            <FileText className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>All Applications</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search applications..."
                  className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm font-vectora-roman"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 text-sm font-medium text-muted-foreground">
              <div>Client</div>
              <div>Date</div>
              <div>Amount</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>

            <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
              <div>
                <div className="font-medium">Acme Corp</div>
                <div className="text-xs text-muted-foreground">Business Expansion</div>
              </div>
              <div>Mar 24, 2025</div>
              <div>$75,000</div>
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>Approved</span>
              </div>
              <div className="flex justify-end gap-2">
                <Link href="/dashboard/applications/view">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
              <div>
                <div className="font-medium">Globex Inc</div>
                <div className="text-xs text-muted-foreground">Equipment Financing</div>
              </div>
              <div>Mar 22, 2025</div>
              <div>$125,000</div>
              <div className="flex items-center gap-1 text-amber-600">
                <Clock className="h-4 w-4" />
                <span>In Review</span>
              </div>
              <div className="flex justify-end gap-2">
                <Link href="/dashboard/applications/view">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
              <div>
                <div className="font-medium">Stark Industries</div>
                <div className="text-xs text-muted-foreground">Working Capital</div>
              </div>
              <div>Mar 20, 2025</div>
              <div>$50,000</div>
              <div className="flex items-center gap-1 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>Needs Info</span>
              </div>
              <div className="flex justify-end gap-2">
                <Link href="/dashboard/applications/view">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
                <Link href="/dashboard/applications/edit">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
              <div>
                <div className="font-medium">Wayne Enterprises</div>
                <div className="text-xs text-muted-foreground">Real Estate</div>
              </div>
              <div>Mar 18, 2025</div>
              <div>$200,000</div>
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>Approved</span>
              </div>
              <div className="flex justify-end gap-2">
                <Link href="/dashboard/applications/view">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-5 items-center gap-4 text-sm">
              <div>
                <div className="font-medium">Umbrella Corp</div>
                <div className="text-xs text-muted-foreground">Inventory Financing</div>
              </div>
              <div>Mar 15, 2025</div>
              <div>$85,000</div>
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>Approved</span>
              </div>
              <div className="flex justify-end gap-2">
                <Link href="/dashboard/applications/view">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground font-vectora-roman">Showing 5 of 24 applications</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

