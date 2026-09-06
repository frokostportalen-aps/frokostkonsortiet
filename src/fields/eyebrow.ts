import type { Field } from 'payload'

/**
 * The short line a section header sets under its heading, in the site's own
 * spaced capitals ("HER ER 3 REGNESTYKKER"). It is the second half of a title
 * rather than a sentence — the intro field is where running text goes.
 *
 * Shared because the wording of the guidance matters as much as the field: two
 * copies of a Danish `admin.description` drift apart the first time one is
 * tuned.
 */
export const eyebrowField: Field = {
  name: 'eyebrow',
  type: 'text',
  label: 'Spærret underlinje',
  admin: {
    description:
      'Kort linje under overskriften, sat i sitets versaler – fx "Her er 3 regnestykker". Til den halve overskrift, ikke til en sætning.',
  },
}
