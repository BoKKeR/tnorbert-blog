import type { CollectionConfig } from 'payload'

export const UpsSignups: CollectionConfig = {
  slug: 'ups-signups',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'createdAt'],
    group: 'Products',
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return
        try {
          await req.payload.sendEmail({
            to: 'takacs.norbert1995@gmail.com',
            subject: 'New UPS signup',
            html: `<p>${doc.email} signed up for UPS build updates.</p>`,
          })
        } catch (err) {
          req.payload.logger.error({ err }, 'Failed to send UPS signup notification')
        }
      },
    ],
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
  ],
  timestamps: true,
}
