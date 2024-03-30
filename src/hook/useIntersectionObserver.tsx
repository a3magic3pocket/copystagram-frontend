"use client";

import { useEffect, useState } from "react";

export default function useIntersectionObserver(fn: () => void) {
  let isAllocated = false;
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const callback = (entries: any) => {
    if (entries[0].isIntersecting) {
      fn();
    }
  };

  useEffect(() => {
    setObserver(
      new IntersectionObserver(callback, {
        root: null,
        threshold: 1,
      })
    );
  }, []);

  const observe = (elem: HTMLElement) => {
    if (!isAllocated) {
      observer?.observe(elem);
      isAllocated = true;
    }
  };

  const disconnect = () => {
    observer?.disconnect();
    isAllocated = false;
  };

  return [observe, disconnect];
}
