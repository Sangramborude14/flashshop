interface PageProps {
  params: Promise<{ id: string }>
}

export default async function DashboardDetailPage({ params }: PageProps) {
  const { id } = await params
  
  return (
    <div className="p-8 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold">Dashboard Detail</h1>
      <p className="mt-2 text-zinc-400">Viewing item ID: {id}</p>
    </div>
  )
}
