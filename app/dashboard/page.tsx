import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-vectora-bold tracking-tight">Welcome back, Partner</h2>
          <p className="text-muted-foreground font-vectora-roman">Here's an overview of your referral activity</p>
        </div>
        <Link href="/dashboard/applications/new">
          <Button className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand">
            <FileText className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground font-vectora-roman">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground font-vectora-roman">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground font-vectora-roman">+$2,100 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground font-vectora-roman">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Your most recent client applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground">
                <div>Client</div>
                <div>Status</div>
                <div>Amount</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <div>
                  <div className="font-medium">Acme Corp</div>
                  <div className="text-xs text-muted-foreground">Mar 24, 2025</div>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Approved</span>
                </div>
                <div>$75,000</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <div>
                  <div className="font-medium">Globex Inc</div>
                  <div className="text-xs text-muted-foreground">Mar 22, 2025</div>
                </div>
                <div className="flex items-center gap-1 text-amber-600">
                  <Clock className="h-4 w-4" />
                  <span>In Review</span>
                </div>
                <div>$125,000</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <div>
                  <div className="font-medium">Stark Industries</div>
                  <div className="text-xs text-muted-foreground">Mar 20, 2025</div>
                </div>
                <div className="flex items-center gap-1 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>Needs Info</span>
                </div>
                <div>$50,000</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <div>
                  <div className="font-medium">Wayne Enterprises</div>
                  <div className="text-xs text-muted-foreground">Mar 18, 2025</div>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Approved</span>
                </div>
                <div>$200,000</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <div>
                  <div className="font-medium">Umbrella Corp</div>
                  <div className="text-xs text-muted-foreground">Mar 15, 2025</div>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Approved</span>
                </div>
                <div>$85,000</div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <Link href="/dashboard/applications">
                <Button variant="outline" size="sm">
                  View All Applications
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Commission Summary</CardTitle>
            <CardDescription>Your commission earnings overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">This Month</div>
                <div className="font-bold">$2,450</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Last Month</div>
                <div className="font-bold">$3,200</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Quarter to Date</div>
                <div className="font-bold">$7,850</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Year to Date</div>
                <div className="font-bold">$12,450</div>
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <div className="text-sm font-medium">Pending Commissions</div>
                <div className="font-bold text-amber-600">$3,750</div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-brand-green/30">
                <div className="text-center">
                  <div className="text-xl font-bold">78%</div>
                  <div className="text-xs text-muted-foreground">Goal</div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <Link href="/dashboard/commissions">
                <Button variant="outline" size="sm">
                  View Commission Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

