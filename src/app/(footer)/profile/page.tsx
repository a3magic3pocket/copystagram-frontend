"use client";

import Loading from "@/component/loading/Loading";
import { urlKey } from "@/config/urlMapKey";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import { getMyLatestPosts } from "@/query/copystagram/getMyLatestPosts";
import { getMyUserInfo } from "@/query/copystagram/getMyUserInfo";
import { getImageUrl } from "@/util/image";
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Modal from "@/component/Modal";
import type { IPostInfoList } from "@/inteface/postInfoList.inteface";
import type { IPostInfo } from "@/inteface/postInfo.inteface";
import Post from "@/component/Post";
import BaseTitle from "@/component/title/BaseTitle";
import { countMyPosts } from "@/query/copystagram/countMyPosts";
import PositiveButton from "@/component/button/PositiveBtn";
import { urlMap } from "@/config/urlMap";

export default function Page() {
  const router = useRouter();
  const postBottomRef = useRef<HTMLDivElement>(null);
  const postDetailBottomRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<IPostInfo[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [emptyPageNum, setEmptyPageNum] = useState<number>(-1);
  const [showModal, setShowModal] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(-1);
  const undeveloped = true;
  const copystagramRootUrl = process.env.NEXT_PUBLIC_COPYSTAGRAM_API_URL;

  const [qryUserInfo, qryPostInfos, qryCountPosts] = useQueries({
    queries: [
      {
        queryKey: [urlKey.COPYSTAGRAM_GET_MY_USER_INFO],
        queryFn: getMyUserInfo,
        staleTime: Infinity,
      },
      {
        queryKey: [urlKey.COPYSTAGRAM_GET_LATEST_MY_POSTS, pageNum],
        queryFn: () => getMyLatestPosts(pageNum),
        staleTime: Infinity,
        // enabled: !!pageNum,
        // placeholderData: keepPreviousData,
      },
      {
        queryKey: [urlKey.COPYSTAGRAM_COUNY_MY_POSTS],
        queryFn: () => countMyPosts(),
        staleTime: Infinity,
      },
    ],
  });

  const handleClickThumb = (i: number) => {
    setSelectedPostIndex(i);
    setShowModal(true);
  };

  const [postBottomObserve, postBottomDisconnect] = useIntersectionObserver(
    () => {
      setPageNum((pageNum) => pageNum + 1);
    }
  );
  const [postBottomDetailObserve, postBottomDetailDisconnect] =
    useIntersectionObserver(() => {
      setPageNum((pageNum) => pageNum + 1);
    });

  useEffect(() => {
    if (
      postBottomRef?.current === null ||
      postDetailBottomRef?.current === null
    ) {
      return;
    }

    // 로딩 중에는 observing 금지
    if (qryPostInfos.isLoading) {
      postBottomDisconnect(postBottomRef.current);
      postBottomDetailDisconnect(postDetailBottomRef.current);
    }
    // 로딩이 끝나면 다시 observing 시작
    else {
      postBottomObserve(postBottomRef.current);
      postBottomDetailObserve(postDetailBottomRef.current);
    }
  }, [
    postBottomRef?.current,
    postDetailBottomRef?.current,
    qryPostInfos.isLoading,
  ]);

  useEffect(() => {
    const postInfoList: IPostInfoList = qryPostInfos.data?.data;
    if (postInfoList && postInfoList.posts) {
      setPosts([...posts, ...postInfoList.posts]);
    }
  }, [qryPostInfos.data]);

  useEffect(() => {
    const postInfoList: IPostInfoList = qryPostInfos.data?.data;
    const isPostInfosEmpty =
      postInfoList &&
      postInfoList.pageNum > 1 &&
      postInfoList.posts.length === 0;

    // 마지막 페이지 기록
    if (isPostInfosEmpty && emptyPageNum < 0) {
      setEmptyPageNum(postInfoList.pageNum);
    }
    // 이전 페이지 결과가 비었음(empty)에도 다음 페이지를 조회하였다면
    // pageNum 재조정
    else if (isPostInfosEmpty && pageNum > emptyPageNum) {
      setPageNum(emptyPageNum);
    }
  }, [qryPostInfos.data, emptyPageNum, pageNum]);

  useEffect(() => {
    if (showModal && selectedPostIndex > 0 && modalRef.current) {
      let i = selectedPostIndex;
      const elem = modalRef.current.querySelector(
        `#post-detail-${selectedPostIndex}`
      );
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [showModal, selectedPostIndex, modalRef.current]);

  if (qryUserInfo.isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-between">
        <div className="flex text-4xl pl-2">{qryUserInfo.data?.data.name}</div>
      </div>
      <div className="flex flex-row justify-start">
        <div className="flex relative w-20 m-4 aspect-square rounded-full bg-yellow-500">
          <div className="flex absolute top-10 left-10 w-6 m-4 aspect-square rounded-full bg-blue-500 border-4 border-black border-solid">
            <div className="relative">
              <div className="absolute top-[-7px] left-[2.2px] text-lg font-bold">
                +
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-80 justify-evenly items-center">
          <div className="flex flex-col items-center px-5">
            <p>{qryCountPosts.data ? qryCountPosts.data?.data.count : 0}</p>
            <p className="text-sm">게시글</p>
          </div>
          <div className="flex flex-col items-center px-5">
            <p>0</p>
            <p className="text-sm">팔로워</p>
          </div>
          <div className="flex flex-col items-center px-5">
            <p>0</p>
            <p className="text-sm">팔로잉</p>
          </div>
        </div>
      </div>
      <div className="flex p-2">{qryUserInfo.data?.data.description}</div>
      <div className="flex flex-row justify-end items-center p-1">
        <PositiveButton
          text="로그아웃"
          onClick={() => {
            const logoutUrl = urlMap(urlKey.COPYSTAGRAM_LOGOUT_URL);
            router.push(logoutUrl);
          }}
        />
      </div>
      <div
        className={`${
          undeveloped ? "hidden" : "flex"
        } flex-row justify-evenly pb-2`}
      >
        <button className="flex w-[calc(100%/2-0.8rem)] rounded-lg bg-stone-700 justify-center items-center">
          프로필 편집
        </button>
        <button className="flex w-[calc(100%/2-0.8rem)] rounded-lg bg-stone-700 justify-center items-center">
          프로필 공유
        </button>
      </div>
      <div className="flex justify-start items-center flex-wrap">
        {posts &&
          posts.map((postInfo: IPostInfo, i) => {
            const thumbImagePath = getImageUrl(postInfo.thumbImagePath);

            return (
              <div
                className="flex w-[calc(100%/3)] aspect-square border border-black border-solid clickable"
                key={`thumb-${postInfo.thumbImagePath}-${i}`}
                onClick={() => handleClickThumb(i)}
              >
                <Image
                  src={thumbImagePath}
                  alt="thumbnail"
                  width={150}
                  height={150}
                />
              </div>
            );
          })}
      </div>
      {qryPostInfos.isLoading && <Loading />}
      <div ref={postBottomRef}></div>

      <Modal showModal={showModal} ref={modalRef}>
        <BaseTitle
          title={"탐색 탭"}
          onClick={() => {
            setShowModal(false);
          }}
        />
        {posts &&
          posts.map((post, i) => {
            return (
              <div
                key={`modal-${post.thumbImagePath}-${i}`}
                id={`post-detail-${i}`}
              >
                <Post {...post} />
              </div>
            );
          })}
        <div ref={postDetailBottomRef}></div>
        {qryPostInfos.isLoading && <Loading />}
      </Modal>
    </div>
  );
}
