import { ISpaceCategory, ICountry, IWeekday, ISpaceFeature, TNullableField } from '@/types'
import { orderBy } from 'lodash'

export const spaceFeatures = {
  list: [
    { label: 'Air conditioning', id: 1 },
    { label: 'Bike rack', id: 2 },
    { label: 'Fast Wifi (>50mbps)', id: 3 },
    { label: 'Free Parking', id: 4 },
    { label: 'Instant Book', id: 5 },
    { label: 'Kitchen', id: 6 },
    { label: 'Pet Friendly', id: 7 },
    { label: 'Printer', id: 8 },
    { label: 'Quiet workspace', id: 9 },
    { label: 'Shower', id: 10 },
    { label: 'Step free access', id: 11 },
    { label: 'Wheelchair friendly', id: 12 },
    { label: 'WiFi', id: 13 },
    { label: 'Step free access', id: 14 },
    { label: 'Free Tea & Coffee provided', id: 15 },
    { label: 'AV screen with HDMI', id: 16 },
    { label: 'Barista coffee', id: 17 },
    { label: 'On-site café', id: 18 },
    { label: 'Catering available', id: 19 },
    { label: 'Whiteboard / flipchart', id: 20 },
    { label: 'Breakout area', id: 21 },
    { label: 'Paid Parking', id: 22 },
    { label: 'Catering available', id: 23 }
  ],
  get (_id: number): TNullableField<ISpaceFeature> {
    return this.list.find(_item => _item.id === _id) || null
  }
}

export const spaceCategories = {
  list: [
    { label: 'Private office', id: 1 },
    { label: 'Coffe Shop', id: 2 },
    { label: 'Co-working', id: 3 },
    { label: 'Meeting room', id: 4 },
    { label: 'Lounge', id: 5 }
  ],
  get (_id: number): TNullableField<ISpaceCategory> {
    return this.list.find(_item => _item.id === _id) || null
  }
}

export const countries = {
  list: orderBy([
    { country: 'Ukraine', id: 1 },
    { country: 'Poland', id: 2 },
    { country: 'Checz Repulic', id: 3 },
    { country: 'Slovakia', id: 4 },
    { country: 'Turkey', id: 5 }
  ], [_item => _item.country], ['asc']),
  get (_id: number): TNullableField<ICountry> {
    return this.list.find(_item => _item.id === _id) || null
  }
}

export const weekdays = {
  list: [
    { label: 'Monday', id: 1, shortLabel: 'Mon' },
    { label: 'Tuesday', id: 2, shortLabel: 'Tue' },
    { label: 'Wednesday', id: 3, shortLabel: 'Wed' },
    { label: 'Thursday', id: 4, shortLabel: 'Thu' },
    { label: 'Friday', id: 5, shortLabel: 'Fri' },
    { label: 'Saturday', id: 6, shortLabel: 'Sat' },
    { label: 'Sunday', id: 7, shortLabel: 'Sun' }
  ],
  get (_id: number): TNullableField<IWeekday> {
    return this.list.find(_item => _item.id === _id) || null
  }
}
