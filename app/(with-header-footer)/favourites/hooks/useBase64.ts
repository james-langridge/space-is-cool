import {useEffect, useState} from 'react'

import {getBase64} from '@/app/lib/api'

export function useBase64(src: string) {
  const [blurDataURL, setBlurDataURL] = useState<string>()

  useEffect(() => {
    async function fetchBase64() {
      const base64 = await getBase64(src)
      setBlurDataURL(base64)
    }

    fetchBase64()
  }, [src])

  return blurDataURL
}
