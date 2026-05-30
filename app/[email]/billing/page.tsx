"use client"
import { use, useEffect, useState } from "react";

export default function BillingPage({params}: {params: Promise<{email: string}>}) {
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
  
  return (
<div className="flex-cols p-5">
  <h1 className="border max-w-48 p-1">
    Bill
  </h1>
  <div className="border max-w-48 p-1">
    {cartItems.map((item) =>(
      <div key={item.item.id}>
        {item.item.name} : $ {item.item.price} quantity: {item.quantity}
        </div>
    ))}
  </div>
  <div className="border p-1 max-w-48">
    Total: $ {totalPrice}
  </div>
  <button className="border my-5 px-5 ml-10">
    Checkout
  </button>
</div>
  )
}
