export type Wish = { id: string; message: string; author: string };

export const birthData = {
  baby: {
    name: "البراء",
    day: "السبت",
    date: "15 / 8",
    weight: null as string | null,
    height: null as string | null,
    photo: "/albaraa/images/baby-photo.webp",
    photoAlt: "صورة الطفل البراء",
  },
  hero: {
    topText: "الحمد لله الذي بنعمته تتم الصالحات",
    announcement: "رزقنا الله بأجمل عطاياه",
    subtitle: "نوّر دنيتنا",
  },
  welcome: {
    title: "أهلًا بالبراء",
    text: "جئت لتملأ قلوبنا حبًا وسعادة، ولتكون أجمل فصل جديد في حياتنا.",
  },
  reveal: {
    teaser: "في حد صغير مستني يسلم عليكم…",
    button: "قابلوا البراء",
    placeholderTitle: "صورة البراء",
    placeholderText: "سيتم إضافة الصورة بعد الولادة",
  },
  birthCard: { title: "بطاقة ميلاد البراء", nameLabel: "الاسم", dateLabel: "تاريخ الميلاد" },
  parentsMessage: {
    title: "من ماما وبابا",
    lines: [
      "بقلوب يملؤها الحمد والفرح،",
      "رزقنا الله بطفلنا البراء،",
      "فاللهم بارك لنا فيه،",
      "واحفظه بعينك التي لا تنام.",
    ],
  },
  wishes: {
    title: "سيب للبراء كلمة حلوة يقرأها لما يكبر",
    namePlaceholder: "اسمك",
    messagePlaceholder: "اكتب كلمة حلوة للبراء",
    submit: "أرسل كلمتك",
    success: "وصلت كلمتك الحلوة 🤍",
    samples: [
      { id: "sara", message: "ربنا يحفظك يا براء ويجعل أيامك كلها فرح وسعادة.", author: "خالتو سارة" },
      { id: "ahmed", message: "اللهم اجعله من أهل القرآن ومن عبادك الصالحين.", author: "أحمد" },
      { id: "mariam", message: "ربنا يرزقك الصحة والعافية ويبارك في عمرك.", author: "مريم" },
    ] satisfies Wish[],
  },
  prayer: {
    title: "دعاؤنا للبراء",
    text: ["اللهم أنبته نباتًا حسنًا،", "واجعله قرة عين لأهله،", "واحفظه وبارك فيه،", "وارزقه الصحة والصلاح والسعادة."],
  },
  final: {
    title: "نوّرت دنيتنا يا براء",
    share: "شارك الفرحة",
    download: "حمّل كارت البراء",
  },
  share: {
    title: "بشارة ميلاد البراء",
    text: "الحمد لله الذي بنعمته تتم الصالحات 🤍\nرزقنا الله بطفلنا البراء.",
    copied: "تم نسخ رابط البشارة",
  },
} as const;
