export type Locale = "en" | "fr";
export const locales: Locale[] = ["en", "fr"];
export const defaultLocale: Locale = "en";

export function isLocale(x: string): x is Locale {
  return (locales as string[]).includes(x);
}

type QA = { q: string; a: string };

type Dictionary = {
  meta: { title: string; description: string };
  nav: { blog: string; privacy: string; terms: string; support: string };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    cta: string;
    ctaSub: string;
  };
  problem: {
    title: string;
    body: string;
  };
  features: { title: string; icon: string; body: string }[];
  privacy: {
    title: string;
    body: string;
  };
  faq: { title: string; items: QA[] };
  footer: { rights: string; tagline: string };
};

const en: Dictionary = {
  meta: {
    title: "Loopa — Contraceptive Ring Reminder",
    description:
      "Loopa sends insistent reminders for your contraceptive ring, shows a live countdown widget, and keeps a history you can actually edit. 100% local, no account.",
  },
  nav: { blog: "Blog", privacy: "Privacy", terms: "Terms", support: "Support" },
  hero: {
    kicker: "For contraceptive ring users",
    title: "“Wait. When did I put it in?”",
    subtitle:
      "Loopa carries your insertion and removal dates, reminds you until you confirm, and keeps a countdown on your Home Screen and Lock Screen — so your protection never depends on memory.",
    cta: "Download on the App Store",
    ctaSub: "3-day free trial, then 19.99€/year",
  },
  problem: {
    title: "The ring is 99.7% effective. Your memory is the weak link.",
    body: "The official tracking method asks you to remember which weekday you inserted your ring, weeks ago, and to apply catch-up rules that change depending on which week you're in. One missed date can mean an emergency pill and two weeks of doubt. Loopa exists so none of that is on you anymore.",
  },
  features: [
    {
      icon: "bell",
      title: "Reminders that don't give up",
      body: "A heads-up the day before, alerts that repeat and escalate on the day until you confirm, and daily follow-ups if you're late.",
    },
    {
      icon: "widget",
      title: "Always-visible countdown",
      body: "Days until your next insertion or removal, right on your Home Screen, Lock Screen, and Dynamic Island.",
    },
    {
      icon: "history",
      title: "Editable history",
      body: "Fix any past date in seconds. No more being stuck with a wrong entry you can't correct.",
    },
    {
      icon: "compass",
      title: "Forgot? Stay calm",
      body: "A guided protocol tells you exactly what to do for the week you're in, based on official usage rules.",
    },
  ],
  privacy: {
    title: "Your cycle stays on your iPhone",
    body: "No account, no server, no third-party SDK. Loopa is 100% local — your dates never leave your device, with an optional private iCloud backup so a new iPhone restores your history.",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "Does Loopa work for any ring schedule?",
        a: "Yes. Loopa supports the standard 21-days-in/7-days-out schedule, continuous use (28 days, no break), and fully custom durations.",
      },
      {
        q: "Is my health data private?",
        a: "Yes. Loopa stores everything locally on your iPhone. There is no account, no server, and no third-party SDK processing your data.",
      },
      {
        q: "What does the subscription include?",
        a: "Loopa Pro unlocks the full app: insistent reminders, the countdown widget and Live Activity, editable history, and cycle stats. It's a 3-day free trial, then an auto-renewing yearly subscription.",
      },
      {
        q: "Does Loopa replace medical advice?",
        a: "No. Loopa is a reminder and tracking tool. It does not provide medical advice and is not a substitute for guidance from your healthcare provider.",
      },
    ],
  },
  footer: { rights: "All rights reserved.", tagline: "Your ring, always on time." },
};

const fr: Dictionary = {
  meta: {
    title: "Loopa — Rappel d'anneau contraceptif",
    description:
      "Loopa envoie des rappels insistants pour ton anneau contraceptif, affiche un compte à rebours en direct, et garde un historique que tu peux vraiment corriger. 100% local, aucun compte.",
  },
  nav: { blog: "Blog", privacy: "Confidentialité", terms: "Conditions", support: "Assistance" },
  hero: {
    kicker: "Pour les utilisatrices de l'anneau contraceptif",
    title: "« Je l'ai mis quand, déjà ? »",
    subtitle:
      "Loopa retient tes dates d'insertion et de retrait, te rappelle jusqu'à confirmation, et affiche un compte à rebours sur ton écran d'accueil et ton écran verrouillé — ta protection ne dépend plus de ta mémoire.",
    cta: "Télécharger sur l'App Store",
    ctaSub: "3 jours d'essai gratuit, puis 19,99€/an",
  },
  problem: {
    title: "L'anneau est efficace à 99,7 %. Ta mémoire est le maillon faible.",
    body: "La méthode de suivi officielle te demande de te souvenir du jour de la semaine où tu as inséré ton anneau, il y a des semaines, et d'appliquer des règles de rattrapage qui changent selon la semaine. Une seule date ratée peut vouloir dire une pilule d'urgence et deux semaines de doute. Loopa existe pour que ça ne repose plus sur toi.",
  },
  features: [
    {
      icon: "bell",
      title: "Des rappels qui ne lâchent rien",
      body: "Une alerte la veille, des rappels qui se répètent et s'intensifient le jour J jusqu'à confirmation, et des relances quotidiennes en cas de retard.",
    },
    {
      icon: "widget",
      title: "Un compte à rebours toujours visible",
      body: "Les jours restants avant ta prochaine insertion ou ton prochain retrait, sur ton écran d'accueil, ton écran verrouillé et la Dynamic Island.",
    },
    {
      icon: "history",
      title: "Historique modifiable",
      body: "Corrige n'importe quelle date passée en quelques secondes. Fini d'être coincée avec une entrée fausse.",
    },
    {
      icon: "compass",
      title: "Un oubli ? Reste calme",
      body: "Un protocole guidé te dit exactement quoi faire selon ta semaine, d'après les règles d'utilisation officielles.",
    },
  ],
  privacy: {
    title: "Ton cycle reste sur ton iPhone",
    body: "Pas de compte, pas de serveur, pas de SDK tiers. Loopa est 100% locale — tes dates ne quittent jamais ton appareil, avec une sauvegarde iCloud privée optionnelle pour retrouver ton historique sur un nouvel iPhone.",
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        q: "Loopa fonctionne pour tous les schémas d'anneau ?",
        a: "Oui. Loopa gère le schéma standard 21 jours avec / 7 jours sans, l'usage continu (28 jours, sans pause), et des durées entièrement personnalisées.",
      },
      {
        q: "Mes données de santé sont-elles privées ?",
        a: "Oui. Loopa stocke tout localement sur ton iPhone. Il n'y a ni compte, ni serveur, ni SDK tiers qui traite tes données.",
      },
      {
        q: "Qu'est-ce que l'abonnement inclut ?",
        a: "Loopa Pro débloque l'app complète : rappels insistants, widget de compte à rebours et Live Activity, historique modifiable, et stats de cycle. C'est 3 jours d'essai gratuit, puis un abonnement annuel à renouvellement automatique.",
      },
      {
        q: "Loopa remplace-t-elle un avis médical ?",
        a: "Non. Loopa est un outil de rappel et de suivi. Elle ne fournit pas d'avis médical et ne remplace pas les conseils de ton professionnel de santé.",
      },
    ],
  },
  footer: { rights: "Tous droits réservés.", tagline: "Ton anneau, toujours à l'heure." },
};

const dict: Record<Locale, Dictionary> = { en, fr };

export function getDict(locale: Locale): Dictionary {
  return dict[locale];
}

export type { Dictionary };
