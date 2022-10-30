
export type TIndexedObject<T = any> = {
  [key: string]: T
}

export type TNullableField<T> = T | null
export type TCallbackFn<T extends unknown[] = [], R = void> = (...args: T) => R

export enum EBreakpoint {
  XXL = 1320,
  XL = 1140,
  LG = 960,
  MD = 720,
  SM = 540
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
