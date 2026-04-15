import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'buildUpdate',
  title: 'Build Update',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'date', type: 'date' }),
    defineField({ name: 'content', type: 'blockContent' }),
    defineField({
      name: 'images',
      title: 'Photo Carousel',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'milestone',
      title: 'Milestone Badge',
      type: 'string',
      description: 'Optional milestone label, e.g. "Foundation Complete"',
    }),
  ],
});
