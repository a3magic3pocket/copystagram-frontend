"use client";

import Loading from "@/component/Loading";
import { urlKey } from "@/config/urlMapKey";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import { getMyLatestPosts } from "@/query/copystagram/getMyLatestPosts";
import { getMyUserInfo } from "@/query/copystagram/getMyUserInfo";
import { getImageUrl } from "@/util/image";
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { IPostList } from "@/inteface/postList.inteface";
import type { IPost } from "@/inteface/post.inteface";

export default function Page() {
  const router = useRouter();
  const [posts, setPosts] = useState<IPost[]>([]);
  const postBottomRef = useRef<HTMLDivElement>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [emptyPageNum, setEmptyPageNum] = useState<number>(-1);

  const [q1, q2] = useQueries({
    queries: [
      {
        queryKey: [urlKey.COPYSTAGRAM_GET_MY_USER_INFO],
        queryFn: getMyUserInfo,
      },
      {
        queryKey: [urlKey.COPYSTAGRAM_GET_LATEST_MY_POSTS, pageNum],
        queryFn: () => getMyLatestPosts(pageNum),
        // enabled: !!pageNum,
        // placeholderData: keepPreviousData,
      },
    ],
  });

  const [observe, disconnect] = useIntersectionObserver(() => {
    setPageNum((pageNum) => pageNum + 1);
  });

  useEffect(() => {
    if (postBottomRef?.current === null) {
      return;
    }

    if (q2.isLoading) {
      disconnect(postBottomRef.current);
    } else {
      observe(postBottomRef.current);
    }
  }, [postBottomRef?.current, q2.isLoading]);

  useEffect(() => {
    const postList: IPostList = q2.data?.data;
    if (postList && postList.posts) {
      setPosts([...posts, ...postList.posts]);
    }
  }, [q2.data]);

  useEffect(() => {
    const postList: IPostList = q2.data?.data;
    const isPostsEmpty =
      postList && postList.pageNum > 1 && postList.posts.length === 0;

    // 마지막 페이지 기록
    if (isPostsEmpty && emptyPageNum < 0) {
      setEmptyPageNum(postList.pageNum);
    }
    // 마지막 페이지가 비었음에도 다음 페이지를 조회하였다면
    // pageNum 재조정
    else if (isPostsEmpty && pageNum > emptyPageNum) {
      setPageNum(emptyPageNum);
    }
  }, [q2.data, emptyPageNum, pageNum]);

  if (q1.isError || q2.isError) {
    router.push("/error");
  }

  if (q1.isLoading) {
    return (
      <div className="flex w-full justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-between">
        <div className="flex text-4xl pl-2">{q1.data?.data.name}</div>
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
            <p>121</p>
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
      <div className="flex p-2">{q1.data?.data.description}</div>
      <div className="flex flex-row justify-evenly pb-2">
        <button className="flex w-[calc(100%/2-0.8rem)] rounded-lg bg-stone-700 justify-center items-center">
          프로필 편집
        </button>
        <button className="flex w-[calc(100%/2-0.8rem)] rounded-lg bg-stone-700 justify-center items-center">
          프로필 공유
        </button>
      </div>
      <div className="flex justify-start items-center flex-wrap">
        {posts &&
          posts.map((post: any) => {
            const thumbImagePath = getImageUrl(post.thumbImagePath);
            // console.log("thumbImagePath", thumbImagePath);

            return (
              <div
                className="flex w-[calc(100%/3)] aspect-square border border-black border-solid"
                key={post.thumbImagePath}
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

        {/* {[...Array(100)].map((_, i) => {
          return (
            <div className="flex w-[calc(100%/3)] aspect-square border border-black border-solid bg-red-500"></div>
          );
        })} */}
      </div>
      {q2.isLoading && (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      )}
      <div ref={postBottomRef}></div>
    </div>
  );
}
