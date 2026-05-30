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


    return(<nav className="flex gap-20 justify-center items-stretch">
        <div>
            <Link href={`/dashboard`}>
            <span>Shop</span>
            </Link>
        </div>
        <div>
            {isSeller && (
                <Link href={`/hostitem`}>
                <span>
                    Host Items
                </span>
                </Link>
            )}
        </div>
        <div>
            <Link href={`/${email}/cart`}>
            <span>
                Cart
            </span>
            </Link>
        </div>
        <div>
            <Link href={`/${email}/billing`}>
            <span>
                Billing
            </span>
            </Link>
        </div>
        <div className="flex-wrap-reverse ">
            <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="text-black">
                Log Out
            </Button>
        </div>
    </nav>)
}