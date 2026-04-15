import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'missing-project-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'The Boathouse Residences',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [deskTool(), visionTool()],
  schema: { types: schemaTypes },
});
