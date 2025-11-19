export type Policy = {
  id: number;
  slug: string;
  title: string;
  description: string;
  source: string;
  summary: string;

  category: {
    id: string;
    slug: string;
    name: string;
  };

  createdAt: Date;
};
