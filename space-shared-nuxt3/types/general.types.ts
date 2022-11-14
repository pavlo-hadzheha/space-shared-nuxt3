export type TIndexedObject<T = any> = {
  [key: string]: T
}

export type TNullableField<T> = T | null
export type TCallbackFn<T extends unknown[] = [], R = void> = (...args: T) => R

export enum EGlobalStateName {
  AUTH = 'auth',
  GENERAL = 'general'
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

export interface ISpaceFeature {
  name: string
  id: null
}

export interface ISpaceCategory {
  name: string
  id: null
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

export interface IUser {
  email: string
  password: string
  firstName: string
  lastName: string
  company?: string
  phone?: string
  rule: EUserRule
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
