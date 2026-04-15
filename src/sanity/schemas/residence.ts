import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'residence',
  title: 'Residence',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name', maxLength: 96 } }),
    defineField({
      name: 'status',
      type: 'string',
      options: { list: ['Available', 'Under Offer', 'Sold'] },
    }),
    defineField({ name: 'description', type: 'blockContent' }),
    defineField({ name: 'featuredImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'floorplans',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({ name: 'bedrooms', type: 'number' }),
    defineField({ name: 'bathrooms', type: 'number' }),
    defineField({ name: 'parking', title: 'Car Spaces', type: 'number' }),
    defineField({ name: 'internalArea', title: 'Internal Area (m²)', type: 'number' }),
    defineField({ name: 'externalArea', title: 'External Area (m²)', type: 'number' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
});
