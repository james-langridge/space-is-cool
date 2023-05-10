import {PhotoWithPage} from '@/lib/api'

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export interface Data {
  pages: PhotoWithPage[][]
}

export function findPhotoById(id: string, data?: Data): PhotoWithPage | null {
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
