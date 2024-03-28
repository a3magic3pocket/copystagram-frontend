export const urlMap = (urlName: string): string => {
  const copystagramRootUrl = process.env.NEXT_PUBLIC_COPYSTAGRAM_API_URL;

  const urls: IUrls = {
    COPYSTAGRAM_GET_MY_USER_INFO: `${copystagramRootUrl}/v1/my-user-info`,
  };

  if (urlName in urls) {
    return urls[urlName];
  }
  return urls[Object.keys(urls)[0]];
};
