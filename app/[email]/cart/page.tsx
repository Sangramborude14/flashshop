"use client"
import { use, useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import Link from "next/link";
import PageContainer from "@/components/PageContainer";

interface PageProps {
  params: Promise<{email:string}>
}

export default function CartPage({params}: PageProps) {
const {email} = use(params)
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
  (sum,cartItem) => sum + parseFloat(cartItem.item.price) * cartItem.quantity,0
)

if (loading) {
  return (
    <div className="flex-1 bg-zinc-950 text-zinc-100 min-h-screen flex items-center justify-center">
      <p className="text-zinc-500">Loading your shopping cart...</p>
    </div>
  )
}

return (
  <PageContainer title="Your Cart" description="Review your selected items and proceed to checkout">
    {cartItems.length === 0 ? (
      <div className="text-center py-20 border border-zinc-800 bg-zinc-900/50 rounded-2xl">
        <p className="text-zinc-400 mb-6">Your shopping cart is currently empty.</p>
        <Link href="/dashboard" className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-lg transition">
          Browse Products
        </Link>
      </div>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cartItems.map((cartItem) => (
            <div 
              key={cartItem.id} 
              className="flex items-center justify-between p-4 border border-zinc-800 rounded-xl bg-zinc-900/60 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                {cartItem.item.image && (
                  <img 
                    src={cartItem.item.image} 
                    alt={cartItem.item.name} 
                    className="w-16 h-16 object-cover rounded-lg border border-zinc-800 bg-zinc-950" 
                  />
                )}
                <div>
                  <h3 className="font-semibold text-zinc-100">{cartItem.item.name}</h3>
                  <p className="text-xs text-zinc-500 mt-1">Quantity: {cartItem.quantity}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-violet-400 text-lg">
                  ${(parseFloat(cartItem.item.price) * cartItem.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Card */}
        <div className="p-6 border border-zinc-800 rounded-xl bg-zinc-900 flex flex-col justify-between h-fit gap-6">
          <h2 className="text-xl font-bold border-b border-zinc-800 pb-3">Order Summary</h2>
          
          <div className="flex justify-between items-center text-sm text-zinc-400">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm text-zinc-400">
            <span>Shipping</span>
            <span className="text-green-400 font-medium">Free</span>
          </div>

          <div className="flex justify-between items-center font-bold text-lg border-t border-zinc-800 pt-4 mt-2">
            <span>Total</span>
            <span className="text-violet-400">${totalPrice.toFixed(2)}</span>
          </div>

          <Link href={`/${email}/billing`} className="w-full">
            <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold p-3 rounded-lg transition">
              Proceed to Checkout
            </button>
          </Link>
        </div>

      </div>
    )}
  </PageContainer>
)
}
