import {type ClassValue, clsx} from 'clsx'
import {isValid, parse} from 'date-fns'
import {twMerge} from 'tailwind-merge'

import {allCameraNames, CameraName, RoverName} from '@/types/APIResponseTypes'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateRoverName = (name: string): RoverName | undefined => {
  return Object.values(RoverName).includes(name as RoverName)
    ? (name as RoverName)
    : undefined
}

export const isValidRoverName = (name: string): boolean => {
  return Object.values(RoverName).includes(name as RoverName)
}

export const validateCameraName = (name: string): CameraName | undefined => {
  return allCameraNames.includes(name as CameraName)
    ? (name as CameraName)
    : undefined
}

export const isValidCameraName = (name: string): boolean => {
  return allCameraNames.includes(name as CameraName)
}

export const validateDate = (dateStr: string | undefined): Date | undefined => {
  if (!dateStr) return undefined

  const parsedDate = parse(dateStr, 'yyyy-MM-dd', new Date())
  return isValid(parsedDate) ? parsedDate : undefined
}

export const isValidDateString = (dateStr: string): boolean => {
  const parsedDate = parse(dateStr, 'yyyy-MM-dd', new Date())
  return isValid(parsedDate)
}

export const isValidPage = (page: string): boolean => {
  const pageNumber = Number(page)
  return !isNaN(pageNumber) && pageNumber >= 1
}
