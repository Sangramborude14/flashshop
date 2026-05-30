"use client"
import { use, useEffect, useState } from "react";
import PageContainer from "@/components/PageContainer";

export default function BillingPage({params}: {params: Promise<{email: string}>}) {
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
        <p className="text-zinc-500">Loading invoice details...</p>
      </div>
    )
  }
  
  return (
    <PageContainer title="Checkout Summary" description="Verify your order details and finish payment">
      <div className="max-w-xl mx-auto border border-zinc-800 rounded-2xl bg-zinc-900/60 p-6 md:p-8 flex flex-col gap-6 backdrop-blur-sm">
        <h2 className="text-2xl font-bold border-b border-zinc-800 pb-4 text-zinc-100">Order Invoice</h2>
        
        {/* Item List */}
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.item.id} className="flex justify-between items-center text-sm md:text-base border-b border-zinc-850 pb-3">
              <div className="flex flex-col">
                <span className="font-medium text-zinc-200">{item.item.name}</span>
                <span className="text-xs text-zinc-500 mt-0.5">Quantity: {item.quantity}</span>
              </div>
              <span className="font-semibold text-violet-400">
                ${(parseFloat(item.item.price) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex justify-between items-center text-zinc-400 text-sm">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-zinc-400 text-sm">
            <span>Estimated Tax</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between items-center border-t border-zinc-800 pt-4 mt-2">
            <span className="font-bold text-lg text-zinc-100">Total Price</span>
            <span className="font-extrabold text-2xl text-violet-400">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold p-3.5 rounded-xl transition duration-300 shadow-lg shadow-violet-900/20 mt-4">
          Complete Purchase 💳
        </button>
      </div>
    </PageContainer>
  )
}
