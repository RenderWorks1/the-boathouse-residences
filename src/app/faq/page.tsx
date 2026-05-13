import type { Metadata } from 'next';
import { Faq } from '@/components/sections/Faq';

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Frequently asked questions about Boathouse Residences — purchase, berth licence, marina life and the buying process.',
};

export default function FaqPage() {
  return (
    <section className="bg-salt pt-[clamp(3rem,6vw+0.5rem,5rem)]">
      <Faq />
    </section>
  );
}
