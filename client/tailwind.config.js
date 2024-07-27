/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      objectFit: {
        cover: 'cover',
      },
      aspectRatio: {
        '16/9': '16 / 9',
      },
      transitionProperty: {
        all: 'all',
      },
      transitionDuration: {
        200: '200ms',
      },
      transitionTimingFunction: {
        ease: 'ease',
      },
      transform: {
        'translate-x-0': 'translateX(0%)',
      },
    },
  },
  plugins: [],
}
