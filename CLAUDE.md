@AGENTS.md

# CLAUDE.md

loopa-landing is the marketing site + blog for [Loopa](https://apps.apple.com/app/loopa-contraceptive-ring/id6790433104),
a native iOS contraceptive ring reminder app (repo: `../loopa`). Built as a standalone
Next.js 16 App Router project, following the `la-recette` `nextjs-landing` / `seo-geo` /
`auto-blog` skill patterns (`../la-recette`), adapted to Next.js 16's real API — always
check `node_modules/next/dist/docs/` before assuming training-data knowledge still applies
(see AGENTS.md).

**Live**: https://loopa-landing.vercel.app
**Repo**: https://github.com/0xcssh/loopa-landing (public)

## Standing rules

- **Never use em dashes ("—") in any user-facing text** (articles, UI copy, metadata
  descriptions). Standing user preference across all projects. Code comments are fine.
- **No AI-filler content.** Every blog article answers one real search intent, specifically
  and concretely. No "in today's digital age" throat-clearing. See the quality bar below.
- Confirm before publishing/pushing anything public (new repo, deploy, new article) — the
  landing/blog is public-facing.

## Architecture

```
app/[locale]/           Locale-owned root layout (html/body live HERE, not in app/layout.tsx —
                         Next.js 16 "multiple root layouts" pattern). generateStaticParams
                         for en/fr, generateMetadata (canonical + hreflang incl. x-default).
  page.tsx               Home: hero, problem→solution (AnswerBlock), features, privacy, FAQ
  privacy/, terms/       Rendered from lib/legal.ts (ported from the loopa-legal GitHub Pages
                          site — keep in sync manually until that old site is retired)
  support/                Mailto support page
  blog/page.tsx           Index — listPosts(locale), cover thumbnail + title + description
  blog/[slug]/page.tsx    Article — MDXRemote render + JsonLd (Article + FAQPage)
  opengraph-image.tsx     Per-route dynamic OG images via next/og (home + each article)
proxy.ts                 Next.js 16 renamed "middleware" → "proxy". Redirects unprefixed
                          paths ("/", "/foo") to /en or /fr by Accept-Language. No bare
                          app/page.tsx or app/layout.tsx — proxy.ts guarantees [locale] is
                          always reached first.
lib/
  config.ts               The only file with Loopa-specific constants (siteUrl, brand,
                          appStoreUrl, supportEmail). Throws at build time if siteUrl looks
                          like a placeholder — this is intentional, canonical/sitemap/OG all
                          depend on it being real.
  i18n.ts                 Dictionary type + en/fr content for all static UI strings
  schema.ts               JSON-LD builders: organizationSchema, softwareApplicationSchema,
                          faqPageSchema, articleSchema
  blog.ts                 fs + gray-matter MDX reader: getPost/getAllSlugs/listPosts.
                          Tolerates zero articles (returns [])
  legal.ts                Privacy/Terms copy (EN/FR), ported from loopa-legal
components/
  json-ld.tsx              Single API: <JsonLd data={...} />. Never a d={dict} locale={...}
                          variant — that shape doesn't exist here and breaks the build.
  answer-block.tsx         Citable 40-60 word answer block (data-answer-block attr), themed
                          plum (#4E3A5C) / peach-pink
  faq.tsx                  Renders frontmatter faq[] as UI — same source as the FAQPage schema
  mdx.tsx                  MDX component overrides (h2/h3/a/blockquote/callout), themed
content/blog/{en,fr}/<slug>.mdx   Same slug in both locales → hreflang-crossing URLs
public/blog/<slug>/cover.png      1200x630 branded cover (Loopa app icon + title on plum/
                                   peach), generated per article — see "Adding an article"
public/llms.txt          LLM-facing summary of Loopa for AI crawlers (GEO channel)
app/sitemap.ts           Dynamic: static paths × locales + blog posts × locales, hreflang
                          alternates for each entry
app/robots.ts            Allows all crawlers including AI crawlers (GPTBot, PerplexityBot,
                          Google-Extended) — GEO, not just SEO
```

MDX is compiled via `next-mdx-remote/rsc`'s `<MDXRemote source={post.content} components={mdxComponents} />`
inside `blog/[slug]/page.tsx`, NOT `@next/mdx` file-based pages. `next.config.ts` stays a bare
config object because of this.

## Blog: current articles (10, EN+FR = 20 pages)

| Slug | Angle |
|---|---|
| `forgot-to-remove-nuvaring` | Missed removal: 21-28 days (fine) vs. 28+ days (missed-dose protocol) |
| `ring-free-week-rules` | Ring-free week: safe extension window (up to 10 days off), continuous use |
| `ring-vs-pill` | Ring vs. pill: action-count framing (2/month vs. ~30/month) drives the typical-use gap |
| `ring-effectiveness-explained` | Perfect-use (99.7%) vs. typical-use (91-93%) explained, what predicts which number you get |
| `can-you-feel-the-ring` | Comfort during sex: placement (not the method) is almost always the cause |
| `ring-side-effects` | Common early side effects vs. blood-clot warning signs that need urgent care |
| `ring-weight-gain` | Weight gain myth: what the studies actually show vs. bloating/coincidental timing |
| `how-to-insert-the-ring` | Step-by-step insertion, why there's no single "correct" spot (unlike a diaphragm) |
| `ring-and-period-changes` | Withdrawal bleed vs. a real period, spotting, skipping periods via continuous use |
| `traveling-with-the-ring` | Room-temp storage window, why time zones don't matter (date-based, not hourly) |

This is the full initial batch the `auto-blog` skill recommends (~10, well-differentiated
intents, not near-duplicates). All ten end with a soft CTA back to Loopa, tying the
article's problem to what the app specifically solves (never a generic "download our app"
tack-on). Next enrichment should follow the on-demand cadence below, not another batch.

## Adding an article

Follow `la-recette/.claude/skills/auto-blog/SKILL.md`'s `/blog "sujet"` workflow and quality
bar (frontmatter `answer` + `faq` as the single source for AnswerBlock/FAQPage, EN written
first then FR *adapted* not translated, same slug both locales, 800-1500 words, one clear
search intent per article, sourced when factual, internal link, soft CTA).

Extra steps specific to this repo:
1. Generate the cover with the Loopa icon (`../loopa/Loopa/Assets.xcassets/AppIcon.appiconset/AppIcon.png`)
   composited over a plum/peach card — see the one-off script pattern used for the first 4
   covers (icon left, title right, `PLUM #4E3A5C` / `PLUM_DARK` / `CREAM` fill, `arialbd.ttf`
   58px). Save to `public/blog/<slug>/cover.png` at 1200x630.
2. `grep -rn "—" content/blog/` before committing — zero tolerance for em dashes.
3. `rm -rf .next && npm run build` locally to confirm both locales compile before pushing.
4. Commit, push, then `vercel --prod --yes` to deploy (the Vercel CLI session is already
   authenticated as 0xcssh on this machine — no login needed for routine deploys).

## Publishing cadence (deliberate, not automatic)

**No daily/batch content generation.** The `auto-blog` skill's own guidance: an initial
~10-article batch at launch (we shipped 4, capped deliberately, "8 vraiment bons plutôt que
15 bouillies"), then enrichment **on demand**, one genuine search-intent gap at a time.
Google's Helpful Content system penalizes mass-produced low-differentiation content, and
that risk applies to the whole domain, not just the offending pages. Traffic accrues from
articles compounding in the index and getting cited by AI answer engines over months, not
from posting frequency. Target roughly 1-2 new articles/month, each covering an angle none
of the existing 4 already own.

## Deploy

```bash
git push                    # to 0xcssh/loopa-landing
vercel --prod --yes         # CLI already linked + authenticated as 0xcssh
```

`vercel login` is the only step that needs the user directly (interactive OAuth). Everything
after that (`link`, `deploy`) can run non-interactively once the session token exists.

## Explicitly out of scope here

RepLock's landing/SEO/blog is a **separate** project the user handles in RepLock's own
Claude Code instance — do not do RepLock work from this repo.

ASC's Privacy Policy / Support URLs still point at the old `loopa-legal` GitHub Pages site.
Switching them to this domain is a deliberate future decision for the user, not automatic.
