import dateFormat from 'dateformat'

export function date (_date: string | Date = new Date().toISOString(), _mask = 'default') {
  if (typeof _date === 'string') {
    _date = new Date(Date.parse(_date))
  }
  return dateFormat(_date, _mask)
}
