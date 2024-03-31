import Logo from "@/component/Logo";
import Post from "@/component/Post";
import LikeIcon from "@/component/icon/Like";
import MessageIcon from "@/component/icon/Message";
import { redirect } from "next/navigation";

export default function Page() {
  const undeveloped = true;
  if (undeveloped) {
    redirect("/search");
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full h-full justify-between">
        <Logo />
        <div className="flex flex-row pr-2">
          <LikeIcon className="flex self-center p-2" />
          <MessageIcon className="flex self-center p-2" />
        </div>
      </div>
      <div>main</div>
    </div>
  );
}
