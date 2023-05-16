import Image from 'next/image'

export default function ButtonNext({onClick}: {onClick: () => void}) {
  return (
    <button title="Next" className="absolute top-1/2 right-2" onClick={onClick}>
      <Image src="/chevron-right.svg" alt="Next" width={58} height={58} />
    </button>
  )
}
