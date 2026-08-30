// 首頁文案（雙語）。首頁結構已定案，兩種語言共用 HomePage.astro，文字從這裡取。
import type { Locale } from './ui';

interface HomeCopy {
  metaTitle: string;
  metaDescription: string;
  name: string;
  nameLatin: string; // '' = 不顯示拉丁副名
  roleLine: string;
  whyLine: string[]; // 每個元素一行，中間以 <br /> 斷行
  trackCaption: string;
  ghost: string[]; // hero 背景裝飾字
  workEyebrow: string;
  workMore: string;
  resumeEyebrow: string;
  resumeMeta: string;
  resumeView: string;
}

export const home: Record<Locale, HomeCopy> = {
  zh: {
    metaTitle: '張瓊文 Joan Chang — 前端工程師',
    metaDescription: '前端工程師，前身為 11 年品牌與 UX/UI 設計師。做受監管的金融與 Web3 系統。',
    name: '張瓊文',
    nameLatin: 'Joan Chang',
    roleLine: '前端工程師｜銀行級 Web3 與金融科技系統',
    whyLine: ['擅長把模糊、沒定義好的需求', '拆成可執行的方案'],
    trackCaption: '橫跨工程與設計 —— 受監管的加密貨幣托管系統開發、Design System 建置。',
    ghost: ['Frontend', 'Engineer'],
    workEyebrow: '作品',
    workMore: '全部文章 →',
    resumeEyebrow: '履歷',
    resumeMeta: '前端工程師 · React / Next.js / TypeScript · 銀行級 Web3 與金融科技',
    resumeView: '線上看',
  },
  en: {
    metaTitle: 'Joan Chang — Frontend Engineer',
    metaDescription:
      'Frontend engineer, formerly an 11-year brand and UX/UI designer. Building regulated finance and Web3 systems.',
    name: 'Joan Chang',
    nameLatin: '',
    roleLine: 'Frontend Engineer — bank-grade Web3 & fintech systems',
    whyLine: ['I break vague, half-defined requirements', 'into a plan a team can ship'],
    trackCaption:
      'Across engineering and design — regulated crypto-custody systems, and design-system foundations.',
    ghost: ['Frontend', 'Engineer'],
    workEyebrow: 'Work',
    workMore: 'All writing →',
    resumeEyebrow: 'Résumé',
    resumeMeta: 'Frontend Engineer · React / Next.js / TypeScript · bank-grade Web3 & fintech',
    resumeView: 'View online',
  },
};
