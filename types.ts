
export type Language = 'PT' | 'EN';

export interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  lang: Language;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  alt: string;
}
