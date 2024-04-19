import { urlKey } from "@/config/urlMapKey";
import { urlMap } from "@/config/urlMap";
import axios from "axios";

export const getRelatedAllPosts = async (
  pageNum: number,
  hookPostId: string
) => {
  const url = urlMap(urlKey.COPYSTAGRAM_GET_RELATED_ALL_POSTS);
  const params: { [name: string]: any } = {
    "page-num": pageNum,
    "hook-post-id": hookPostId,
  };

  return await axios.get(url, {
    params,
    withCredentials: true,
  });
};
