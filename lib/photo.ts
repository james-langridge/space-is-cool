import {PhotoWithPage} from '@/lib/api'

export interface Data {
  pages: PhotoWithPage[][]
}

export function findPhotoByIdFromPages(
  id: string,
  data?: Data,
): PhotoWithPage | null {
  if (!data) {
    return null
  }

  for (const page of data.pages) {
    for (const photo of page) {
      if (photo.id === Number(id)) {
        return photo
      }
    }
  }

  return null
}

export function findPhotoByIdFromFavourites(
  id: string,
  data: PhotoWithPage[],
): PhotoWithPage | null {
  if (!data) {
    return null
  }

  for (const photo of data) {
    if (photo.id === Number(id)) {
      return photo
    }
  }

  return null
}
