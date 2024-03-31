import Post from "@/component/Post";
import LikeIcon from "@/component/icon/Like";
import MessageIcon from "@/component/icon/Message";

export default function Page() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full h-full justify-between">
        <div className="flex font-aAdulsaScript text-4xl pl-2">Copystagram</div>
        <div className="flex flex-row pr-2">
          <LikeIcon className="flex self-center p-2" />
          <MessageIcon className="flex self-center p-2" />
        </div>
      </div>
      <div>main</div>
      {/* {[...Array(3)].map((_, i) => {
        return <Post key={i} />;
      })} */}
    </div>
  );
}
