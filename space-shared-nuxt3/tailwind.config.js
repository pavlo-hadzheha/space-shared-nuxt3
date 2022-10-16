import { colors } from './tailwind'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    gradient: theme => ({
      green: `linear-gradient(269.27deg, ${theme('colors.green-start')} 11.55%, ${theme('colors.green-end')} 65.31%)`,
      blue: `linear-gradient(251.6deg, ${theme('colors.blue-start')} 24.56%, ${theme('colors.blue-end')} 107.49%)`,
      purple: `linear-gradient(211.28deg, ${theme('colors.purple-start')} -8.26%, ${theme('colors.purple-end')} 144.42%)`,
      orange: `linear-gradient(211.28deg, ${theme('colors.orange-start')} -8.26%, ${theme('colors.orange-end')} 144.42%)`
    }),
    colors,
    spacing: {
      '1/4': '25%',
      0: '0',
      1: '1px',
      2: '0.125rem',
      3: '0.188rem',
      4: '0.25rem',
      5: '0.3125rem',
      6: '0.375rem',
      7: '0.4375rem',
      8: '0.5rem',
      9: '0.575rem',
      10: '0.625rem',
      11: '0.688rem',
      12: '0.75rem',
      14: '0.875rem',
      13: '0.8125rem',
      15: '0.9375rem',
      16: '1rem',
      17: '1.0625rem',
      18: '1.125rem',
      20: '1.25rem',
      22: '1.375rem',
      24: '1.5rem',
      25: '1.5625rem',
      26: '1.625rem',
      27: '27px',
      28: '1.75rem',
      30: '1.875rem',
      32: '2rem',
      35: '2.1875rem',
      36: '2.250rem',
      38: '2.375rem',
      40: '2.5rem',
      42: '42px',
      45: '45px',
      47: '47px',
      48: '48px',
      50: '3.125rem',
      52: '52px',
      55: '3.438rem',
      60: '3.75rem',
      64: '4rem',
      65: '65px',
      70: '70px',
      75: '75px',
      80: '80px',
      95: '95px',
      100: '100px',
      118: '118px',
      120: '120px',
      130: '130px',
      135: '135px',
      140: '140px',
      150: '150px',
      160: '160px',
      170: '170px',
      180: '180px',
      200: '200px',
      210: '210px',
      220: '220px',
      225: '225px',
      240: '240px',
      250: '250px',
      260: '260px',
      270: '270px',
      280: '280px',
      290: '290px',
      300: '300px',
      315: '315px',
      320: '320px',
      340: '340px',
      350: '350px',
      375: '375px',
      385: '385px',
      400: '400px',
      415: '415px',
      430: '430px',
      450: '450px',
      500: '500px',
      535: '535px',
      580: '580px',
      600: '600px',
      615: '615px',
      650: '650px',
      700: '700px',
      800: '800px',
      900: '900px',
      1000: '1000px',
      sm: '24rem',
      '50vh': '50vh',
      '60vh': '60vh',
      '70vh': '70vh',
      '80vh': '80vh',
      '90vh': '90vh'
    },
    borderRadius: {
      none: '0px',
      3: '3px',
      5: '5px',
      8: '8px',
      10: '10px',
      20: '20px',
      25: '25px',
      100: '100px',
      215: '215px',
      full: '9999px'
    },
    boxShadow: {
      DEFAULT: '0px 4px 4px rgba(0, 0, 0, 0.2)',
      none: 'none',
      1: '-1px 1px 4px rgba(0, 0, 0, 0.25)',
      2: '0px 2px 4px rgba(154, 161, 177, 0.75)',
      3: '0px 1px 2px rgba(154, 161, 177, 0.5)',
      4: '0px 0px 10px rgba(11, 157, 208, 0.25)',
      5: '0px 2px 10px rgba(192, 192, 192, 0.5);',
      6: '0px 4px 10px rgba(99, 99, 99, 0.5)',
      7: '0px 10px 30px #7F7F7F'
    },
    fontFamily: {
      sans: [
        'Poppins',
        'sans-serif'
      ]
    },
    fontSize: {
      7: '7px',
      8: '8px',
      9: '9px',
      10: '10px',
      11: '11px',
      12: '12px',
      13: '13px',
      14: '14px',
      15: '15px',
      16: '16px',
      17: '17px',
      18: '18px',
      20: '20px',
      22: '22px',
      24: '24px',
      25: '25px',
      26: '26px',
      28: '28px',
      30: '30px',
      35: '35px',
      40: '40px',
      50: '50px'
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    height: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      full: '100%',
      screen: '100vh',
      max: 'max-content',
      800: '800px',
      850: '850px',
      900: '900px',
      30: '30px',
      2: '2px'
    }),
    inset: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing')),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      full: '100%',
      '-1/2': '-50%',
      '-1/3': '-33.333333%',
      '-2/3': '-66.666667%',
      '-1/4': '-25%',
      '-2/4': '-50%',
      '-3/4': '-75%',
      '-full': '-100%'
    }),
    lineHeight: {
      none: '1',
      10: '10px',
      12: '12px',
      15: '15px',
      16: '16px',
      18: '18px',
      19: '19px',
      21: '21px',
      27: '27px',
      36: '36px',
      140: '140px'
    },
    margin: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing'))
    }),
    maxHeight: (theme) => ({
      ...theme('spacing'),
      full: '100%',
      screen: '100vh',
      800: '800px'
    }),
    maxWidth: (theme, { breakpoints }) => ({
      ...theme('spacing'),
      none: 'none',
      0: '0rem',
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      '7xl': '80rem',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      prose: '65ch',
      ...breakpoints(theme('screens'))
    }),
    minHeight: (theme) => ({
      ...theme('spacing'),
      0: '0px',
      full: '100%',
      screen: '100vh',
      ...theme('spacing')
    }),
    minWidth: (theme) => ({
      ...theme('spacing'),
      ...theme('width'),
      0: '0px',
      780: '780px',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      ...theme('spacing')
    }),
    rotate: {
      '-180': '-180deg',
      '-90': '-90deg',
      '-45': '-45deg',
      '-12': '-12deg',
      '-6': '-6deg',
      '-3': '-3deg',
      '-2': '-2deg',
      '-1': '-1deg',
      0: '0deg',
      1: '1deg',
      2: '2deg',
      3: '3deg',
      6: '6deg',
      12: '12deg',
      45: '45deg',
      90: '90deg',
      180: '180deg'
    },
    space: (theme, { negative }) => ({
      ...theme('spacing'),
      ...negative(theme('spacing'))
    }),
    transitionDuration: {
      DEFAULT: '150ms',
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms'
    },
    translate: (theme, { negative }) => ({
      ...theme('spacing'),
      ...negative(theme('spacing')),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      full: '100%',
      '-1/2': '-50%',
      '-1/3': '-33.333333%',
      '-2/3': '-66.666667%',
      '-1/4': '-25%',
      '-2/4': '-50%',
      '-3/4': '-75%',
      '-full': '-100%'
    }),
    width: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/10': '10%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      590: '590px',
      600: '600px',
      700: '700px',
      full: '100%',
      screen: '100vw',
      min: 'min-content',
      max: 'max-content'
    }),
    extend: {
      opacity: {
        15: '0.15'
      },
      borderWidth: {
        1: '1px'
      },
      transitionDuration: {
        400: '400ms'
      },
      zIndex: {
        1: '1',
        '-1': '-1'
      }
    }
  },
  plugins: [
    // G R A D I E N T  B G
    function ({ addUtilities, theme }) {
      const gradient = theme('gradient')
      const gradientUtilities = Object.keys(gradient).reduce((acc, name) => {
        acc[`.bg-gradient-${name}`] = { 'background-image': gradient[name] }
        return acc
      }, {})

      addUtilities(gradientUtilities, ['responsive', 'hover'])
    },

    // G R A D I E N T   B O R D E R
    function ({ addUtilities, theme }) {
      const gradient = theme('gradient')
      const gradientUtilities = Object.keys(gradient).reduce((acc, name) => {
        acc[`.border-gradient-${name}`] = {
          'border-image': gradient[name],
          'border-image-slice': '1'
        }
        return acc
      }, {})

      addUtilities(gradientUtilities, ['responsive', 'hover'])
    }
  ]
}
