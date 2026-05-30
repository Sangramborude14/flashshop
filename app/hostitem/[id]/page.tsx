"use client"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { useEffect, useState, use } from "react"
import PageContainer from "@/components/PageContainer"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function HostItem({ params }: PageProps) {
  const { id } = use(params)
  const [item,setItem] = useState<any>(null)

  const {data: session} = authClient.useSession()
  const email = session?.user?.email

  useEffect(() => {
      const fetchItem = async () => {
        try {
          const res = await fetch(`/api/items/${id}`)
          const data = await res.json();
          setItem(data)
        } catch (error) {
          console.error(`error fetching items from server`, error)
        }
      }
      fetchItem();
    }, [id])
  
  if(!item){
    return (
      <div className="flex-1 bg-zinc-950 text-zinc-100 min-h-screen flex items-center justify-center">
        <p className="text-zinc-500">Loading item details...</p>
      </div>
    )
  }

  return (
    <PageContainer title="Hosted Item Details" description="View details of your hosted inventory item">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
        
        {/* Left Side: Product Image / Image Placeholder */}
        <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900 aspect-square flex items-center justify-center">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-zinc-650 text-5xl font-extrabold font-mono">NO IMAGE</span>
          )}
        </div>

        {/* Right Side: Product Details & Info */}
        <div className="border border-zinc-800 rounded-2xl bg-zinc-900/50 p-6 flex flex-col gap-6 backdrop-blur-sm">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-100 mb-2">{item.name}</h1>
            <p className="text-sm text-zinc-400 mt-2">
              Status: <span className="text-xs bg-emerald-950/80 text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded font-bold">Active Listing</span>
            </p>
          </div>

          <div className="text-3xl font-extrabold text-violet-400">
            ${parseFloat(item.price).toFixed(2)}
          </div>

          <div className="border-t border-zinc-800 pt-4">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-light whitespace-pre-line">
              {item.details || "No description provided for this product."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-zinc-800 pt-6 flex flex-col gap-4">
            <Link href="/hostitem" className="w-full">
              <button className="w-full bg-zinc-850 hover:bg-zinc-800 text-zinc-200 font-bold p-3.5 rounded-xl border border-zinc-800 transition duration-300">
                Back to Host Management
              </button>
            </Link>
          </div>
        </div>

      </div>
    </PageContainer>
  ) 
}
