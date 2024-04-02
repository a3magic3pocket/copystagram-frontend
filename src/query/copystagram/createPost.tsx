import { urlKey } from "@/config/urlMapKey";
import { urlMap } from "@/config/urlMap";
import axios from "axios";

export const createPost = async (formData: FormData) => {
  const url = urlMap(urlKey.COPYSTAGRAM_CREATE_POST);
  return await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
