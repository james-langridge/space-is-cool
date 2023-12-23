import {revalidateTag} from 'next/cache'
import {NextRequest} from 'next/server'

import {latestPhotos, missionManifests} from '@/app/lib/tags'
import {RoverName} from '@/types/APIResponseTypes'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  const rovers = Object.values(RoverName).map(rover => rover)

  rovers.forEach(rover => {
    revalidateTag(latestPhotos + rover)
    revalidateTag(missionManifests + rover)
  })

  return Response.json({ok: true})
}
