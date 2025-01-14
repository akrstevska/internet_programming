export type Author = {
  id: number;
  name: string;
  birth_date: string;
  death_date: string;
  nationality: string;
  bibliography: Book[];
}
export type Book = {
  name: string;
  year: number;
  type: string;
}
export type BookType = {
  name: string;
  description: string;
}
