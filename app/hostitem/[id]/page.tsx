interface PageProps {
  params: Promise<{ id: string }>
}

export default async function HostItemDetailPage({ params }: PageProps) {
  const { id } = await params
  
  return (
    <div className="p-8 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold">Host Item Detail</h1>
      <p className="mt-2 text-zinc-400">Host Item ID: {id}</p>
    </div>
  )
}
