import { urlKey } from "@/config/urlMapKey";
import { urlMap } from "@/config/urlMap";
import axios from "axios";

export const clickPost = async (postId: string) => {
  const url = urlMap(urlKey.COPYSTAGRAM_CLICK_POST);

  const data = {
    postId,
  };

  return await axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
