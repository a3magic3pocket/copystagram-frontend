export interface INotiInfo {
  notiId: string;
  ownerName: string;
  ownerThumbImagePath: string;
  content: string;
  relatedPostId: string | null;
  postThumbImagePath: string | null;
  createdAt: number[];
}
