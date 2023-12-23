import {revalidateTag} from 'next/cache'
import {NextRequest} from 'next/server'

import {latestPhotos} from '@/app/lib/tags'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  revalidateTag(latestPhotos)

  return Response.json({ok: true})
}
