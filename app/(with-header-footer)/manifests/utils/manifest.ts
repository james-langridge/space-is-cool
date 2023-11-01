import {PhotoManifest} from '@/types/APIResponseTypes'

export type PhotoManifestKey = keyof Omit<PhotoManifest, 'photos'>

// Changing the order of validKeys will change the display order of the cols on /manifests
export const validKeys: PhotoManifestKey[] = [
  'name',
  'landing_date',
  'launch_date',
  'status',
  'max_sol',
  'max_date',
  'total_photos',
]

export const keyMap = {
  name: 'Name',
  landing_date: 'Landing date',
  launch_date: 'Launch date',
  status: 'Status',
  max_sol: 'Max sol',
  max_date: 'Max date',
  total_photos: 'Total photos',
}
