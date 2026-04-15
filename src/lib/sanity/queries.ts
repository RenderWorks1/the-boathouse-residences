export const homePageQuery = /* groq */ `*[_type == "homePage"][0]{
  heroImage, heroVideo,
  lifestyleHeading, lifestyleBody,
  visionHeading, visionBody,
  coastalLivingImages,
  residencesImage, residencesHeading, residencesBody
}`;

export const residencesListQuery = /* groq */ `*[_type == "residence"] | order(order asc){
  _id, name, slug, status, featuredImage,
  bedrooms, bathrooms, parking, internalArea, description
}`;

export const residenceBySlugQuery = /* groq */ `*[_type == "residence" && slug.current == $slug][0]{
  ..., gallery, floorplans
}`;

export const buildUpdatesQuery = /* groq */ `*[_type == "buildUpdate"] | order(date desc){
  _id, title, date, content, images, milestone
}`;

export const siteSettingsQuery = /* groq */ `*[_type == "siteSettings"][0]`;

export const lifestylePageQuery = /* groq */ `*[_type == "lifestylePage"][0]{
  heroImage,
  sections,
  galleryImages
}`;

export const visionPageQuery = /* groq */ `*[_type == "visionPage"][0]{
  heroImage, sections, videoUrl
}`;
