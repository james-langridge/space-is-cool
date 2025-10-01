export type CameraName =
  | CameraNameCuriosity
  | CameraNameOpportunitySpirit
  | CameraNamePerseverance

export const CameraNameCuriosity = [
  'MAHLI',
  'FHAZ',
  'RHAZ',
  'MAST',
  'CHEMCAM',
  'MARDI',
  'NAVCAM',
] as const
export const CameraNameOpportunitySpirit = [
  'FHAZ',
  'RHAZ',
  'NAVCAM',
  'PANCAM',
  'MINITES',
] as const
export const CameraNamePerseverance = [
  'EDL_RUCAM',
  'EDL_RDCAM',
  'EDL_DDCAM',
  'EDL_PUCAM1',
  'EDL_PUCAM2',
  'NAVCAM_LEFT',
  'NAVCAM_RIGHT',
  'MCZ_RIGHT',
  'MCZ_LEFT',
  'FRONT_HAZCAM_LEFT_A',
  'FRONT_HAZCAM_RIGHT_A',
  'REAR_HAZCAM_LEFT',
  'REAR_HAZCAM_RIGHT',
  'SKYCAM',
  'SHERLOC_WATSON',
] as const

type CameraNameCuriosity = (typeof CameraNameCuriosity)[number]
type CameraNameOpportunitySpirit = (typeof CameraNameOpportunitySpirit)[number]
type CameraNamePerseverance = (typeof CameraNamePerseverance)[number]

export const allCameraNames = [
  ...CameraNameCuriosity,
  ...CameraNameOpportunitySpirit,
  ...CameraNamePerseverance,
] as const

export enum RoverName {
  Curiosity = 'Curiosity',
  Opportunity = 'Opportunity',
  Perseverance = 'Perseverance',
  Spirit = 'Spirit',
}
