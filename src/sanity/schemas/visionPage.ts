import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'visionPage',
  title: 'Vision Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'section',
          fields: [
            { name: 'heading', type: 'string' },
            { name: 'body', type: 'blockContent' },
            { name: 'images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
            {
              name: 'layout',
              type: 'string',
              options: { list: ['imageLeft', 'imageRight', 'fullBleed', 'centred'] },
            },
          ],
        }),
      ],
    }),
    defineField({ name: 'videoUrl', type: 'url' }),
  ],
});
