// API UNIQUE du site : <JsonLd data={…} />. L'objet schema est construit en
// amont (lib/schema.ts) puis passé ici. Ce composant ne connaît rien au
// dictionnaire i18n — signature stable dont dépendent seo-geo et auto-blog.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify échappe naturellement les < et & problématiques ici.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
