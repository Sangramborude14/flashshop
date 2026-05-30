"use client"
import Link from "next/link";
import { useEffect, useState } from "react"

export default function HostItemPage() {
  const [items,setItems] = useState<any[]>([]);

  useEffect(() => {
    const getItems = async () => {
      const data  = await fetch(`/api/hostitems`);
      const items = await data.json();
      setItems(items);

    }
    getItems();
  })

  return (
    <div className="p-8 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold">Host Items</h1>
      <p className="mt-2 text-zinc-400">Host Items page placeholder.</p>
      {items.map((item) => (
        <div key={item.id}>
          <Link href={`/hostitem/${item.id}`}>
          <span>
            {item.name}
          </span>
          {item.image && (
            <img src={item.image} alt={item.name}/>
          )}
          <div>
            {item.price}
          </div>
          <div>
            <button>
              EDIT
            </button>
            <button>
              DELETE
            </button>
          </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
