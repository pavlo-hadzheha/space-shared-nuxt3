export type TIndexedObject<T = any> = {
  [key: string]: T
}

export type TNullableField<T> = T | null
export type TCallbackFn<T extends unknown[] = [], R = void> = (...args: T) => R

export enum EGlobalStateName {
  AUTH = 'auth',
  GENERAL = 'general',
  SPACES = 'spaces',
  GEOCODE = 'geocode'
}

export enum EBreakpoint {
  XXL = 1320,
  XL = 1140,
  LG = 960,
  MD = 720,
  SM = 540
}

export enum EUserRule {
  USER = 1,
  HOST = 2,
  ADMIN = 3
}

export enum EComponentType {
  INFO = 'info',
  PRIMARY = 'primary',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
  ERROR = 'error'
}

export enum EComponentSize {
  DEFAULT = 'default',
  LARGE = 'large',
  SMALL = 'small'
}

export enum EButtonSize {
  XXL = 'xxl',
  XL = 'xl',
  LG = 'lg',
  MD = 'md',
  SM = 'sm'
}

export interface INavigation {
  label: string
  name: string
}
export interface IMapView {
  TopLeft: any
  BottomRight: any
}

export interface ISpaceFeature {
  label: string
  id: string
}

export interface ISpaceCategory {
  label: string
  id: string
}

export interface IReviewPayload {
  message: string
  count: TNullableField<number>
}

export interface IReview extends IReviewPayload {
  spaceId: string
  userId: string
  userFirstName: string
  userLastName: string
  leftOn: string | Date
  id: string
}

export interface ICountry {
  country: string
  id: number
}

export interface IWeekday {
  label: string
  shortLabel: string
  id: number
}

export interface IDayTimeSpan {
  available: boolean
  order: number
  from: string
  to: string
}

export interface IGeocodePayload {
  country?: string
  city?: string
  street?: string
  house?: string
}

export interface ISchedule {
  sunday: IDayTimeSpan
  monday: IDayTimeSpan
  tuesday: IDayTimeSpan
  wednesday: IDayTimeSpan
  thursday: IDayTimeSpan
  friday: IDayTimeSpan
  saturday: IDayTimeSpan
}

export interface ILocation {
  lon: string
  lat: string
  mapView: IMapView
  country: string
  countryCode: string
  city: string
  street: string
  house: string
  label: string
}

export interface IImage {
  name: string
  url: string
}

export interface ISpacePayload {
  categoryId: string
  title: string
  description: string
  location: ILocation
  opened_at: ISchedule
  hourly_rate: number
  phone: string
  images: IImage[]
  features: string[]
}

export interface ISpace extends ISpacePayload {
  books: number[]
  id: string
}

export interface IUser {
  email: string
  password: string
  firstName: string
  lastName: string
  company?: string
  phone?: string
  rule: EUserRule
}

export interface IRegisterPayload {
  email: string
  password: string
  firstName: string
  lastName: string
  company: TNullableField<string>
  phone: string
  rule: EUserRule
}

export interface ILoginPayload {
  email: string
  password: string
}
