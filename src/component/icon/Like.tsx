import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LikeIcon(props: ILikeProps) {
  return (
    <FontAwesomeIcon
      icon={props.liked ? fullHeart : emptyHeart}
      size="lg"
      className={props.className || "p-1 clickable"}
      onClick={props.onClick || function () {}}
    />
  );
}
