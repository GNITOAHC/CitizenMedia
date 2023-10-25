/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    boxShadow: {
      blue: '0px 2px 4px 0px rgba(15, 62, 122, 0.60)',
    },
    colors: {
      divider: 'var(--color-divider)',
      menu_blue: 'var(--color-menu-blue)',
      topbar_button: 'var(--color-topbar-btn)',
      menu_yellow: 'var(--color-menu-yellow)',
      menu_line: 'var(--color-menu-line)',
      newstories_line: 'var(--color-newstories-line)',
      storyblock: 'var(--color-storyblock)',
    },
    height: {
      0.5: '0.125rem',
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [
    require('daisyui'),
    function ({ addUtilities }) {
      const customStyles = {
        newstory_title: {
          color: '#B4B4B4',
          fontFamily: 'Inter',
          fontSize: '42px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: 'normal',
          letterSpacing: '0.21px',
        },
        '.custom-style-2': {
          color: '#FF0000',
          fontFamily: 'Arial',
          fontSize: '48px',
          fontStyle: 'italic',
          fontWeight: '700',
          lineHeight: '1.5',
          letterSpacing: '1px',
        },
      }

      addUtilities(customStyles, ['responsive', 'hover'])
    },
  ],
  darkMode: 'class',
}
