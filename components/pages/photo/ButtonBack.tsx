import Image from 'next/image'
import {useRouter} from 'next/navigation'

export default function ButtonBack() {
  const router = useRouter()

  return (
    <button
      title="Back"
      className="absolute top-2 left-2"
      onClick={() => router.back()}
    >
      <Image src="/arrow-left-short.svg" alt="Back" width={58} height={58} />
    </button>
  )
}
