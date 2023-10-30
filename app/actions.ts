'use server'

import {revalidateTag} from 'next/cache'
import {redirect} from 'next/navigation'

import {RoverName} from '@/types/APIResponseTypes'

export default async function revalidate(rover: RoverName) {
  revalidateTag(`${rover}`)
  redirect(`/search/${rover}`)
}
