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

export const urlMap = (urlName: string): string => {
  if (urlName in urls) {
    return urls[urlName];
  }
  return urls[Object.keys(urls)[0]];
};
