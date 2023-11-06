import {NextRequest} from 'next/server'
import {getPlaiceholder} from 'plaiceholder'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('src')

  if (!query) {
    return Response.json({status: 400, message: 'Missing src query parameter.'})
  }

  const buffer = await fetch(query).then(async res =>
    Buffer.from(await res.arrayBuffer()),
  )

  const {base64} = await getPlaiceholder(buffer)

  return Response.json({base64})
}
