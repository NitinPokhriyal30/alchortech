/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '360px',
      // => @media (min-width: 360px) { ... }
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      xxl: '1550px',
      // => @media (min-width: 1536px) { ... }
    },
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
    },
    extend: {
      spacing: {
        "2/5": "40%",
        8.5: '2.125rem',
        '11px': '0.6875rem',
        nav: '87px',
        'nav-lg': '76px',
        'avoid-nav': 'calc(100vh - 87px)',
        'avoid-nav-lg': 'calc(100vh - 87px)',
      },
      backgroundImage: {
        'hero-slider1': "url('../src/assets/slider/slider-bg1.png')",
        'hero-slider2': "url('../src/assets/slider/slider-bg2.png')",
        'hero-slider3': "url('../src/assets/slider/slider-bg3.png')",
      },
      animation: {
        'slide-left': 'slide-left 1000ms forwards',
      },
      keyframes: {
        'slide-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      colors: {
        primary: '#5486E3',
        'primary-400': '#93c5fd',
        translucent: '#F7F7F7',
        'translucent-white': 'rgba(256 256 256 / 0.15)',
        'translucent-black': 'rgba(0 0 0 / 0.15)',
        paper: 'rgb(231, 235, 240)',
        iconColor: '#D1D1D1',
        "text-black": "#464646",

        // borderColors
        300: '#efefef',
        400: '#dbdbdb',
      },
      fontSize: {
        '10px': ['10px', '14px'],
        '16px': ['16px', '19px'],
        '18px': ['18px', '22px'],
      },
      fontFamily: {
        Lato: ['Lato'],
        Roboto: ['Roboto Slab'],
      },
      gridTemplateColumns: {
        mediumDevice: '270px 1fr auto', // MD
        smallDevice: '1fr auto', // SM
      },
      dropShadow: {
        normal: '0px 2px 3px #00000029',
        tooltipShadow: '0px 2px 6px #44444F1A',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *')
    },
  ],
}












  // < div className = "bg-[#fff] text-center px-5 py-3 rounded-[9px] drop-shadow-[0px_2px_3px_#00000029]" >
  //   <div className="space-y-2">
  //     <p className="animate-pulse w-full bg-gray-300 rounded">&nbsp;</p>
  //     <p className="animate-pulse w-full bg-gray-300 rounded">&nbsp;</p>
  //   </div>
  //     </ div >
