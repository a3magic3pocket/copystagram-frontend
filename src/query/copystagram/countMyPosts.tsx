import { urlKey } from "@/config/urlMapKey";
import { urlMap } from "@/config/urlMap";
import axios from "axios";

export const countMyPosts = async () => {
  const url = urlMap(urlKey.COPYSTAGRAM_COUNY_MY_POSTS);
  return await axios.get(url, {
    withCredentials: true,
  });
};
