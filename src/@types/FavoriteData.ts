export type FavoriteData = {
  policy: {
    id: number;
    slug: string;
    title: string;
    category: { name: string; slug: string };
  };

  createdAt: Date;
};
