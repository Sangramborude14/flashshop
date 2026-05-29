"use client"
import { use, useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import prisma from "@/lib/db";
import { userAgent } from "next/server";

interface PageProps {
  params: Promise<{email:string}>
}

export default function CartPage({params}: PageProps) {
const {email} = use(params)
const  decodedEmail = decodeURIComponent(email)
const [cartItems,setCartItems] = useState<any[]>([]);
const [loading,setLoading] = useState(true);


useEffect(() => {
  const fetchCart = async () => {
    try{ 
      const res = await fetch(`/api/${email}`)
      if(res.ok){
        const data = await res.json();
        setCartItems(data)
      }
    }catch(error){
      console.error("Error fetching cart items")
    }finally{
      setLoading(false);
    }
  }
  fetchCart();
},[email])

const totalPrice = cartItems.reduce(
  (sum,cartItems) => sum + parseFloat(cartItems.item.price) * cartItems.quantity,0
)

if(loading){
  return(
    <div>
      <h1>
        Your cart items
      </h1>
      <div>
         {cartItems.map((cartItem) => (
              <div 
                key={cartItem.id} 
                className="flex items-center justify-between p-4 border border-zinc-800 rounded-xl bg-zinc-900"
              >
                <div className="flex items-center gap-4">
                  {cartItem.item.image && (
                    <img 
                      src={cartItem.item.image} 
                      alt={cartItem.item.name} 
                      className="w-16 h-16 object-cover rounded-lg border border-zinc-800" 
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-zinc-100">{cartItem.item.name}</h3>
                    <p className="text-xs text-zinc-500">Qty: {cartItem.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-violet-400">
                    ${(parseFloat(cartItem.item.price) * cartItem.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
      </div>
      </div>

  )
}

  return (
    <div className="p-8 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <p className="mt-2 text-zinc-400">Cart page placeholder.</p>
      
    </div>
  )
}
