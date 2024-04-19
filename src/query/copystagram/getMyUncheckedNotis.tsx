import { urlKey } from "@/config/urlMapKey";
import { urlMap } from "@/config/urlMap";
import axios from "axios";

export const getMyUncheckedNotis = async () => {
  const url = urlMap(urlKey.COPYSTAGRAM_GET_MY_UNCHECKED_NOTIS);
  return await axios.get(url, {
    withCredentials: true,
  });
};
