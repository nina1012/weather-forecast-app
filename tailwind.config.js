module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'clouds-pattern': "url('./src/images/Cloud-background.png')",
      }),
      backgroundPosition: {
        'top-30': 'center top 60px',
      },
      colors: {
        primaryLight: '#1E213A',
        primaryDark: '#100E1D',
        buttonGray: ' #6E707A',
        buttonPurple: '#3C47E9',
        grayLight: '#A09FB1',
        brownDark: '#616475',
        buttonGrayText: '#E7E7EB',
        buttonBlue: '#3C47E9',
        lightGray: '#E7E7EB',
        borderLight: '#616475',
        temperatureDarkBtn: '#585676',
      },
      spacing: {
        dayCardWidth: '120px',
        dayCardImgWidth: '56px',
        highlightCardWidth: '328px',
        'aside-width': '459px',
        'icon-width-small': '150px',
        'icon-width-large': '202px',
      },
      height: {
        dayCardHeight: '177px',
        dayCardImgHeight: '62px',
      },
      gridTemplateColumns: {
        '1/3': '459px 1fr',
        'highlight-2': '328px 328px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
