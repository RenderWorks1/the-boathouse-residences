'use client';

import { usePathname } from 'next/navigation';
import { EnquiryForm } from '@/components/sections/EnquiryForm';

const SKIP = new Set(['/', '/enquire', '/interiors', '/lifestyle', '/faq']);

export function GlobalEnquiry() {
  const pathname = usePathname() ?? '/';
  if (SKIP.has(pathname)) return null;
  return <EnquiryForm />;
}
