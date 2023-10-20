import PhotoPage from '@/components/pages/photo/PhotoPage'
import {RoverName} from '@/types/APIResponseTypes'

export type Params = {id: string}

export type SearchParams = {
  rover: RoverName
  favourite: string
  latest: string
  search: string
  sol: string
}

type Props = {
  params: Params
  searchParams: SearchParams
}

export default function Page({params, searchParams}: Props) {
  return <PhotoPage data={{params, searchParams}} />
}
