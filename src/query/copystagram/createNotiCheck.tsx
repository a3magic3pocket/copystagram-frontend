import { urlKey } from "@/config/urlMapKey";
import { urlMap } from "@/config/urlMap";
import axios from "axios";

export const createNotiCheck = async () => {
  const url = urlMap(urlKey.COPYSTAGRAM_CREATE_NOTI_CHECK);
  const data = {};
  
  return await axios.post(url, data, {
    withCredentials: true,
  });
};
