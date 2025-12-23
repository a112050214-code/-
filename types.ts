
export interface AttractionImage {
  src: string;
  subject: string;
  ext: string;
}

export interface Attraction {
  id: number;
  name: string;
  introduction: string;
  address: string;
  modified: string;
  images: AttractionImage[];
  url: string;
}

export interface ApiResponse {
  total: number;
  data: Attraction[];
}

export enum Language {
  ZH_TW = 'zh-tw',
  ZH_CN = 'zh-cn',
  EN = 'en',
  JA = 'ja',
  KO = 'ko',
  ES = 'es',
  ID = 'id',
  TH = 'th',
  VI = 'vi'
}

export const LANGUAGE_LABELS: Record<Language, string> = {
  [Language.ZH_TW]: '繁體中文',
  [Language.ZH_CN]: '简体中文',
  [Language.EN]: 'English',
  [Language.JA]: '日本語',
  [Language.KO]: '한국어',
  [Language.ES]: 'Español',
  [Language.ID]: 'Bahasa Indonesia',
  [Language.TH]: 'ไทย',
  [Language.VI]: 'Tiếng Việt'
};
