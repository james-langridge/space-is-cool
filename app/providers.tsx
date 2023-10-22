'use client'

import React, {createContext, Dispatch, useContext, useReducer} from 'react'

export type GetPhotosSearchParams = {
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

import {getCurrentDate} from '@/lib/date'
import {CameraName, RoverName} from '@/types/APIResponseTypes'

export default function Providers({children}: {children: React.ReactNode}) {
  const [form, dispatch] = useReducer(formReducer, {
    rover: RoverName.Curiosity,
    dateType: 'earth_date',
    sol: '',
    earth_date: getCurrentDate(),
    page: 0,
    camera: '',
    submittedForm: null,
  })

  return (
    <FormContext.Provider value={form}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  )
}

type FormAction =
  | {type: 'SET_ROVER'; payload: RoverName}
  | {type: 'SET_DATE_TYPE'; payload: 'sol' | 'earth_date'}
  | {type: 'SET_SOL'; payload: number | ''}
  | {type: 'SET_EARTH_DATE'; payload: string}
  | {type: 'SET_PAGE'; payload: number}
  | {type: 'SET_CAMERA'; payload: CameraName | undefined}
  | {type: 'SET_SUBMITTED_FORM'; payload: GetPhotosSearchParams}

export type FormState = GetPhotosSearchParams & {
  submittedForm: GetPhotosSearchParams | null
}

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
    case 'SET_SUBMITTED_FORM':
      return {...state, submittedForm: action.payload}
    default:
      throw new Error()
  }
}

const FormContext = createContext<FormState>({} as FormState)

const FormDispatchContext = createContext<Dispatch<FormAction>>(
  {} as Dispatch<FormAction>,
)

export function useForm() {
  return useContext(FormContext)
}

export function useFormDispatch() {
  return useContext(FormDispatchContext)
}
