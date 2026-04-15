import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', type: 'string' }),
    defineField({ name: 'siteDescription', type: 'text' }),
    defineField({ name: 'contactEmail', type: 'string' }),
    defineField({ name: 'contactPhone', type: 'string' }),
    defineField({ name: 'salesSuiteAddress', type: 'text' }),
    defineField({ name: 'instagramUrl', type: 'url' }),
    defineField({ name: 'facebookUrl', type: 'url' }),
    defineField({ name: 'developerLogos', type: 'array', of: [{ type: 'image' }] }),
    defineField({ name: 'ogImage', type: 'image' }),
    defineField({ name: 'disclaimer', type: 'text' }),
  ],
});
