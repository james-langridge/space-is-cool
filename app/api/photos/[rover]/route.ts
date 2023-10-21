import {NextRequest} from 'next/server'

import {Photo, RoverName} from '@/types/APIResponseTypes'

export async function GET(
  request: NextRequest,
  {params}: {params: {rover: RoverName}},
) {
  const searchParams = request.nextUrl.searchParams
  const rover = params.rover

  searchParams.set('api_key', String(process.env.NASA_API_KEY))

  const res = await fetch(
    `${
      process.env.NASA_BASE_URL
    }/rovers/${rover}/photos?${searchParams.toString()}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error)
  }

  return Response.json({
    data: data.photos.map((photo: Photo) => ({
      ...photo,
      page: searchParams.get('page'),
    })),
  })
}
