export interface BookAttributes {
  id?: number;
  name?: string;
  authorId?: number;
}

export interface AuthorAttributes {
  id?: number;
  name?: string;
  books?: BookAttributes[];
}
