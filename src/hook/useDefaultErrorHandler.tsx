import axios from "axios";
import { useRouter } from "next/navigation";

export default function useDefaultErrorHandler() {
  const router = useRouter();

  return (error: Error) => {
    if (!axios.isAxiosError(error)) {
      return;
    }

    if (error.response?.status === 401) {
      router.push("/auth/login");
    } else {
      router.push("/error");
    }
  };
}
