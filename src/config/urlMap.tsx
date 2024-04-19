import { urlKey } from "./urlMapKey";

const copystagramRootUrl = process.env.NEXT_PUBLIC_COPYSTAGRAM_API_URL;
const urls: IUrls = {};
urls[
  urlKey.COPYSTAGRAM_GET_MY_USER_INFO
] = `${copystagramRootUrl}/v1/my-user-info`;
urls[
  urlKey.COPYSTAGRAM_GET_LATEST_MY_POSTS
] = `${copystagramRootUrl}/v1/my-posts`;
urls[urlKey.COPYSTAGRAM_GET_ALL_POSTS] = `${copystagramRootUrl}/v1/posts`;
urls[
  urlKey.COPYSTAGRAM_GET_MY_NOTIS
] = `${copystagramRootUrl}/v1/my-notifications`;
urls[
  urlKey.COPYSTAGRAM_COUNY_MY_POSTS
] = `${copystagramRootUrl}/v1/my-posts/count`;
urls[urlKey.COPYSTAGRAM_LOGOUT_URL] = `${copystagramRootUrl}/v1/auth/logout`;
urls[urlKey.COPYSTAGRAM_CREATE_POST] = `${copystagramRootUrl}/v1/post`;
urls[
  urlKey.COPYSTAGRAM_GET_RELATED_ALL_POSTS
] = `${copystagramRootUrl}/v1/related-posts`;
urls[urlKey.COPYSTAGRAM_UP_LIKE] = `${copystagramRootUrl}/v1/like/up`;
urls[urlKey.COPYSTAGRAM_DOWN_LIKE] = `${copystagramRootUrl}/v1/like/down`;
urls[
  urlKey.COPYSTAGRAM_CLICK_POST
] = `${copystagramRootUrl}/v1/post/click-count`;
urls[
  urlKey.COPYSTAGRAM_CREATE_NOTI_CHECK
] = `${copystagramRootUrl}/v1/noti-check`;
urls[
  urlKey.COPYSTAGRAM_GET_MY_UNCHECKED_NOTIS
] = `${copystagramRootUrl}/v1/my-notifications/unchecked`;

export const urlMap = (urlName: string): string => {
  if (urlName in urls) {
    return urls[urlName];
  }
  return urls[Object.keys(urls)[0]];
};
