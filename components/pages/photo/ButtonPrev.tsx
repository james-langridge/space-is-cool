import Image from 'next/image'

export default function ButtonPrev({onClick}: {onClick: () => void}) {
  return (
    <button title="Prev" className="absolute top-1/2 left-2" onClick={onClick}>
      <Image src="/chevron-left.svg" alt="Prev" width={58} height={58} />
    </button>
  )
}
