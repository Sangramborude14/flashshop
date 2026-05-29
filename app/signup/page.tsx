"use client"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role,setRole] = useState("BUYER");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        role: role,
        callbackURL: "/dashboard"
      }, {
        onSuccess: () => {
          console.log("Successfully registered")
          router.push("/dashboard")
          router.refresh()
        },
        onError: (ctx) => {
          alert(ctx.error.message || "Something went wrong during signup.")
        }
      })
    } catch (err) {
      console.error("Error retrieving data from backend", err)
    }
  }

  return (
    <div className="flex justify-center items-center py-40 bg-black">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSignup}>
          <CardHeader>
            <CardTitle className="font-bold">SignUp for FlashShop</CardTitle>
            <CardDescription>
              Enter your details below to create your account
            </CardDescription>
            <CardAction>
              <Link href="/login" passHref legacyBehavior>
                <Button type="button" variant="link">Login</Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

