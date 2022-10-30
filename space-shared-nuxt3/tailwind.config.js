
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      xs: '450px',
      sm: '575px',
      md: '767px',
      lg: '991px',
      xl: '1199px',
      xxl: '1399px'
    },
    fontFamily: {
      sans: [
        'Poppins',
        'sans-serif'
      ]
    },
    extend: {
      colors: {
        transparent: 'transparent',
        success: '#70E0DE',
        primary: '#F30067',
        danger: '#FD3E3E',
        disabled: '#C0C4CC',
        info: '#696969'
      },
      boxShadow: {
        'from-below': '0px -1px 8px -1px rgba(0,0,0,0.66)'
      },
      fontSize: {
        md: '16px'
      }
    }
  }
}
