"use client"

import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { useEffect, useState } from "react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function DashboardDetailPage({ params }: PageProps) {
  const [item,setItem] = useState<any>(null)

  const {data: session} = authClient.useSession()
  const email = session?.user?.email

  useEffect(() => {
      const fetchItem = async () => {
        try {
          const { id } = await params
          const res = await fetch(`/api/items/${id}`)
          const data = await res.json();
          setItem(data)
        } catch (error) {
          console.error(`error fetching items from server`, error)
        }
      }
      fetchItem();
    },[])

    const handleCart = async () => {
      try{
        const res = await fetch(`/api/${email}`,{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            email
          })
        })
      }catch(error){
         console.error(`error adding to cart`)
         alert(`failed to add to cart`)

      }
    }
  
  if(!item){
    return(<div>Loading....</div>)
  }
  return (
    <div className="flex flex-col gap-4 bg-light-300 items-center p-5 min-h-screen">
      <h1 className="text-4xl font-semibold font-stretch-150% m-2">
      {item.name}
    </h1>
    <p className="border p-4 m-2 bg-gray-50 font-light flex-1">
      {item.details}
    </p>
   <span> provider: <span className="italic bg-gray-500 px-3 py-1 font-bold border">{item.hostName}</span></span>
    <div className="bg-gray-400 px-3 text-center border-2 border-red-500">
      $ {item.price}
    </div>
   
    <button onClick={handleCart}
     className="bg-gray-50 border p-2 mt-4 font-semibold hover:bg-black hover:font-extralight hover:text-white hover:text-xl hover:border-red-700 transition-all duration-300 ">
      Add to Cart 🛒
      </button>
   
    <Link href={`${email}/cart`} className="block">
    <button className=" border bg-gray-50 p-2 mb-4 font-semibold hover:bg-green-200 hover:font-extralight hover:text-xl hover:border-black transition-all duration-300 ">
      View Cart 
    </button>
    </Link>
    </div>
  ) 
}
