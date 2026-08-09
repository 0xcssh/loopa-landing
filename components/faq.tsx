type QA = { q: string; a: string };

// UI FAQ — doit toujours provenir du MÊME tableau que le FAQPage schema
// (voir lib/schema.ts, faqPageSchema) pour ne jamais diverger.
export function Faq({ title, items }: { title?: string; items: QA[] }) {
  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold tracking-tight text-[#4E3A5C] sm:text-3xl">{title}</h2>
      )}
      <dl className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item.q}
            className="rounded-2xl border border-[#4E3A5C]/10 bg-white p-5 shadow-sm"
          >
            <dt className="font-semibold text-[#4E3A5C]">{item.q}</dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-[#4E3A5C]/70">{item.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
