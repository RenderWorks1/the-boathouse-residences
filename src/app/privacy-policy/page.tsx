import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How The Boathouse Residences collects, uses, discloses and protects your personal information under the Privacy Act 2020 (New Zealand).',
};

const headingClass =
  'font-vision text-[clamp(1.25rem,0.85rem+0.8vw,1.75rem)] font-normal leading-[1.2] tracking-tight text-charcoal';
const bodyClass =
  'font-sans text-[clamp(0.9375rem,0.42vw+0.82rem,1.125rem)] font-light leading-[1.65] text-charcoal';
const listClass = `${bodyClass} flex list-disc flex-col gap-[clamp(0.35rem,1vw,0.6rem)] pl-[1.25em] marker:text-driftwood`;

/** Each block is a heading followed by its paragraphs and, where the copy uses
 *  them, a bulleted list. Keeps the page a single readable column. */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <ScrollReveal className="flex flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
      <h2 className={headingClass}>{title}</h2>
      {children}
    </ScrollReveal>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-salt pt-[clamp(7rem,14vw+2rem,10rem)]">
      <div className="section-px section-py mx-auto w-full max-w-[52rem]">
        <ScrollReveal className="flex flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
          <h1 className="font-vision text-[clamp(1.875rem,1.05rem+1.55vw,3.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
            Privacy Policy
          </h1>
          <p className="font-sans font-light tracking-wide text-charcoal/70 text-[clamp(0.8125rem,0.35vw+0.72rem,0.9375rem)]">
            Last updated: 17 July 2026
          </p>
        </ScrollReveal>

        <div className="mt-[clamp(2rem,4vw,3rem)] flex flex-col gap-[clamp(2rem,4vw,3rem)]">
          <ScrollReveal className="flex flex-col gap-[clamp(0.85rem,2vw,1.35rem)]">
            <p className={bodyClass}>
              The Boathouse Residences (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is
              committed to protecting your privacy. This Privacy Policy explains how we collect,
              use, disclose and protect your personal information in accordance with the Privacy
              Act 2020 (New Zealand).
            </p>
            <p className={bodyClass}>
              By using our website or providing your personal information to us, you agree to this
              Privacy Policy.
            </p>
          </ScrollReveal>

          <Section title="Information We Collect">
            <p className={bodyClass}>We may collect personal information including:</p>
            <ul className={listClass}>
              <li>Your name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>
                Information you provide when submitting an enquiry or requesting a brochure
              </li>
              <li>Any other information you choose to provide to us</li>
              <li>
                Technical information such as your IP address, browser type, device information and
                website activity
              </li>
            </ul>
          </Section>

          <Section title="How We Collect Your Information">
            <p className={bodyClass}>We collect personal information when you:</p>
            <ul className={listClass}>
              <li>Complete an enquiry form on our website</li>
              <li>Submit your details through one of our online advertising campaigns</li>
              <li>Request a brochure or information pack</li>
              <li>Contact us by phone or email</li>
              <li>Visit and interact with our website</li>
            </ul>
          </Section>

          <Section title="How We Use Your Information">
            <p className={bodyClass}>We may use your personal information to:</p>
            <ul className={listClass}>
              <li>Respond to your enquiries</li>
              <li>Provide brochures, pricing, floorplans and development information</li>
              <li>Contact you regarding Boathouse Residences</li>
              <li>Arrange appointments or inspections</li>
              <li>Send you updates about the development where appropriate</li>
              <li>Improve our website and marketing</li>
              <li>Comply with our legal obligations</li>
            </ul>
            <p className={bodyClass}>
              You may opt out of receiving marketing communications at any time.
            </p>
          </Section>

          <Section title="Cookies and Website Analytics">
            <p className={bodyClass}>
              Our website uses cookies and similar technologies to improve your browsing experience
              and help us understand how visitors use our website.
            </p>
            <p className={bodyClass}>
              We may also use online advertising and analytics services to measure the performance
              of our marketing campaigns and improve our website.
            </p>
            <p className={bodyClass}>
              You can choose to disable cookies through your browser settings, although some parts
              of the website may not function correctly.
            </p>
          </Section>

          <Section title="Disclosure of Personal Information">
            <p className={bodyClass}>
              We may share your personal information with trusted third-party service providers who
              assist us in operating our website, managing enquiries, communicating with customers
              or providing professional services.
            </p>
            <p className={bodyClass}>
              We may also disclose your information where required or permitted by law.
            </p>
            <p className={bodyClass}>
              We do not sell or rent your personal information to third parties.
            </p>
          </Section>

          <Section title="Storage and Security">
            <p className={bodyClass}>
              We take reasonable steps to protect your personal information from loss, misuse,
              unauthorised access, disclosure or alteration.
            </p>
            <p className={bodyClass}>
              While we take reasonable security measures, no method of transmitting information
              over the internet or storing information electronically is completely secure.
            </p>
          </Section>

          <Section title="Access and Correction">
            <p className={bodyClass}>
              You have the right to request access to the personal information we hold about you
              and to request correction of any information that is inaccurate.
            </p>
            <p className={bodyClass}>To do so, please contact us using the details below.</p>
          </Section>

          <Section title="Changes to this Privacy Policy">
            <p className={bodyClass}>
              We may update this Privacy Policy from time to time. Any changes will be published on
              this page with an updated effective date.
            </p>
          </Section>

          <Section title="Contact Us">
            <p className={bodyClass}>
              If you have any questions about this Privacy Policy or wish to access or correct your
              personal information, please contact us.
            </p>
            <div className={`${bodyClass} flex flex-col`}>
              <p>Boathouse Residences</p>
              <p>18 Clearwater Cove</p>
              <p>Hobsonville</p>
              <p>Auckland 0618</p>
            </div>
            <div className={`${bodyClass} flex flex-col`}>
              <p>
                Phone:{' '}
                <a href="tel:+642102720203" className="transition-colors hover:text-harbour">
                  +64 21 027 20203
                </a>
              </p>
              <p>
                Email:{' '}
                <a
                  href="mailto:info@boathouseresidences.co.nz"
                  className="transition-colors hover:text-harbour"
                >
                  info@boathouseresidences.co.nz
                </a>
              </p>
              <p>
                Website:{' '}
                <a
                  href="https://www.boathouseresidences.co.nz/"
                  className="transition-colors hover:text-harbour"
                >
                  https://www.boathouseresidences.co.nz/
                </a>
              </p>
            </div>
          </Section>
        </div>
      </div>
    </section>
  );
}
