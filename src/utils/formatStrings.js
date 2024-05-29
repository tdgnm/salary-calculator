export function thousandSep(num, sep) {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep)
}

export function dateToString(date) {
  if (date == null)
      return ''

  date = new Date(date)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return date.getFullYear() + '/'
    + (month < 10 ? '0' + month : month) + '/'
    + (day < 10 ? '0' + day : day)
}