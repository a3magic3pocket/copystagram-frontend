"use client";

import { useBoundStore } from "@/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function NavigationEvents() {
  const currentPathname = usePathname();
  const NOTI_PATHNAME = "/noti";
  const {
    beforePathname,
    setBeforePathname,
    hadLeftNotiPage,
    setHadLeftNotiPage,
  } = useBoundStore((state) => ({
    beforePathname: state.beforePathname,
    setBeforePathname: state.setBeforePathname,
    hadLeftNotiPage: state.hadLeftNotiPage,
    setHadLeftNotiPage: state.setHadLeftNotiPage,
  }));

  useEffect(() => {
    // noti page를 떠남을 감지
    const currentHadLeftNotiPage =
      beforePathname === NOTI_PATHNAME && currentPathname !== NOTI_PATHNAME;
    if (currentHadLeftNotiPage !== hadLeftNotiPage) {
      setHadLeftNotiPage(currentHadLeftNotiPage);
    }

    setBeforePathname(currentPathname);
  }, [currentPathname]);

  return null;
}
