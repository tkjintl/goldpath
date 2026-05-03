export type Tier = {
  n: string;
  ko: string;
  en: string;
  min: string;
  gift: string;
  spread: string;
  storage: string;
  streak12: string;
  apex?: boolean;
};

export const TIERS: readonly Tier[] = [
  {
    n: 'I',
    ko: '브론즈',
    en: 'Bronze',
    min: '₩200K+',
    gift: '₩50K',
    spread: '2.0%',
    storage: '50g까지 무료',
    streak12: '1g 기념 바',
  },
  {
    n: 'II',
    ko: '실버',
    en: 'Silver',
    min: '₩500K+',
    gift: '₩150K',
    spread: '1.8%',
    storage: '100g까지 무료',
    streak12: '5g 기념 바',
  },
  {
    n: 'III',
    ko: '골드',
    en: 'Gold · APEX',
    min: '₩1M+',
    gift: '₩400K',
    spread: '1.5%',
    storage: '250g까지 무료',
    streak12: '10g + 각인',
    apex: true,
  },
  {
    n: 'IV',
    ko: '플래티넘',
    en: 'Platinum',
    min: '₩2M+',
    gift: '₩1M',
    spread: '1.2%',
    storage: '500g까지 무료',
    streak12: '25g + 맞춤',
  },
  {
    n: 'V',
    ko: '소브린',
    en: 'Sovereign',
    min: '₩5M+',
    gift: '₩2.5M',
    spread: '1.0%',
    storage: '무제한 무료',
    streak12: '연간 프라이빗 바',
  },
];
