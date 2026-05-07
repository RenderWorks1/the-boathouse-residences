import type { Metadata } from 'next';
import { Faq } from '@/components/sections/Faq';

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Frequently asked questions about Boathouse Residences — purchase, berth licence, marina life and the buying process.',
};

export default function FaqPage() {
  return (
    <section className="pt-[clamp(7rem,14vw+2rem,10rem)]">
      <Faq />
    </section>
  );
}
