import {RoverName} from '@/types/APIResponseTypes'

export async function GET(
  request: Request,
  {params}: {params: {rover: RoverName}},
) {
  const rover = params.rover

  const res = await fetch(
    `${process.env.NASA_BASE_URL}/manifests/${rover}?api_key=${process.env.NASA_API_KEY}`,
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

  return Response.json({data})
}
