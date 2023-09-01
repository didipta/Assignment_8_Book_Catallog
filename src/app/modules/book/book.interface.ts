export type IBookfilter = {
  searchTerm?: string | undefined;
  title?: string | undefined;
  author?: string | undefined;
  price?: number | undefined;
  genre?: string | undefined;
  publicationDate?: Date | undefined;
  categoryId?: string | undefined;
};

export const bookSearchableFields: string[] = [
  'title',
  'author',
  'price',
  'genre',
  'publicationDate',
  'categoryId',
];
