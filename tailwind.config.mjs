/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: [
            {
              // Rich text inherits its colour from whatever surface it sits on,
              // so the same block reads correctly on paper, on a tinted band and
              // on a photo. Said out loud, because it used to rest on an
              // accident: these pointed at `var(--text)`, a variable this
              // project never defined, which made the declaration invalid and
              // let inheritance through by luck.
              '--tw-prose-body': 'inherit',
              '--tw-prose-headings': 'inherit',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      },
    },
  },
}

export default config
