import dayjs from 'dayjs'

export const dayFormat = (dateTime, format = 'YYYY-MM-DD') => {
  if (dateTime) {
    if (dayjs(dateTime).isValid()) {
      return dayjs(dateTime).format(format)
    }
    return dateTime
  }
  return ''
}
