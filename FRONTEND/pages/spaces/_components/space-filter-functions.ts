import { TNullableField, ISpace, ILocation } from '@/types/general.types'
import { weekdays } from '@/util/mock-data.util'

type TSpaceFilter<ParamType = undefined> = (_space: ISpace, _param?: ParamType) => boolean
interface IDateParam {
  openNow: boolean
  date: TNullableField<string>
  from: string
  to: string
}

interface ILocationParam {
  searchByLocation: boolean
  within: TNullableField<number>
  location: TNullableField<ILocation>
}

export const featuresFilter: TSpaceFilter<string[]> = (_space, _param) => {
  return _param?.length ? _param.some(_f => _space.features.includes(_f)) : true
}

export const categoryFilter: TSpaceFilter<string[]> = (_space, _param) => {
  return _param?.length ? _param.includes(_space.categoryId) : true
}

export const timeWithinRange = (_time: string, _from: string, _to: string) => {
  const parsedTime = new Date(Date.parse(_time))
  const parsedFrom = new Date(Date.parse(_from))
  const parsedTo = new Date(Date.parse(_to))
  const lower = parsedFrom.getHours() * 60 + parsedFrom.getMinutes()
  const upper = parsedTo.getHours() * 60 + parsedTo.getMinutes()
  const target = parsedTime.getHours() * 60 + parsedTime.getMinutes()
  console.log(lower, target, upper, lower <= target && target <= upper)

  return lower <= target && target <= upper
}

export const isOpened: TSpaceFilter = (_space) => {
  const now = new Date()
  const { from, to } = _space.opened_at[weekdays.list[now.getDay()].label as keyof ISpace['opened_at']]
  return timeWithinRange(now.toISOString(), from, to)
}

export const dateFilter: TSpaceFilter<IDateParam> = (_space, _param) => {
  if (_param) {
    if (_param?.openNow) {
      return isOpened(_space)
    } else if (_param.date && _param.from && _param.to) {
      const { date, from, to } = _param

      console.log(typeof date)

      const parsedDate = typeof date === 'string' ? new Date(Date.parse(date)) : date as Date
      const weekday = weekdays.list[parsedDate.getDay()].label as keyof ISpace['opened_at']

      const { from: spaceFrom, to: spaceTo, available } = _space.opened_at[weekday]

      if (!available) {
        return false
      } else {
        console.log('here')
        return timeWithinRange(from, spaceFrom, spaceTo) &&
            timeWithinRange(to, spaceFrom, spaceTo)
      }
    } else {
      return true
    }
  } else {
    return true
  }
}

export const locationFilter: TSpaceFilter<ILocationParam> = (_space, _param) => {
  if (_param?.searchByLocation && _param?.location) {
    const dist = distanceInKm(
      Number(_space.location.lat), Number(_param.location.lat),
      Number(_space.location.lon), Number(_param.location.lon)
    )
    console.log(_param, dist)
    return dist < (_param?.within || 20)
  } else {
    return true
  }
}

export function distanceInKm (lat1: number, lat2: number, lon1: number, lon2: number) {
  lon1 = lon1 * Math.PI / 180
  lon2 = lon2 * Math.PI / 180
  lat1 = lat1 * Math.PI / 180
  lat2 = lat2 * Math.PI / 180

  const dlon = lon2 - lon1
  const dlat = lat2 - lat1
  const a = Math.pow(Math.sin(dlat / 2), 2) +
             Math.cos(lat1) * Math.cos(lat2) *
             Math.pow(Math.sin(dlon / 2), 2)

  const c = 2 * Math.asin(Math.sqrt(a))

  // Radius of earth in kilometers. Use 3956
  // for miles
  const r = 6371

  // calculate the result
  return (c * r)
}
