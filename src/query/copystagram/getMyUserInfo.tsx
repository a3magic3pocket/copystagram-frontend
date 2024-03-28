import { urlKey } from "@/config/urlMapKey";
import { urlMap } from "@/config/urlMap";
import axios from "axios";

export const getMyUserInfo = async () => {
  const url = urlMap(urlKey.COPYSTAGRAM_GET_MY_USER_INFO);
  return await axios.get(url, {
    withCredentials: true,
  });
};
