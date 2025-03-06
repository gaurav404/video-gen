import plugin from 'tailwindcss/plugin'


export const themePlugin = plugin(
  // eslint-disable-next-line @typescript-eslint/unbound-method
  function ({ addBase }) {
    addBase({
      ':root': {
        // Background Colors
        '--bg-primary': "#EDF2FA",
        '--bg-secondary':"#FFFFFF",
        '--bg-tertiary': "#F7F9FF",

        // Text Colors
        '--text-default-title': "#1E1E22",
        '--text-default-body': "#494A4A",
        '--text-active': "#025FCA",
        '--text-inactive': "#757575",
        '--text-static-black': "#1E1E22",
        '--text-static-white': "#FFFFFF",
        '--text-success': "#0ACB7E",
        '--text-error': "#C7001B",

        // Fill Colors
        '--fill-primary-active': "#0266DA",
        // Border Colors
        '--border-attention': "#F66A05",
              // Sheer Fills
        '--sheer-fills-40': pallete.transparent[650],
        '--sheer-fills-50': pallete.transparent[750],
        '--sheer-fills-60': pallete.transparent[800],
        '--sheer-fills-70': pallete.transparent[850],
        '--sheer-fills-inverted-10': pallete.transparent[150],
        '--sheer-fills-inverted-20': pallete.transparent[250],
        '--sheer-fills-inverted-40': pallete.transparent[500],
        '--sheer-fills-static-white-20': pallete.transparent[275],
        '--sheer-fills-static-white-30': pallete.transparent[350],
        '--sheer-fills-static-white-50': pallete.transparent[450],
        '--sheer-fills-static-black-20': pallete.transparent[300],
        '--sheer-fills-static-black-30': pallete.transparent[400],
        '--sheer-fills-static-black-50': pallete.transparent[600],
      },
    })
  },
  {
    theme: {
      extend: {
        textColor: {
          default: {
            title: 'var(--text-default-title)',
            body: 'var(--text-default-body)',
            caption: 'var(--text-default-caption)',
          },
          active: 'var(--text-active)',
          inactive: 'var(--text-inactive)',
          static: {
            black: 'var(--text-static-black)',
            white: 'var(--text-static-white)',
          },
          inverted: 'var(--text-inverted)',
          success: 'var(--text-success)',
          warning: 'var(--text-warning)',
          error: 'var(--text-error)',
        },
        backgroundColor: {
          primary: {
            DEFAULT: 'var(--bg-primary)',
          },
          secondary: {
            DEFAULT: 'var(--bg-secondary)',
          },
          tertiary: {
            DEFAULT: 'var(--bg-tertiary)',
          },
          event: {
            value: 'var(--event-value)',
            urgent: 'var(--event-urgent)',
            attention: 'var(--event-attention)',
            physics: 'var(--event-physics)',
            chemistry: 'var(--event-chemistry)',
            biology: 'var(--event-biology)',
            maths: 'var(--event-maths)',
          },
          fill: {
            primary: {
              active: 'var(--fill-primary-active)',
            },
            secondary: {
              active: 'var(--fill-secondary-active)',
            },
            tertiary: {
              active: 'var(--fill-tertiary-active)',
              subtle: 'var(--fill-tertiary-subtle)',
            },
            inverted: 'var(--fill-inverted)',
            inactive: 'var(--fill-inactive)',
            success: {
              bold: 'var(--fill-success-bold)',
              subtle: 'var(--fill-success-subtle)',
            },
            error: {
              bold: 'var(--fill-error-bold)',
              subtle: 'var(--fill-error-subtle)',
            },
            warning: {
              bold: 'var(--fill-warning-bold)',
              subtle: 'var(--fill-warning-subtle)',
            },
            static: {
              black: 'var(--fill-static-black)',
              white: 'var(--fill-static-white)',
            },
            pressed: {
              overlay: 'var(--fill-pressed-overlay)',
            },
          },
          sheer: {
            fills: {
              40: 'var(--sheer-fills-40)',
              50: 'var(--sheer-fills-50)',
              60: 'var(--sheer-fills-60)',
              70: 'var(--sheer-fills-70)',
              inverted: {
                10: 'var(--sheer-fills-inverted-10)',
                20: 'var(--sheer-fills-inverted-20)',
                40: 'var(--sheer-fills-inverted-40)',
              },
              static: {
                white: {
                  20: 'var(--sheer-fills-static-white-20)',
                  30: 'var(--sheer-fills-static-white-30)',
                  50: 'var(--sheer-fills-static-white-50)',
                },
                black: {
                  20: 'var(--sheer-fills-static-black-20)',
                  30: 'var(--sheer-fills-static-black-30)',
                  50: 'var(--sheer-fills-static-black-50)',
                },
              },
            },
          },
          overlay: 'var(--overlay)',
        },
        boxShadow: {
          lightest: 'var(--shadow-lightest)',
          darker: 'var(--shadow-darker)',
          darkest: 'var(--shadow-darkest)',
        },
        borderColor: {
          default: {
            active: 'var(--border-default-active)',
          },
          brand: {
            active: 'var(--border-brand-active)',
          },
          mute: {
            active: 'var(--border-mute-active)',
          },
          inactive: 'var(--border-inactive)',
          static: {
            black: 'var(--border-static-black)',
            white: 'var(--border-static-white)',
          },
          success: 'var(--border-success)',
          warning: 'var(--border-warning)',
          error: 'var(--border-error)',
          transparent: 'var(--border-transparent)',
          attention: 'var(--border-attention)',
        },
      },
    },
  },
)

const pallete = {
    transparent: {
        100: "rgba(0, 0, 0, 0.10)",
        150: "rgba(15, 15, 15, 0.10)",
        200: "rgba(0, 0, 0, 0.12)",
        250: "rgba(15, 15, 15, 0.20)",
        275: "rgba(255, 255, 255, 0.20)",
        300: "rgba(0, 0, 0, 0.20)",
        350: "rgba(255, 255, 255, 0.30)",
        400: "rgba(0, 0, 0, 0.30)",
        450: "rgba(255, 255, 255, 0.50)",
        500: "rgba(15, 15, 15, 0.40)",
        600: "rgba(0, 0, 0, 0.50)",
        650: "rgba(237, 242, 250, 0.40)",
        700: "rgba(0, 0, 0, 0.62)",
        725: "rgba(0, 0, 0, 0.70)",
        750: "rgba(237, 242, 250, 0.50)",
        800: "rgba(237, 242, 250, 0.60)",
        825: "rgba(30, 30, 34, 0.60)",
        850: "rgba(237, 242, 250, 0.70)",
        900: "rgba(0, 0, 0, 0.82)",
      },
}