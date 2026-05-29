"use client"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"



export default function Dashboard() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession();
  const [items, setItems] = useState<any[]>([])
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/items")
        const data = await res.json();
        setItems(data)
      } catch (error) {
        console.error(`error fetching items from server`, error)
      }
    }
    fetchItems();
  },[])

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push("/login")
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p className="text-lg">Loading session...</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription className="text-zinc-400">
              You must be logged in to view the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-white text-black hover:bg-zinc-200" onClick={() => router.push("/login")}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
        <h1 className="bg-light-400 p-4 text-center text-6xl uppercase text-violet-600 ">DashBoard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {items.map((item: any) => (
          <Link href={`/dashboard/${item.id}`}>
          <div key={item.id} id={item.id} className="flex flex-col bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-300">
            <span className="font-semibold text-base text-slate-800 line-clamp-2 text-center">
              {item.name}
              </span>
            {item.image && (
              <img src={item.image} alt={item.name} className="w-full aspect-square bg-slate-100 overflow-hidden relative" />
            )}
            <div className="text-lg font-bold text-light-900 mt-2 mx-8">
              $:{item.price}
              </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  )
}
