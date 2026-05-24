export type Article = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: readonly string[];
  draft?: boolean;
  /** Optional cover image — full URL (Unsplash hot-link or hosted asset). */
  coverImage?: string;
  /** Optional credit line for the cover image, e.g. "Photo by X on Unsplash" */
  coverImageAlt?: string;
  /** Optional photographer credit line */
  coverImageCredit?: string;
  content: string;
};

export type ArticleMeta = Omit<Article, "content">;
