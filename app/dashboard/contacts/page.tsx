import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Search, Filter, Mail, Phone } from "lucide-react"

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-vectora-bold tracking-tight">Contacts</h2>
          <p className="text-muted-foreground font-vectora-roman">Manage your client contacts</p>
        </div>
        <Link href="/dashboard/contacts/new">
          <Button className="bg-brand-button text-black hover:bg-brand-button/90 rounded-brand">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>All Contacts</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search contacts..."
                  className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm"
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
              <div>Name</div>
              <div>Company</div>
              <div>Email</div>
              <div>Phone</div>
              <div className="text-right">Actions</div>
            </div>

            <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
              <div className="font-medium">John Doe</div>
              <div>Acme Corp</div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>john.doe@acme.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex justify-end gap-2">
                <Link href="/dashboard/contacts/view">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
                <Link href="/dashboard/contacts/edit">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
              <div className="font-medium">Jane Smith</div>
              <div>Globex Inc</div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>jane.smith@globex.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>(555) 234-5678</span>
              </div>
              <div className="flex justify-end gap-2">
                <Link href="/dashboard/contacts/view">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
                <Link href="/dashboard/contacts/edit">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
              <div className="font-medium">Robert Johnson</div>
              <div>Stark Industries</div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>robert@stark.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>(555) 345-6789</span>
              </div>
              <div className="flex justify-end gap-2">
                <Link href="/dashboard/contacts/view">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
                <Link href="/dashboard/contacts/edit">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-5 items-center gap-4 text-sm border-b pb-4">
              <div className="font-medium">Sarah Williams</div>
              <div>Wayne Enterprises</div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>sarah@wayne.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>(555) 456-7890</span>
              </div>
              <div className="flex justify-end gap-2">
                <Link href="/dashboard/contacts/view">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
                <Link href="/dashboard/contacts/edit">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-5 items-center gap-4 text-sm">
              <div className="font-medium">Michael Brown</div>
              <div>Umbrella Corp</div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>michael@umbrella.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>(555) 567-8901</span>
              </div>
              <div className="flex justify-end gap-2">
                <Link href="/dashboard/contacts/view">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
                <Link href="/dashboard/contacts/edit">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Showing 5 of 12 contacts</div>
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

