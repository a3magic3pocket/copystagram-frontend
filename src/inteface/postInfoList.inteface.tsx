import type { IPostInfo } from "./postInfo.inteface";

export interface IPostInfoList {
  pageNum: number;
  pageSize: number;
  posts: IPostInfo[];
}
