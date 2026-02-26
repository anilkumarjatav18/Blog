export interface Blog {
  id: string;
  title: string;
  content: string;
  image?: string;

  authorId: string;
  author?: string;

  createdAt: string;
  updatedAt?: string;
}


export type CreateBlogInput = {
  title: string;
  content: string;
  image?: string;
};