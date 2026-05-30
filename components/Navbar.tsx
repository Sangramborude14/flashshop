"use client"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "./ui/button"

export default function NavBar(){
    const router = useRouter();
    const {data: session,isPending} = authClient.useSession();

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/login")
    }

    if(isPending || !session) return null;

    const email = session.user.email;
    const isSeller = session.user.role === "SELLER";

        return (
      <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo / Shop Link */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tight bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              FLASH<span className="text-zinc-200">SHOP</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition">
              Shop
            </Link>
            
            {isSeller && (
              <Link href="/hostitem" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition">
                Host Items
              </Link>
            )}

            <Link href={`/${email}/cart`} className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition">
              Cart
            </Link>

            <Link href={`/${email}/billing`} className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition">
              Billing
            </Link>
          </div>

          {/* Actions (Log Out) */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">{session.user.name}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white"
            >
              Log Out
            </Button>
          </div>

        </div>
      </nav>
    )

}