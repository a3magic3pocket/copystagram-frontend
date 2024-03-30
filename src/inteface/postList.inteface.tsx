import type { IPost } from "./post.inteface";

export interface IPostList {
  pageNum: number;
  pageSize: number;
  posts: IPost[];
}
