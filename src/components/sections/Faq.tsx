import { ScrollReveal } from '@/components/ui/ScrollReveal';

type QA = { q: string; a: string };
type Group = { title: string; items: QA[] };

const groups: Group[] = [
  {
    title: 'General',
    items: [
      {
        q: 'What are Boathouse Residences?',
        a: 'Boathouse Residences is a limited collection of architecturally designed floating homes located within Hobsonville Marina. Each residence is positioned within a designated marina berth, offering a unique waterfront living experience with a direct connection to the water.',
      },
      {
        q: 'What is included in the purchase price?',
        a: 'The purchase price includes the completed Boathouse Residence together with the associated rights to occupy its designated berth within the marina.',
      },
      {
        q: 'Do I own the berth?',
        a: 'The Boathouse Residence includes the right to occupy a designated marina berth. This is secured through a formal berth licence (or tenure arrangement), providing exclusive use of that position within the marina.',
      },
      {
        q: 'Is the berth included in the purchase?',
        a: 'Yes. The purchase includes the residence together with the associated rights to occupy its designated berth within Hobsonville Marina.',
      },
      {
        q: 'Is the berth licence transferable?',
        a: 'Yes, the berth licence is generally transferable upon the sale of the residence, subject to marina approval and standard documentation requirements.',
      },
    ],
  },
  {
    title: 'Berth Licence & Marina',
    items: [
      {
        q: 'What is a berth licence?',
        a: 'A berth licence grants the right to occupy and use a specific marina berth for the purpose of mooring your Boathouse Residence. It is governed by Hobsonville Marina’s operational rules and management framework.',
      },
      {
        q: 'Are there ongoing costs associated with the berth?',
        a: 'Yes. Ongoing operational and maintenance costs (OPEX) apply and are payable in addition to the purchase price.',
      },
      {
        q: 'What do OPEX costs typically cover?',
        a: 'Operational costs contribute to the upkeep and management of the marina, including maintenance of infrastructure, common areas, marina services and general operations.',
      },
      {
        q: 'Who manages the marina?',
        a: 'Hobsonville Marina is professionally managed to ensure the ongoing maintenance of facilities, compliance with regulations and the smooth operation of the precinct.',
      },
    ],
  },
  {
    title: 'Utilities & Services',
    items: [
      {
        q: 'Are power and water connected?',
        a: 'Yes. Each Boathouse Residence is connected to marina services, including power and water.',
      },
      {
        q: 'How are utilities charged?',
        a: 'Power and water usage are individually metered, and residents are responsible for their own consumption.',
      },
      {
        q: 'Are there any additional service connections?',
        a: 'Further details regarding services such as wastewater, communications and other utilities will be provided within the information pack.',
      },
    ],
  },
  {
    title: 'Living at the Marina',
    items: [
      {
        q: 'Can I live in the Boathouse Residence full-time?',
        a: 'Boathouse Residences are designed to support full-time living, subject to compliance with marina regulations and any applicable council requirements.',
      },
      {
        q: 'Are there rules for living within the marina?',
        a: 'Yes. Residents are required to comply with Hobsonville Marina’s rules and regulations, which are designed to maintain safety, amenity and a high standard of living throughout the precinct.',
      },
      {
        q: 'What kind of lifestyle can I expect?',
        a: 'Life at Hobsonville Marina offers a balance of waterfront living, community and connectivity. Residents enjoy direct access to the marina, coastal walkways, nearby cafés and village amenities, along with ferry connections to the city.',
      },
    ],
  },
  {
    title: 'Ownership & Use',
    items: [
      {
        q: 'Can I rent out my Boathouse Residence?',
        a: 'Rental is generally permitted, subject to marina rules and any applicable regulatory requirements. Further details will be outlined in the information pack.',
      },
      {
        q: 'Can I make changes to my residence?',
        a: 'Any modifications must comply with marina guidelines and may require approval to ensure consistency, safety and design integrity across the precinct.',
      },
    ],
  },
  {
    title: 'Practical Considerations',
    items: [
      {
        q: 'Is there parking available?',
        a: 'Parking provisions will be confirmed as part of the individual residence offering. Please refer to your specific residence details.',
      },
      {
        q: 'Are pets allowed?',
        a: 'Pet ownership is subject to marina rules and regulations. Further details can be provided upon request.',
      },
      {
        q: 'What about insurance?',
        a: 'Owners are responsible for arranging appropriate insurance for their residence. Specific requirements may apply given the marina environment.',
      },
    ],
  },
  {
    title: 'Purchasing Process',
    items: [
      {
        q: 'How do I secure a Boathouse Residence?',
        a: 'Interested purchasers can register their interest and will be guided through the purchase process, including access to plans, pricing and contractual documentation.',
      },
      {
        q: 'What deposit is required?',
        a: 'A deposit of 50% of the purchase price is required to secure a Boathouse Residence. This reflects the limited nature of marina positions and the inclusion of berth occupation rights within the purchase.',
      },
      {
        q: 'When is the remaining balance payable?',
        a: 'The balance of the purchase price is payable in accordance with the terms outlined in the sale and purchase agreement. Full details will be provided upon enquiry.',
      },
      {
        q: 'Where can I get more detailed information?',
        a: 'A comprehensive information pack is available, including plans, specifications, pricing and detailed terms relating to the berth licence and marina operations.',
      },
    ],
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-salt">
      <div className="section-px section-py w-full max-w-none">
        <ScrollReveal className="mx-auto mb-[clamp(2.5rem,5vw,4rem)] flex max-w-[68rem] flex-col items-center gap-[clamp(1rem,2.5vw,1.75rem)] text-center">
          <p className="font-sans uppercase tracking-[0.3em] text-rope text-[clamp(0.65rem,0.22vw+0.55rem,0.78rem)]">
            Boathouse Residences
          </p>
          <h2 className="w-full font-vision text-[clamp(1.875rem,1.05rem+1.55vw,3.5rem)] font-normal leading-[1.15] tracking-tight text-charcoal">
            Frequently Asked Questions
          </h2>
        </ScrollReveal>

        <div className="mx-auto flex w-full max-w-[68rem] flex-col gap-[clamp(2.5rem,5vw,4rem)]">
          {groups.map((group) => (
            <ScrollReveal key={group.title}>
              <h3 className="mb-[clamp(1rem,2vw,1.5rem)] font-sans uppercase tracking-[0.3em] text-harbour text-[clamp(0.7rem,0.25vw+0.6rem,0.85rem)]">
                {group.title}
              </h3>
              <ul className="border-t border-charcoal/15">
                {group.items.map((item) => (
                  <li key={item.q} className="border-b border-charcoal/15">
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-[clamp(1rem,2.5vw,1.75rem)] py-[clamp(1rem,2vw,1.35rem)] font-sans text-[clamp(0.95rem,0.42vw+0.84rem,1.125rem)] font-light leading-[1.5] text-charcoal transition-colors hover:text-harbour [&::-webkit-details-marker]:hidden">
                        <span>{item.q}</span>
                        <span
                          aria-hidden
                          className="mt-[0.35em] block h-[1px] w-[clamp(0.85rem,1.5vw,1.1rem)] flex-none bg-charcoal transition-transform duration-300 ease-luxe before:absolute before:h-[1px] before:w-[clamp(0.85rem,1.5vw,1.1rem)] before:bg-charcoal before:rotate-90 before:origin-center group-open:before:rotate-0 relative"
                        />
                      </summary>
                      <p className="pb-[clamp(1.25rem,2.5vw,1.75rem)] pr-[clamp(1.5rem,3vw,2.5rem)] font-sans text-[clamp(0.875rem,0.35vw+0.8rem,1rem)] font-light leading-[1.7] text-charcoal/80">
                        {item.a}
                      </p>
                    </details>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mx-auto mt-[clamp(3rem,6vw,5rem)] flex max-w-[60rem] flex-col items-center gap-[clamp(1rem,2vw,1.5rem)] text-center">
          <p className="text-balance font-sans text-[clamp(0.95rem,0.42vw+0.84rem,1.125rem)] font-light leading-[1.65] text-charcoal">
            For more information or to arrange a private appointment, please contact the sales team or
            register your interest below.
          </p>
          <p className="text-balance font-sans text-[clamp(0.75rem,0.22vw+0.66rem,0.875rem)] font-light leading-[1.65] text-charcoal/55">
            All information provided is indicative only and subject to change. Final terms, costs and
            conditions will be confirmed in the formal sale and legal documentation.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
