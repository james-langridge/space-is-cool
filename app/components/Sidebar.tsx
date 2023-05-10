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
  return (
    <div
      className={`fixed inset-y-0 right-0 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } w-64 bg-white p-4 z-50 shadow-lg`}
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
        <p>Rover: {photo.rover.name}</p>
        <p>Camera: {photo.camera.full_name}</p>

        <p>Launch date: {photo.rover.launch_date.toString()}</p>
        <p>Landing date: {photo.rover.landing_date.toString()}</p>
      </div>
    </div>
  )
}
