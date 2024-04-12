import { urlKey } from "@/config/urlMapKey";
import { urlMap } from "@/config/urlMap";
import axios from "axios";

export const downLike = async (postId: string, hookPostId?: string) => {
  const url = urlMap(urlKey.COPYSTAGRAM_DOWN_LIKE);

  const data = {
    postId,
    hookPostId,
  };

  return await axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
