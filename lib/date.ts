export function getCurrentDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function convertDateFormat(dateStr?: string): string {
  if (!dateStr) {
    return '...'
  }

  const parts = dateStr.split('-')
  const date = new Date(
    Date.UTC(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])),
  )

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string')
  }

  let day = '' + date.getUTCDate()
  let month = '' + (date.getUTCMonth() + 1)
  const year = date.getUTCFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [day, month, year].join('/')
}

export function isSolDate(date: string) {
  return /^\d+$/.test(date)
}
