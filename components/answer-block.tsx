// Le bloc que les moteurs IA citent (GEO). Placé en 1er sous le H1 : une
// réponse auto-portée, 40-60 mots, compréhensible hors contexte.
export function AnswerBlock({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-label={question}
      data-answer-block
      className="mb-10 rounded-2xl border border-[#4E3A5C]/10 bg-white p-5 sm:p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold tracking-tight text-[#4E3A5C]">{question}</h2>
      <div className="mt-2 text-[15px] leading-relaxed text-[#4E3A5C]/70">{children}</div>
    </section>
  );
}
