import moment from 'moment'
import trLocale from 'moment/locale/tr'

moment.updateLocale('tr', trLocale)

const formatDate = (now = moment(), date) => {
  const hours = now.diff(date, 'hours')
  if (hours === 0) {
    const minutes = now.diff(date, 'minutes')
    if (minutes === 0) {
      return '[Biraz önce]'
    }
    return `${minutes} [dakika önce]`
  }
  return `${hours} [saat önce]`
}

export const timeDiff = date => {
  return moment(date).calendar(null, {
    sameDay: now => formatDate(now, date),
    nextWeek: 'dddd',
    lastDay: '[Dün], HH:mm',
    lastWeek: now => `${now.diff(date, 'days')} [gün önce]`,
    sameElse: 'DD/MM/YYYY HH:mm:ss'
  })
}

export const timeFormat = (date, format) => {
  if (!date) return '--/--/----'

  return moment(date).format(format)
}

export const getDuration = date => {
  const now = moment(new Date(), 'DD/MM/YYYY HH:mm:ss')
  const then = moment(moment(date), 'DD/MM/YYYY HH:mm:ss')

  const ms = now.diff(then)
  const temp = moment.duration(ms)
  let string = ''

  if (temp.days()) string += `${temp.days()} gün `
  if (temp.hours()) string += `${temp.hours()} saat `
  if (temp.minutes()) string += `${temp.minutes()} dakika `
  if (temp.seconds()) string += `${temp.seconds()} saniye `

  if (!string) string = 'Anında'

  return string
}
