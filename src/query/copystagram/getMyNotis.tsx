import { urlKey } from "@/config/urlMapKey";
import { urlMap } from "@/config/urlMap";
import axios from "axios";

export const getMyNotis = async (pageNum: number) => {
  const url = urlMap(urlKey.COPYSTAGRAM_GET_MY_NOTIS);
  return await axios.get(url, {
    withCredentials: true,
    params: {
      "page-num": pageNum,
    },
  });
};
