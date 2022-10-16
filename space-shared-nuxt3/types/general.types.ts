
export type TIndexedObject<T = any> = {
  [key: string]: T
}

export enum EBreakpoint {
  XXL = 1320,
  XL = 1140,
  LG = 960,
  MD = 720,
  SM = 540
}

/*
  width: 100%;
  margin: auto;

  @media screen and (min-width: 576px) {
    width: 540px;
  }

  @media screen and (min-width: 768px) {
    width: 720px;
  }

  @media screen and (min-width: 992px) {
    width: 960px;
  }

  @media screen and (min-width: 1200px) {
    width: 1140px;
  }

  @media screen and (min-width: 1400px) {
    width: 1320px;
  }
*/

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

}

export interface INavigation {
  label: string
  name: string
}
