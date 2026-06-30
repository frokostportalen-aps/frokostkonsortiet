import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Overskrift',
    },
    {
      name: 'intro',
      type: 'text',
      label: 'Underoverskrift',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      labels: {
        singular: 'Udtalelse',
        plural: 'Udtalelser',
      },
      admin: {
        description:
          'Vises i et marquee-bånd, der ruller automatisk og holder pause, når man holder musen over.',
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          label: 'Citat',
        },
        {
          name: 'author',
          type: 'text',
          required: true,
          label: 'Navn',
        },
        {
          name: 'role',
          type: 'text',
          label: 'Titel / virksomhed',
        },
      ],
    },
  ],
}
