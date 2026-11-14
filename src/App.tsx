import { useProduct } from './hooks/useProduct'

export default function App() {
  const { data: product, isPending, isError, refetch } = useProduct()

  if (isPending) {
    return <p className="p-8 text-center">Loading…</p>
  }

  if (isError) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">Something went wrong while loading the product.</p>
        <button onClick={() => refetch()} className="rounded bg-black px-4 py-2 text-white">
          Try again
        </button>
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="text-2xl font-semibold">{product.name}</h1>
    </main>
  )
}