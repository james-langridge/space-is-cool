import Image from 'next/image'

export default function ButtonInfo({onClick}: {onClick: () => void}) {
  return (
    <button
      title="Info"
      className="p-4 absolute top-2 right-2"
      onClick={onClick}
    >
      <Image src="/info-circle.svg" alt="Info" width={32} height={32} />
    </button>
  )
}
