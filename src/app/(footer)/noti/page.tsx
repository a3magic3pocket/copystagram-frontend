"use client";

import Noti from "@/component/Noti";
import Loading from "@/component/loading/Loading";
import Title from "@/component/title/Title";
import { urlKey } from "@/config/urlMapKey";
import { INotiInfo } from "@/inteface/notiInfo.inteface";
import { INotiInfoList } from "@/inteface/notiInfoList.interface";
import { getMyNotis } from "@/query/copystagram/getMyNotis";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const router = useRouter();
  const notiBottomRef = useRef<HTMLDivElement>(null);
  const [pageNum, setPageNum] = useState(1);
  const [emptyPageNum, setEmptyPageNum] = useState(-1);
  const [notis, setNotis] = useState<INotiInfo[]>([]);

  const qry = useQuery({
    queryKey: [urlKey.COPYSTAGRAM_GET_MY_NOTIS, pageNum],
    queryFn: () => getMyNotis(pageNum),
    staleTime: Infinity,
    // enabled: !!pageNum,
    // placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const notiInfoList: INotiInfoList = qry.data?.data;
    if (notiInfoList && notiInfoList.notifications) {
      setNotis([...notis, ...notiInfoList.notifications]);
    }
  }, [qry.data]);

  useEffect(() => {
    const notiInfoList: INotiInfoList = qry.data?.data;
    const isPostInfosEmpty =
      notiInfoList &&
      notiInfoList.pageNum > 1 &&
      notiInfoList.notifications.length === 0;

    // 마지막 페이지 기록
    if (isPostInfosEmpty && emptyPageNum < 0) {
      setEmptyPageNum(notiInfoList.pageNum);
    }
    // 이전 페이지 결과가 비었음(empty)에도 다음 페이지를 조회하였다면
    // pageNum 재조정
    else if (isPostInfosEmpty && pageNum > emptyPageNum) {
      setPageNum(emptyPageNum);
    }
  }, [qry.data, emptyPageNum, pageNum]);

  if (qry.isError) {
    router.push("/error");
  }

  if (qry.isLoading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col w-full justify-start">
      <Title title={"알림"} />
      {notis && notis.map((noti, i) => <Noti key={i} {...noti} />)}

      {qry.isLoading && <Loading />}
      <div ref={notiBottomRef}></div>
    </div>
  );
}
