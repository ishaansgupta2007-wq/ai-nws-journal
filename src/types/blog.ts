export type ArticleCategory =
  | 'All'
  | 'Frontier Models'
  | 'Embodied AI'
  | 'Silicon & Compute'
  | 'Bio & Science'
  | 'Autonomous Agents'
  | 'Policy & Governance';

export type VisualType =
  | 'neural-network'
  | 'robotics'
  | 'silicon'
  | 'biology'
  | 'agents'
  | 'quantum'
  | 'vision'
  | 'governance';

export interface Author {
  name: string;
  role: string;
  affiliation: string;
  avatarInitials: string;
}

export interface ContentSection {
  heading?: string;
  body: string;
  pullQuote?: string;
  pullQuoteAuthor?: string;
  figureCaption?: string;
  codeSnippet?: {
    language: string;
    code: string;
    title: string;
  };
  metrics?: {
    label: string;
    value: string;
    trend?: string;
    detail: string;
  }[];
}

export interface Comment {
  id: string;
  author: string;
  role: string;
  avatarInitials: string;
  timestamp: string;
  content: string;
  likes: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  deck: string; // Subtitle / lead paragraph
  category: ArticleCategory;
  publishedAt: string;
  readTime: string;
  tier: 'lead' | 'secondary' | 'dispatch';
  author: Author;
  visualType: VisualType;
  visualTitle: string;
  visualCaption: string;
  takeaways: string[];
  contentSections: ContentSection[];
  tags: string[];
  likes: number;
  comments: Comment[];
  isBookmarked?: boolean;
}

export interface NewsFlash {
  id: string;
  headline: string;
  source: string;
  timeAgo: string;
  category: string;
  summary: string;
  impactLevel: 'High' | 'Critical' | 'Notable';
}
