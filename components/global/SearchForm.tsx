'use client'

import {useRouter} from 'next/navigation'
import React, {useReducer} from 'react'

import ButtonRovers from '@/components/pages/search/ButtonRovers'
import ButtonSearch from '@/components/pages/search/ButtonSearch'
import InputCamera from '@/components/pages/search/InputCamera'
import InputDate from '@/components/pages/search/InputDate'
import {getCurrentDate} from '@/lib/date'
import {CameraName, RoverName} from '@/types/APIResponseTypes'

type GetPhotosSearchParams = {
  /** The rover's name */
  rover: RoverName

  /** The type of the date: 'sol' or 'earth_date' */
  dateType: 'sol' | 'earth_date'

  /**
   * The Martian rotation or day on which the photo was taken, counting up from the rover's landing date.
   * A photo taken on Curiosity's 1000th Martian sol exploring Mars, for example, will have a sol attribute of 1000.
   * This is required if dateType === 'sol'.
   */
  sol?: number | ''

  /** The Earth date on which the photo was taken. This is required if dateType === 'earth_date'. */
  earth_date?: string

  /**
   * The camera name. Note that different rovers have different cameras: https://github.com/corincerami/mars-photo-api#cameras
   * This is optional.
   */
  camera?: CameraName | ''

  /**
   * The default response returns all photos. The page parameter can be specified and returns 25 photos per page.
   * This is optional.
   */
  page?: number
}

export type FormAction =
  | {type: 'SET_ROVER'; payload: RoverName}
  | {type: 'SET_DATE_TYPE'; payload: 'sol' | 'earth_date'}
  | {type: 'SET_SOL'; payload: number | ''}
  | {type: 'SET_EARTH_DATE'; payload: string}
  | {type: 'SET_PAGE'; payload: number}
  | {type: 'SET_CAMERA'; payload: CameraName | undefined}

export type FormState = GetPhotosSearchParams

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_ROVER':
      return {...state, rover: action.payload}
    case 'SET_DATE_TYPE':
      return {...state, dateType: action.payload}
    case 'SET_SOL':
      return {...state, sol: action.payload}
    case 'SET_EARTH_DATE':
      return {...state, earth_date: action.payload}
    case 'SET_PAGE':
      return {...state, page: action.payload}
    case 'SET_CAMERA':
      return {...state, camera: action.payload}
    default:
      throw new Error()
  }
}

export default function SearchForm() {
  const router = useRouter()
  const [form, dispatch] = useReducer(formReducer, {
    rover: RoverName.Curiosity,
    dateType: 'earth_date',
    sol: '',
    earth_date: getCurrentDate(),
    page: 0,
    camera: '',
  })

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    const {rover, sol, camera, earth_date} = form

    router.push(`/search/${rover}/${earth_date || sol}/${camera || ''}?page=1`)
  }

  return (
    <form onSubmit={onSubmit}>
      <ButtonRovers dispatch={dispatch} />
      <InputDate form={form} dispatch={dispatch} />
      <InputCamera form={form} dispatch={dispatch} />
      <ButtonSearch />
    </form>
  )
}
