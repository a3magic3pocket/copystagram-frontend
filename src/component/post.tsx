import LikeIcon from "@/component/icon/Like";
import MessageIcon from "@/component/icon/Message";
import ReplyIcon from "@/component/icon/Reply";

export default function Post() {
  return (
    <div className="flex flex-col w-full h-full border border-black border-solid">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex items-center">
          <div className="flex w-8 m-2 aspect-square rounded-full bg-yellow-500"></div>
          <div className="flex">아이디</div>
        </div>
        <div className="flex items-center">
          <button className="flex mr-2 rounded-lg bg-stone-700 p-1 px-3">
            팔로우
          </button>
        </div>
      </div>
      <div className="flex w-full aspect-square bg-red-500">게시 사진</div>
      <div className="flex flex-row justify-stretch align-items">
        <div className="flex flex-row w-[calc(100%/3)]">
          <LikeIcon />
          <ReplyIcon />
          <MessageIcon />
        </div>
        <div className="flex w-[calc(100%/3)] justify-center align-items">
          ...
        </div>
        <div className="flex w-[calc(100%/3)]"></div>
      </div>
      <div className="flex flex-col">
        <div className="flex">좋아요 수</div>
        <div className="flex">가장 인기 많은 댓글</div>
        <div className="flex">댓글 모두 보기</div>
        <div className="flex">게시 시간</div>
      </div>
    </div>
  );
}
