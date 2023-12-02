import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-full h-24 bg-red-500">
      <Link href="/home">Go Home</Link>{" "}
      <Link href="/home/modal">Go To Modal</Link>
    </div>
  )
}
