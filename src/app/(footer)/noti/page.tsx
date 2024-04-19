"use client";

import Noti from "@/component/Noti";
import Loading from "@/component/loading/Loading";
import Title from "@/component/title/Title";
import { urlKey } from "@/config/urlMapKey";
import { INotiInfo } from "@/inteface/notiInfo.inteface";
import { INotiInfoList } from "@/inteface/notiInfoList.interface";
import { getMyNotis } from "@/query/copystagram/getMyNotis";
import { getMyUncheckedNotis } from "@/query/copystagram/getMyUncheckedNotis";
import { useQueries } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

export default function Page() {
  const notiBottomRef = useRef<HTMLDivElement>(null);
  const [pageNum, setPageNum] = useState(1);
  const [emptyPageNum, setEmptyPageNum] = useState(-1);
  const [notis, setNotis] = useState<INotiInfo[]>([]);
  const authHintCookieName =
    process.env.NEXT_PUBLIC_COPYSTAGRAM_AUTH_HINT_COOKIE_NAME || "";
  const [cookies, ,] = useCookies([authHintCookieName]);
  const [uncheckedNotis, setUncheckedNotis] = useState(new Set());
  const [qryNotis, qryUncheckedNotis] = useQueries({
    queries: [
      {
        queryKey: [urlKey.COPYSTAGRAM_GET_MY_NOTIS, pageNum],
        queryFn: () => getMyNotis(pageNum),
        staleTime: Infinity,
        // enabled: !!pageNum,
        // placeholderData: keepPreviousData,
      },
      {
        queryKey: [urlKey.COPYSTAGRAM_GET_MY_UNCHECKED_NOTIS],
        queryFn: () => getMyUncheckedNotis(),
        enabled: cookies[authHintCookieName] !== undefined,
      },
    ],
  });

  useEffect(() => {
    const notiInfoList: INotiInfoList = qryNotis.data?.data;
    if (notiInfoList && notiInfoList.notifications) {
      setNotis([...notis, ...notiInfoList.notifications]);
    }
  }, [qryNotis.data]);

  useEffect(() => {
    const notiInfoList: INotiInfoList = qryNotis.data?.data;
    const isNoiInfoListEmpty =
      notiInfoList &&
      notiInfoList.pageNum > 1 &&
      notiInfoList.notifications.length === 0;

    // 마지막 페이지 기록
    if (isNoiInfoListEmpty && emptyPageNum < 0) {
      setEmptyPageNum(notiInfoList.pageNum);
    }
    // 이전 페이지 결과가 비었음(empty)에도 다음 페이지를 조회하였다면
    // pageNum 재조정
    else if (isNoiInfoListEmpty && pageNum > emptyPageNum) {
      setPageNum(emptyPageNum);
    }
  }, [qryNotis.data, emptyPageNum, pageNum]);

  useEffect(() => {
    if (
      qryUncheckedNotis.data &&
      qryUncheckedNotis.data.data &&
      Array.isArray(qryUncheckedNotis.data.data)
    ) {
      const uncheckedNotisSet = new Set(qryUncheckedNotis.data.data);
      setUncheckedNotis(uncheckedNotisSet);
    }
  }, [qryUncheckedNotis.data]);

  if (qryNotis.isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full justify-start">
      <Title title={"최근 알림"} />
      {notis &&
        notis.map((noti, i) => {
          return (
            <div key={i} className="relative">
              <Noti {...noti} />
              {uncheckedNotis.has(noti.notiId) && (
                <div className="absolute top-4 left-3 w-2 aspect-square rounded-full bg-red-500"></div>
              )}
            </div>
          );
        })}
      {notis && notis.length === 0 && (
        <div className="flex w-full h-full justify-center items-center">
          등록된 알림이 없습니다.
        </div>
      )}
      {qryNotis.isLoading && <Loading />}

      {/* Prevent pagination temporary */}
      {/* <div ref={notiBottomRef}></div> */}
    </div>
  );
}
