import { urlKey } from "@/config/urlMapKey";
import { urlMap } from "@/config/urlMap";
import axios from "axios";

export const getMyLatestPosts = async (pageNum: number) => {
  const url = urlMap(urlKey.COPYSTAGRAM_GET_LATEST_MY_POSTS);
  return await axios.get(url, {
    withCredentials: true,
    params: {
      "page-num": pageNum,
    },
  });
};
