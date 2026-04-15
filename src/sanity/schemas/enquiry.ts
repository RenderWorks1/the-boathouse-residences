import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'enquiry',
  title: 'Enquiry',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({ name: 'firstName', type: 'string' }),
    defineField({ name: 'lastName', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'source', type: 'string' }),
    defineField({ name: 'submittedAt', type: 'datetime' }),
    defineField({
      name: 'residence',
      type: 'reference',
      to: [{ type: 'residence' }],
      description: 'Optional — populated when the enquiry came from a residence detail page.',
    }),
  ],
});
