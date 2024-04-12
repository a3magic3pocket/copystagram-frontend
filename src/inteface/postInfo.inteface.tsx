export interface IPostInfo {
  postId: string;
  hookPostId?: string;
  ownerName: string;
  description: string;
  thumbImagePath: string;
  numLikes: number;
  contentImagePaths: string[];
  createdAt: number[];
}
