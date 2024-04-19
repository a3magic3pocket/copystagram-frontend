import LikeIcon from "@/component/icon/Like";
import MessageIcon from "@/component/icon/Message";
import ReplyIcon from "@/component/icon/Reply";
import { IPostInfo } from "@/inteface/postInfo.inteface";
import { getImageUrl } from "@/util/image";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { upLike } from "@/query/copystagram/upLike";
import { downLike } from "@/query/copystagram/downLike";

export default function Post(props: IPostInfo) {
  const [liked, setLiked] = useState<boolean>(
    props.numLikes !== null && props.numLikes > 0
  );
  const upMut = useMutation({
    mutationFn: () => upLike(props.postId, props.hookPostId),
    onError: (error: Error) => {},
    onSuccess: () => {},
  });
  const downMut = useMutation({
    mutationFn: () => downLike(props.postId, props.hookPostId),
    onError: (error: Error) => {},
    onSuccess: () => {},
  });
  const undeveloped = true;

  let createdAt = new Date();
  if (props.createdAt) {
    const [year, month, day, hours, minutes, seconds] = props.createdAt;
    createdAt = new Date(year, month - 1, day, hours, minutes, seconds);
  }

  const handleLikeClick = () => {
    // 좋아요 down
    if (liked) {
      downMut.mutate();
    }
    // 좋아요 up
    else {
      upMut.mutate();
    }

    setLiked(!liked);
  };

  return (
    <div className="flex flex-col w-full h-full border border-black border-solid">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex items-center">
          <div className="flex w-8 m-2 aspect-square rounded-full bg-yellow-500"></div>
          <div className="flex">{props.ownerName}</div>
        </div>
        <div className="flex items-center">
          <button
            className={`${
              undeveloped ? "hidden" : "flex"
            } mr-2 rounded-lg bg-stone-700 p-1 px-3`}
          >
            팔로우
          </button>
        </div>
      </div>
      <div className="flex w-full aspect-square bg-white">
        <Swiper
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {props.contentImagePaths.map((imagePath, i) => {
            return (
              <SwiperSlide key={imagePath}>
                <Image
                  src={getImageUrl(imagePath)}
                  alt={"post-image"}
                  width={500}
                  height={500}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="flex flex-row justify-stretch">
        <div className="flex flex-row w-[calc(100%/3)]">
          <LikeIcon liked={liked} onClick={handleLikeClick} />
          {!undeveloped && <ReplyIcon />}
          {!undeveloped && <MessageIcon />}
        </div>
        <div className="flex w-[calc(100%/3)] justify-center"></div>
        <div className="flex w-[calc(100%/3)]"></div>
      </div>
      <div className="flex flex-col p-2">
        <div className={`${undeveloped ? "hidden" : "flex"}`}>좋아요 수</div>
        <div>
          {props.ownerName}: {props.description}
        </div>
        <div className={`${undeveloped ? "hidden" : "flex"}`}>
          가장 인기 많은 댓글
        </div>
        <div className={`${undeveloped ? "hidden" : "flex"}`}>
          댓글 모두 보기
        </div>
        <div className="flex text-xs">
          게시일:{" "}
          {`${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`}
        </div>
      </div>
    </div>
  );
}
