module.exports = {
  future: {
    defaultLineHeights: true,
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
    standardFontWeights: true,
  },
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.6s ease-in-out 0s 1 normal forwards running',
      },
      keyframes: {
        shake: {
          '0%': {
            transform: 'translateX(0)',
          },
          '15%': {
            transform: 'translateX(0.375rem)',
          },
          '30%': {
            transform: 'translateX(-0.375rem)',
          },
          '45%': {
            transform: 'translateX(0.375rem)',
          },
          '60%': {
            transform: 'translateX(-0.375rem)',
          },
          '75%': {
            transform: 'translateX(0.375rem)',
          },
          '90%': {
            transform: 'translateX(-0.375rem)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
      },
      screens: {
        'dark-mode': { raw: '(prefers-color-scheme: dark)' },
      },
    },
  },
  variants: {
    margin: ['last', 'responsive'],
  },
  plugins: [
    function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({
        '@font-face': {
          fontFamily: 'Montserrat',
          src:
            "local('Montserrat Medium'), local('Montserrat-Medium'), url(/assets/static/fonts/montserrat/montserrat-medium.woff2) format('woff2')",
          unicodeRange:
            'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
        },
        '::selection': {
          color: theme('colors.white'),
          background: '#e53e3e',
        },
        body: {
          background: '#f0f0f0',
          '@screen dark-mode': {
            background: '#202020',
          },
        },
        footer: {
          background: '#ffffff',
          '@screen dark-mode': {
            background: '#282828',
          },
        },
        h1: {
          fontSize: theme('fontSize.4xl'),
          marginBottom: theme('margin.4'),
          fontFamily: 'Montserrat',
          fontWeight: theme('fontWeight.bold'),
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
        h2: {
          fontSize: theme('fontSize.3xl'),
          fontFamily: 'Montserrat',
          fontWeight: theme('fontWeight.bold'),
          marginBottom: theme('margin.4'),
        },
        ':disabled': {
          cursor: theme('cursor.not-allowed'),
          opacity: theme('opacity.50'),
        },
      })
      addComponents({
        '.description': {
          a: {
            color: theme('colors.blue.700'),
          },
          p: {
            margin: theme('margin.2') + ' ' + theme('margin.0'),
          },
        },
        '.dropdown-content': {
          display: 'none',
          '>*': {
            display: 'block',
          },
        },
        '.dropdown': {
          '&:hover': {
            '.dropdown-content': {
              display: 'block',
            },
          },
        },
        '.flip-card': {
          perspective: '1000px',
        },
        '.flip-card-inner': {
          transition: 'transform 0.7s',
          transformStyle: 'preserve-3d',
        },
        '.flip-card.flipped .flip-card-inner': {
          transform: 'rotateY(180deg)',
        },
        '.flip-card-front, .flip-card-back': {
          backfaceVisibility: 'hidden',
        },
        '.flip-card-front': {
          transform: 'rotateY(0deg)',
        },
        '.flip-card-back': {
          transform: 'rotateY(180deg)',
        },
        '.form-input-error': {
          input: {
            borderColor: theme('colors.red.500'),
            '&:focus': {
              borderColor: theme('colors.red.500'),
            },
          },
          label: {
            color: theme('colors.red.500'),
          },
        },
        '.form-input': {
          appearance: 'none',
          backgroundColor: theme('colors.gray.200'),
          borderColor: theme('colors.gray.200'),
          borderRadius: theme('borderRadius.default'),
          borderWidth: theme('borderWidth.2'),
          color: theme('colors.gray.700'),
          lineHeight: theme('lineHeight.tight'),
          padding: theme('padding.2') + ' ' + theme('padding.4'),
          width: theme('width.full'),
          '&:focus': {
            backgroundColor: theme('colors.white'),
            borderColor: theme('colors.purple.500'),
          },
        },
        '.pills': {
          display: 'flex',
          justifyContent: 'space-between',
          li: {
            width: theme('width.full'),
            button: {
              color: theme('colors.black'),
              fontWeight: theme('fontWeight.semibold'),
              padding: theme('padding.2') + ' ' + theme('padding.4'),
              width: theme('width.full'),
            },
          },
        },
      })
      addUtilities({
        '.bg-half-transparent': {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        '.disabled': {
          cursor: theme('cursor.not-allowed'),
          opacity: theme('opacity.50'),
        },
        '.e1': {
          gridRow: '1',
          gridColumn: '1',
        },
        '.inline-grid': {
          display: 'inline-grid',
        },
        '.line-clamp-box': {
          display: '-webkit-box',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          '-webkit-box-orient': 'vertical',
        },
        '.line-clamp-2': {
          '-webkit-line-clamp': '2',
        },
      })
    },
  ],
  purge: {
    options: {
      whitelist: [':disabled'],
    },
  },
}
