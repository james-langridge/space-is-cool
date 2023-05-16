import clsx from 'clsx'
import {useMediaQuery} from 'usehooks-ts'

import {PhotoWithPage} from '@/lib/api'

export default function Sidebar({
  isOpen,
  onClose,
  photo,
}: {
  isOpen: boolean
  onClose: () => void
  photo: PhotoWithPage
}) {
  const isMobile = useMediaQuery('(max-width: 640px)')

  return (
    <div
      className={clsx(
        `fixed transform transition-transform duration-300 ease-in-out bg-white p-4 z-50 shadow-lg`,
        {
          'inset-x-0 bottom-0 h-2/3': isMobile,
          [isOpen ? 'translate-y-0' : 'translate-y-full']: isMobile,
          'inset-y-0 right-0 w-64': !isMobile,
          [isOpen ? 'translate-x-0' : 'translate-x-full']: !isMobile,
        },
      )}
    >
      <button
        title="Close"
        className="text-5xl mb-4 font-light"
        onClick={onClose}
      >
        &times;
      </button>

      <div className="prose">
        <h1 className="text-xl mb-4">Info</h1>
        <p>Photo date: {photo.earth_date.toString()}</p>
        <p>Camera: {photo.camera.full_name}</p>
        <p>Rover: {photo.rover.name}</p>
        <p>Status: {photo.rover.status}</p>
        <p>Launch date: {photo.rover.launch_date.toString()}</p>
        <p>Landing date: {photo.rover.landing_date.toString()}</p>
      </div>
    </div>
  )
}
