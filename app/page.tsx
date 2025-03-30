import { redirect } from "next/navigation"

export default function Home() {
  // Using a more robust approach for the redirect
  return redirect("/login")
}

