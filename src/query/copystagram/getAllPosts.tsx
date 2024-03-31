import { urlKey } from "@/config/urlMapKey";
import { urlMap } from "@/config/urlMap";
import axios from "axios";

export const getAllPosts = async (pageNum: number) => {
  const url = urlMap(urlKey.COPYSTAGRAM_GET_ALL_POSTS);
  return await axios.get(url, {
    params: {
      "page-num": pageNum,
    },
  });
};
