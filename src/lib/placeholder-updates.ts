export type BuildUpdate = {
  _id: string;
  title: string;
  date: string;
  milestone?: string;
  body: string;
  images: string[];
};

export const buildUpdates: BuildUpdate[] = [
  {
    _id: 'u1',
    title: 'Rooftop Glazing Installed',
    date: '2026-03-20',
    milestone: 'Topped Out',
    body: 'The final panels of the rooftop glazing have been lifted into place this month. With the envelope now sealed, internal fit-out begins on the upper floors.',
    images: ['/images/2bedroom_v1_.jpg', '/images/2bedroom_v2.jpg', '/images/2bedroom_v3_.jpg'],
  },
  {
    _id: 'u2',
    title: 'Interior Sample Apartment Complete',
    date: '2026-02-14',
    milestone: 'Display Ready',
    body: 'The first fully-fitted display residence is now complete on level three. Travertine, oak and plaster have all landed beautifully in person.',
    images: ['/images/studio_int_v1.jpg', '/images/studio_int_v2.jpg', '/images/studio_int_v3.jpg'],
  },
  {
    _id: 'u3',
    title: 'Structural Topping Out',
    date: '2025-12-05',
    milestone: 'Structure Complete',
    body: 'We reached the highest point of the structure this month. A small ceremony was held on site with the project team and the lead architects.',
    images: ['/images/2bedroom_v4.jpg', '/images/2bedroom_v5.jpg'],
  },
  {
    _id: 'u4',
    title: 'Foundations & Basement',
    date: '2025-08-10',
    milestone: 'Foundation Complete',
    body: 'Basement slab and foundations have been poured. Waterproofing to the marine-facing walls is underway, and tower crane installation begins next week.',
    images: ['/images/2bedroom_v6.jpg'],
  },
];
