import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video (MP4 URL)',
      type: 'url',
      description: 'Optional — plays as background with heroImage as poster/fallback',
    }),
    defineField({ name: 'lifestyleHeading', type: 'string' }),
    defineField({ name: 'lifestyleBody', type: 'text' }),
    defineField({ name: 'visionHeading', type: 'string' }),
    defineField({ name: 'visionBody', type: 'text' }),
    defineField({
      name: 'coastalLivingImages',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'residencesImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'residencesHeading', type: 'string' }),
    defineField({ name: 'residencesBody', type: 'text' }),
  ],
});
