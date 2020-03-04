export const arrayHasValue = arr =>
  arr !== undefined && arr !== null && Array.isArray(arr) && arr.length > 0

export const objectHasValue = obj =>
  obj !== null && obj !== undefined && Object.keys(obj).length > 0

export const zeroPad = (num, places) => String(num).padStart(places, '0')

export const formattedDateTime = () => {
  const now = new Date()
  const formattedDateTime = `${now.getFullYear()}-${zeroPad(
    now.getMonth() + 1,
    2
  )}-${zeroPad(now.getDay(), 2)} ${zeroPad(now.getHours(), 2)}:${zeroPad(
    now.getMinutes(),
    2
  )}:${zeroPad(now.getSeconds(), 2)}`

  return formattedDateTime
}
