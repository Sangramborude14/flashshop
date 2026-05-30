"use client"
import Link from "next/link";
import { useEffect, useState } from "react"

export default function HostItemPage() {
const [items,setItems] = useState<any[]>([]);

 const [name,setName] = useState("");
 const [price,setPrice] = useState("");
 const [category,setCategory] = useState("");
 const [details,setDetails] = useState("");
 const [image,setImage] = useState("");

  const getItems = async () => {
      try {
        const data = await fetch(`/api/hostitem`);
        if (data.ok) {
          const fetchedItems = await data.json();
          if (Array.isArray(fetchedItems)) {
            setItems(fetchedItems);
          }
        }
      } catch (error) {
        console.error("Error fetching host items:", error);
      }
    }

  useEffect(() => {
    getItems();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
      const res = await fetch("/api/hostitem",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name,price,category,details,image})
      })

      if(res.ok){
        setName("");setPrice("");setCategory("");setDetails("");setImage("");

        getItems();
      }else{
        const err = await res.json();
        alert(err.error || "failed to host items")
      }
    }catch(error){
      console.error(`error hosting items: `,error)
    }
  }

  return (
  <div className="p-8 text-white bg-black min-h-screen max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">
      Host Items Management
      </h1>

     <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl mb-10 flex flex-col gap-4">

      <h2 className="text-xl font-semibold">
        Host a new Item
      </h2>

      <div>
        <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className={divCss}/>

         <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className={divCss}/>

      </div>
      <div className={outerDivCss}>

        <input
        type="text"
        placeholder="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className={divCss}/>

        <input
        type="text"
        placeholder="Image URl"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
        className={divCss}/>

      </div>

      <textarea
      placeholder="Product Details"
      value={details}
      onChange={(e) => setDetails(e.target.value)}
      className="p-3 rounded bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-550 focus:outline-none focus:border-violet-600 transition h-24 resize-none"
      />

       <button type="submit" className="bg-violet-600 hover:bg-violet-500 font-bold p-3 rounded-lg transition"> 
          Host Item
        </button>

     </form>
           {/* Items List start */}
      <h2 className="text-2xl font-bold mb-4">Your Hosted Items</h2>
      {items.length === 0 ? (
        <p className="text-zinc-500">
          You are not hosting any items yet. Fill out the form above to add your first product!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="p-4 border border-zinc-800 rounded-xl bg-zinc-900 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-zinc-400 text-sm">${item.price} | {item.category || "General"}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/hostitem/${item.id}`} className="bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded text-sm transition">
                  View
                </Link>
                <button className="bg-red-950 text-red-400 hover:bg-red-900 px-3 py-1.5 rounded text-sm transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Items List end */}


  </div>
  )
}

const divCss = "p-3 rounded bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-505 focus:outline-none focus:border-violet-600 transition"
const outerDivCss = "grid grid-cols-1 sm:grid-cols-2 gap-4";
