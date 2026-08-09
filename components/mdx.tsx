import type { MDXComponents } from "mdx/types";

// Composants MDX mappés au thème Loopa (prune/pêche-rose), pour que les
// articles ne jurent pas avec la landing.
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-10 text-2xl font-bold tracking-tight text-[#4E3A5C]" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 text-xl font-semibold tracking-tight text-[#4E3A5C]" {...props} />
  ),
  p: (props) => <p className="mt-4 leading-relaxed text-[#4E3A5C]/80" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-[#4E3A5C]/80" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-[#4E3A5C]/80" {...props} />,
  a: (props) => (
    <a className="font-medium text-[#F2849A] underline underline-offset-2" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-4 border-l-4 border-[#FFB994] pl-4 italic text-[#4E3A5C]/70"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-[#4E3A5C]" {...props} />,
};
