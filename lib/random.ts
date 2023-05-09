import {getMissionManifest, getPhotos} from '@/lib/api'
import {Photo, RoverName} from '@/types/APIResponseTypes'

export async function getRandomPhoto() {
  const rover = getRandomEnumValue(RoverName)
  const {max_sol} = await getMissionManifest(rover)
  const randomSol = getRandomNumber(max_sol)
  const photos = await getRandomPhotos(rover, randomSol)
  const randomIdx = getRandomNumber(photos.length)

  return photos[randomIdx]
}

async function getRandomPhotos(
  rover: RoverName,
  max_sol: number,
): Promise<Photo[]> {
  const photos = await getPhotos({
    rover,
    date: {type: 'sol', date: max_sol.toString()},
  })

  if (!photos.length) {
    return getRandomPhotos(rover, max_sol)
  }

  return photos
}

function getRandomEnumValue<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.values(anEnum as any) as unknown as T[keyof T][]
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  return enumValues[randomIndex]
}

function getRandomNumber(n: number): number {
  return Math.floor(Math.random() * n)
}
