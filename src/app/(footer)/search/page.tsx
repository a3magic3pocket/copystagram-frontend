"use client";

import Modal from "@/component/Modal";
import Post from "@/component/Post";
import LikeIcon from "@/component/icon/Like";
import MessageIcon from "@/component/icon/Message";
import SearchIcon from "@/component/icon/Search";
import Loading from "@/component/loading/Loading";
import BaseTitle from "@/component/title/BaseTitle";
import Link from "next/link";
import Image from "next/image";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import { urlKey } from "@/config/urlMapKey";
import { IPostInfo } from "@/inteface/postInfo.inteface";
import { IPostInfoList } from "@/inteface/postInfoList.inteface";
import { getAllPosts } from "@/query/copystagram/getAllPosts";
import { getImageUrl } from "@/util/image";
import { useMutation, useQueries } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import Logo from "@/component/Logo";
import { getRelatedAllPosts } from "@/query/copystagram/getRelatedAllPosts";
import { clickPost } from "@/query/copystagram/clickPost";
import { useCookies } from "react-cookie";
import { getMyUncheckedNotis } from "@/query/copystagram/getMyUncheckedNotis";
import { defaultWrapWidth } from "@/config/config";

export default function Page() {
  const undeveloped = true;
  const postBottomRef = useRef<HTMLDivElement>(null);
  const postDetailBottomRef = useRef<HTMLDivElement>(null);
  const [thumbsPageNum, setThumbsPageNum] = useState(1);
  const [detailPageNum, setDetailPageNum] = useState(1);
  const [postThumbs, setPostThumbs] = useState<IPostInfo[]>([]);
  const [postDetails, setPostDetails] = useState<IPostInfo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [thumbsEmptyPageNum, setThumbsEmptyPageNum] = useState<number>(-1);
  const [detailsEmptyPageNum, setDetailsEmptyPageNum] = useState<number>(-1);
  const [hookPostId, setHookPostId] = useState<string>("");
  const authHintCookieName =
    process.env.NEXT_PUBLIC_COPYSTAGRAM_AUTH_HINT_COOKIE_NAME || "";
  const [cookies, ,] = useCookies([authHintCookieName]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postWidth, setPostWidth] = useState(defaultWrapWidth);

  const [qryThumbs, qryDetails, qryUncheckedNotis] = useQueries({
    queries: [
      {
        queryKey: [urlKey.COPYSTAGRAM_GET_ALL_POSTS, thumbsPageNum],
        queryFn: () => getAllPosts(thumbsPageNum),
        // enabled: !!pageNum,
        // placeholderData: keepPreviousData,
        staleTime: Infinity,
      },
      {
        queryKey: [
          urlKey.COPYSTAGRAM_GET_RELATED_ALL_POSTS,
          detailPageNum,
          hookPostId,
        ],
        queryFn: () => getRelatedAllPosts(detailPageNum, hookPostId),
        // enabled: !!pageNum,
        // placeholderData: keepPreviousData,
        staleTime: Infinity,
        enabled: isLoggedIn && hookPostId !== "",
      },
      {
        queryKey: [urlKey.COPYSTAGRAM_GET_MY_UNCHECKED_NOTIS],
        queryFn: () => getMyUncheckedNotis(),
        enabled: isLoggedIn,
      },
    ],
  });

  const mut = useMutation({
    mutationFn: (hookPostId: string) => clickPost(hookPostId),
    onError: (error: Error) => {},
    onSuccess: () => {},
  });

  const handleClickThumb = (i: number) => {
    setPostDetails([postThumbs[i]]);
    setShowModal(true);
    setHookPostId(postThumbs[i].postId);
    setDetailPageNum(1);
    mut.mutate(postThumbs[i].postId);
  };

  const [postBottomObserve, postBottomDisconnect] = useIntersectionObserver(
    () => {
      setThumbsPageNum((pageNum) => pageNum + 1);
    }
  );
  const [postBottomDetailObserve, postBottomDetailDisconnect] =
    useIntersectionObserver(() => {
      setDetailPageNum((pageNum) => pageNum + 1);
    });

  useEffect(() => {
    setIsLoggedIn(cookies[authHintCookieName] !== undefined);
  }, [cookies]);

  useEffect(() => {
    if (postBottomRef?.current === null) {
      return;
    }

    // 로딩 중에는 observing 금지
    if (qryThumbs.isLoading) {
      postBottomDisconnect(postBottomRef.current);
    }
    // 로딩이 끝나면 다시 observing 시작
    else {
      postBottomObserve(postBottomRef.current);
    }
  }, [postBottomRef?.current, qryThumbs.isLoading]);

  useEffect(() => {
    if (postDetailBottomRef?.current === null) {
      return;
    }

    // 로딩 중에는 observing 금지
    if (qryDetails.isLoading) {
      postBottomDetailDisconnect(postDetailBottomRef.current);
    }
    // 로딩이 끝나면 다시 observing 시작
    else {
      postBottomDetailObserve(postDetailBottomRef.current);
    }
  }, [postDetailBottomRef?.current, qryDetails.isLoading]);

  useEffect(() => {
    const postInfoList: IPostInfoList = qryThumbs.data?.data;
    console.log("ORIGIN:: postInfoList", postInfoList);
    if (postInfoList && postInfoList.posts) {
      setPostThumbs([...postThumbs, ...postInfoList.posts]);
    }
  }, [qryThumbs.data]);

  useEffect(() => {
    // 로그인을 하지 않은 경우
    if (!isLoggedIn && hookPostId !== "" && showModal) {
      setPostDetails([...postDetails, ...postThumbs]);
    }
  }, [postThumbs, cookies, hookPostId, showModal]);

  useEffect(() => {
    const postInfoList: IPostInfoList = qryDetails.data?.data;
    if (postInfoList && postInfoList.posts) {
      setPostDetails([...postDetails, ...postInfoList.posts]);
    }
  }, [qryDetails.data]);

  useEffect(() => {
    const postInfoList: IPostInfoList = qryThumbs.data?.data;
    const isPostInfosEmpty =
      postInfoList &&
      postInfoList.pageNum > 1 &&
      postInfoList.posts.length === 0;

    // 마지막 페이지 기록
    if (isPostInfosEmpty && thumbsEmptyPageNum < 0) {
      setThumbsEmptyPageNum(postInfoList.pageNum);
    }
    // 이전 페이지 결과가 비었음(empty)에도 다음 페이지를 조회하였다면
    // pageNum 재조정
    else if (isPostInfosEmpty && thumbsPageNum > thumbsEmptyPageNum) {
      setThumbsPageNum(thumbsEmptyPageNum);
    }
  }, [qryThumbs.data, thumbsEmptyPageNum, thumbsPageNum]);

  useEffect(() => {
    const postInfoList: IPostInfoList = qryDetails.data?.data;
    const isPostInfosEmpty =
      postInfoList &&
      postInfoList.pageNum > 1 &&
      postInfoList.posts.length === 0;

    // 마지막 페이지 기록
    if (isPostInfosEmpty && detailsEmptyPageNum < 0) {
      setDetailsEmptyPageNum(postInfoList.pageNum);
    }
    // 이전 페이지 결과가 비었음(empty)에도 다음 페이지를 조회하였다면
    // pageNum 재조정
    else if (isPostInfosEmpty && detailPageNum > detailsEmptyPageNum) {
      setDetailPageNum(detailsEmptyPageNum);
    }
  }, [qryDetails.data, detailsEmptyPageNum, setDetailPageNum]);

  // post width 설정
  useEffect(() => {
    if (window.innerWidth < defaultWrapWidth) {
      setPostWidth(window.innerWidth - 2);
    }
  }, []);

  // 모달 켜져있을 때 브라우저 뒤로가기 방지
  useEffect(() => {
    if (showModal) {
      window.history.pushState(null, "", location.href);
      window.onpopstate = (e) => {
        setShowModal(false);
      };
    } else {
      window.onpopstate = () => {};
    }
  }, [showModal]);

  return (
    <div className="flex flex-col w-full h-full">
      {/* search bar */}
      <div
        className={`${
          undeveloped ? "hidden" : "flex"
        }  w-full justify-center items-center border border-black border-solid relative}`}
      >
        <SearchIcon size="sm" className="absolute left-0 ml-7 text-stone-500" />
        <input
          type="text"
          placeholder="검색"
          className="flex w-full mx-5 my-1 p-1 pl-7 rounded-lg bg-stone-700 placeholder:text-stone-500"
        />
      </div>

      {/* tmp main navi */}
      <div className="flex flex-row w-full h-full justify-between">
        <Logo />
        <div className="flex flex-row pr-2">
          <Link href="/noti">
            <div className="flex relative">
              <LikeIcon className="flex self-center p-2" liked={false} />
              {qryUncheckedNotis.data?.data &&
                qryUncheckedNotis.data?.data.length > 0 && (
                  <div className="absolute bottom-5 left-6 w-2 aspect-square rounded-full bg-red-500"></div>
                )}
            </div>
          </Link>
          {!undeveloped && <MessageIcon className="flex self-center p-2" />}
        </div>
      </div>

      {/* posts */}
      <div className="flex justify-start items-center flex-wrap">
        {postThumbs &&
          postThumbs.map((postInfo: IPostInfo, i) => {
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
      <div ref={postBottomRef}></div>
      {qryThumbs.isLoading && <Loading />}

      {/* post detail modal */}
      <Modal showModal={showModal}>
        <BaseTitle
          title={"탐색 탭"}
          onClick={() => {
            setShowModal(false);
          }}
        />
        {postDetails &&
          postDetails
            .filter(
              (post, i) => i == 0 || (i !== 0 && post.postId !== hookPostId)
            )
            .map((post, i) => {
              return (
                <div
                  key={`modal-${post.thumbImagePath}-${i}`}
                  id={`post-detail-${i}`}
                >
                  <Post
                    {...post}
                    hookPostId={hookPostId}
                    postWidth={postWidth}
                    isHiddenLike={!isLoggedIn}
                  />
                </div>
              );
            })}
        <div ref={postDetailBottomRef}></div>
        {qryDetails.isLoading && <Loading />}
      </Modal>
    </div>
  );
}
