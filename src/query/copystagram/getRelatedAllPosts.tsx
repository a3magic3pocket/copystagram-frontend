import { urlKey } from "@/config/urlMapKey";
import { urlMap } from "@/config/urlMap";
import axios from "axios";

export const getRelatedAllPosts = async (
  pageNum: number,
  hookPostId: string
) => {
  const url = urlMap(urlKey.COPYSTAGRAM_GET_ALL_POSTS);
  return await axios.get(url, {
    params: {
      "page-num": pageNum,
      "hook-post-id": hookPostId,
    },
  });
};
