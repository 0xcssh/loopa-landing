import type { Locale } from "@/lib/i18n";

// Content ported verbatim from the loopa-legal GitHub Pages site (the URLs
// currently on file with Apple / App Store Connect). Keep both in sync until
// loopa-legal is retired in favor of this site's /privacy /terms.
type LegalCopy = {
  privacy: { title: string; effective: string; sections: { h: string; p: string }[] };
  terms: { title: string; effective: string; sections: { h: string; p: string }[] };
};

const en: LegalCopy = {
  privacy: {
    title: "Privacy Policy",
    effective: "Effective date: July 13, 2026",
    sections: [
      {
        h: "Summary",
        p: "Loopa collects no data. Your cycle stays on your iPhone.",
      },
      {
        h: "Data collection",
        p: "Loopa does not collect, store on servers, sell, or share any personal data. The app has no user accounts, no analytics, no advertising, and no third-party SDKs. It makes no network requests of its own.",
      },
      {
        h: "Health data",
        p: "The information you record in Loopa (ring insertion and removal dates, bleeding, symptoms, mood, notes) is health data of the most private kind. It is stored only on your device (and its encrypted iCloud/local device backups, managed by iOS). It is never transmitted to us or to anyone. Deleting the app deletes this data.",
      },
      {
        h: "Notifications",
        p: "Reminders are scheduled locally on your device by iOS. Their content and timing never leave your iPhone.",
      },
      {
        h: "Subscriptions",
        p: "Purchases and free trials are processed entirely by Apple through your Apple Account. Loopa never sees your payment information.",
      },
      {
        h: "Changes",
        p: "If this policy ever changes, the update will be published at this address with a new effective date.",
      },
      { h: "Contact", p: "Questions: support@loopa.app" },
    ],
  },
  terms: {
    title: "Terms of Use",
    effective: "Effective date: July 13, 2026",
    sections: [
      {
        h: "1. The service",
        p: "Loopa is an iOS application that helps you track your contraceptive ring schedule: it stores the dates you log, computes your upcoming insertion and removal dates, and reminds you about them.",
      },
      {
        h: "2. Not medical advice",
        p: "Loopa is a reminder tool, not a medical device and not a contraceptive. It does not provide medical advice, diagnosis, or treatment. Always follow the instructions of your prescriber and the leaflet of your specific product. Loopa's developer is not liable for the consequences of missed or incorrect contraceptive use, including unintended pregnancy.",
      },
      {
        h: "3. Your responsibility for the data you enter",
        p: "Loopa's calculations depend entirely on the dates you enter and confirm. Verify them, and verify that notifications are enabled and working on your device.",
      },
      {
        h: "4. Subscription and free trial",
        p: "Loopa requires an auto-renewing yearly subscription, with a free trial for new subscribers. Payment is charged to your Apple Account at confirmation of purchase; the subscription renews automatically unless cancelled at least 24 hours before the end of the current period. You can manage or cancel it anytime in your Apple Account settings.",
      },
      {
        h: "5. Warranty and liability",
        p: 'Loopa is provided "as is", without warranties of any kind. To the maximum extent permitted by law, the developer\'s total liability is limited to the amount you paid for the subscription in the preceding 12 months.',
      },
      { h: "6. Contact", p: "support@loopa.app" },
    ],
  },
};

const fr: LegalCopy = {
  privacy: {
    title: "Politique de confidentialité",
    effective: "Date d'entrée en vigueur : 13 juillet 2026",
    sections: [
      { h: "Résumé", p: "Loopa ne collecte aucune donnée. Ton cycle reste sur ton iPhone." },
      {
        h: "Collecte de données",
        p: "Loopa ne collecte, ne stocke sur des serveurs, ne vend, ni ne partage aucune donnée personnelle. L'app n'a ni compte utilisateur, ni analytics, ni publicité, ni SDK tiers. Elle n'effectue elle-même aucune requête réseau.",
      },
      {
        h: "Données de santé",
        p: "Les informations que tu enregistres dans Loopa (dates d'insertion et de retrait, saignements, symptômes, humeur, notes) sont des données de santé parmi les plus privées. Elles sont stockées uniquement sur ton appareil (et ses sauvegardes iCloud/locales chiffrées, gérées par iOS). Elles ne sont jamais transmises à qui que ce soit. Supprimer l'app supprime ces données.",
      },
      {
        h: "Notifications",
        p: "Les rappels sont planifiés localement sur ton appareil par iOS. Leur contenu et leur horaire ne quittent jamais ton iPhone.",
      },
      {
        h: "Abonnements",
        p: "Les achats et essais gratuits sont traités entièrement par Apple via ton compte Apple. Loopa ne voit jamais tes informations de paiement.",
      },
      {
        h: "Modifications",
        p: "Si cette politique change, la mise à jour sera publiée à cette adresse avec une nouvelle date d'entrée en vigueur.",
      },
      { h: "Contact", p: "Questions : support@loopa.app" },
    ],
  },
  terms: {
    title: "Conditions d'utilisation",
    effective: "Date d'entrée en vigueur : 13 juillet 2026",
    sections: [
      {
        h: "1. Le service",
        p: "Loopa est une application iOS qui t'aide à suivre le schéma de ton anneau contraceptif : elle enregistre les dates que tu saisis, calcule tes prochaines dates d'insertion et de retrait, et te les rappelle.",
      },
      {
        h: "2. Pas un avis médical",
        p: "Loopa est un outil de rappel, pas un dispositif médical ni un contraceptif. Elle ne fournit pas d'avis médical, de diagnostic ou de traitement. Suis toujours les instructions de ton prescripteur et la notice de ton produit. Le développeur de Loopa n'est pas responsable des conséquences d'un usage contraceptif manqué ou incorrect, y compris une grossesse non désirée.",
      },
      {
        h: "3. Ta responsabilité sur les données saisies",
        p: "Les calculs de Loopa dépendent entièrement des dates que tu saisis et confirmes. Vérifie-les, et vérifie que les notifications sont activées et fonctionnelles sur ton appareil.",
      },
      {
        h: "4. Abonnement et essai gratuit",
        p: "Loopa nécessite un abonnement annuel à renouvellement automatique, avec un essai gratuit pour les nouveaux abonnés. Le paiement est débité de ton compte Apple à la confirmation de l'achat ; l'abonnement se renouvelle automatiquement sauf annulation au moins 24 heures avant la fin de la période en cours. Tu peux le gérer ou l'annuler à tout moment dans les réglages de ton compte Apple.",
      },
      {
        h: "5. Garantie et responsabilité",
        p: "Loopa est fournie « telle quelle », sans garantie d'aucune sorte. Dans la limite permise par la loi, la responsabilité totale du développeur est limitée au montant que tu as payé pour l'abonnement au cours des 12 mois précédents.",
      },
      { h: "6. Contact", p: "support@loopa.app" },
    ],
  },
};

const legal: Record<Locale, LegalCopy> = { en, fr };

export function getLegal(locale: Locale): LegalCopy {
  return legal[locale];
}
