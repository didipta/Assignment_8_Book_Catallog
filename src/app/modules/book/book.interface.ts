export type IBookfilter = {
  searchTerm?: string | undefined;
  title?: string | undefined;
  author?: string | undefined;
  price?: number | undefined;
  genre?: string | undefined;
  publicationDate?: Date | undefined;
  category?: string | undefined;
};

export const bookSearchableFields: string[] = [
  'searchTerm',
  'title',
  'author',
  'price',
  'genre',
  'publicationDate',
  'category',
];
