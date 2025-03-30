export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-vectora-bold tracking-tight">Welcome back, Partner</h2>
          <p className="text-muted-foreground font-vectora-roman">Here's an overview of your referral activity</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Total Applications</p>
          </div>
          <div className="text-2xl font-bold">24</div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Active Contacts</p>
          </div>
          <div className="text-2xl font-bold">12</div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Total Commissions</p>
          </div>
          <div className="text-2xl font-bold">$12,450</div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Approval Rate</p>
          </div>
          <div className="text-2xl font-bold">78%</div>
        </div>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <h3 className="text-lg font-vectora-bold mb-4">Recent Applications</h3>
        <p>Your dashboard content will appear here.</p>
      </div>
    </div>
  )
}

