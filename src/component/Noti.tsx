import { INotiInfo } from "@/inteface/notiInfo.inteface";
import { getImageUrl } from "@/util/image";
import Image from "next/image";

export default function Noti(props: INotiInfo) {
  let createdAt = new Date();
  if (props.createdAt) {
    const [year, month, day, hours, minutes, seconds] = props.createdAt;
    createdAt = new Date(year, month - 1, day, hours, minutes, seconds);
  }

  return (
    <div className="flex flex-row justify-between items-center border border-black border-solid">
      <div className="flex w-10 m-4 aspect-square rounded-full bg-yellow-500">
        {props.ownerThumbImagePath && (
          <Image
            src={props.ownerThumbImagePath}
            alt="owner image"
            width={50}
            height={50}
          />
        )}
        {/* user image */}
      </div>
      <div className="my-2 w-8/12 justify-start">
        <div>{props.content}</div>
        <div className="text-xs">
          {`${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`}
        </div>
      </div>

      {/* user image */}
      {props.postThumbImagePath ? (
        <div className="flex w-10 m-4 aspect-square rounded-md bg-yellow-500">
          <Image
            src={getImageUrl(props.postThumbImagePath)}
            alt="post image"
            width={50}
            height={50}
          />
        </div>
      ) : (
        <div className="flex w-10 m-4 aspect-square rounded-md bg-transparent"></div>
      )}
    </div>
  );
}
