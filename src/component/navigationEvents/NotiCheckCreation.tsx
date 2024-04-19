"use client";

import { createNotiCheck } from "@/query/copystagram/createNotiCheck";
import { useBoundStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export default function NotiCheckCreation() {
  const { hadLeftNotiPage } = useBoundStore((state) => ({
    hadLeftNotiPage: state.hadLeftNotiPage,
  }));

  const mut = useMutation({
    mutationFn: () => createNotiCheck(),
    onError: (error: Error) => {},
    onSuccess: () => {},
  });

  useEffect(() => {
    if (hadLeftNotiPage) {
      mut.mutate();
    }
  }, [hadLeftNotiPage]);

  return null;
}
