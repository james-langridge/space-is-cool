import Image from 'next/image'
import {useState} from 'react'
import {useLocalStorage} from 'usehooks-ts'

import {PhotoWithPage} from '@/lib/api'

export default function FavouriteButton({photo}: {photo: PhotoWithPage}) {
  const [favourites, setFavourites] = useLocalStorage<PhotoWithPage[]>(
    'favourites',
    [],
  )
  const id = photo.id
  const [isFavourite, setIsFavourite] = useState(
    isFavouritePhoto(favourites, id),
  )

  function toggleFavourite() {
    if (isFavourite) {
      const index = favourites.findIndex(photo => photo.id === id)

      if (index !== -1) {
        const newFavourites = [...favourites]
        newFavourites.splice(index, 1)
        setFavourites(newFavourites)
      }
    }

    if (!isFavourite) {
      setFavourites([...favourites, photo])
    }

    setIsFavourite(!isFavourite)
  }

  return (
    <button
      onClick={() => toggleFavourite()}
      title="Favourite"
      className="p-4 absolute top-2 right-16"
    >
      {isFavourite ? (
        <Image src="/star-fill.svg" alt="Favourite" width={32} height={32} />
      ) : (
        <Image src="/star.svg" alt="Favourite" width={32} height={32} />
      )}
    </button>
  )
}

function isFavouritePhoto(favourites: PhotoWithPage[], id: number) {
  return favourites.some(photo => photo.id === id)
}
