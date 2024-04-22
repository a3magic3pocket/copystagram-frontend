export interface IPostInfo {
  postId: string;
  hookPostId?: string;
  ownerName: string;
  description: string;
  thumbImagePath: string;
  numLikes: number;
  postWidth: number;
  contentImagePaths: string[];
  createdAt: number[];
}
