'use client'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import React, {createContext, Dispatch, useContext, useReducer} from 'react'

import {GetPhotosSearchParams} from '@/lib/api'
import {
  CameraName,
  CameraNamePerseverance,
  RoverName,
} from '@/types/APIResponseTypes'

export default function Providers({children}: {children: React.ReactNode}) {
  const [form, dispatch] = useReducer(formReducer, {
    rover: RoverName.Curiosity,
    dateType: 'earth_date',
    sol: undefined,
    earth_date: undefined,
    page: 0,
    camera: undefined,
  })
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <FormContext.Provider value={form}>
      <FormDispatchContext.Provider value={dispatch}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  )
}

type FormAction =
  | {type: 'SET_ROVER'; payload: RoverName}
  | {type: 'SET_DATE_TYPE'; payload: 'sol' | 'earth_date'}
  | {type: 'SET_SOL'; payload: number}
  | {type: 'SET_EARTH_DATE'; payload: string}
  | {type: 'SET_PAGE'; payload: number}
  | {type: 'SET_CAMERA'; payload: CameraName | CameraNamePerseverance}

type FormState = GetPhotosSearchParams

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
