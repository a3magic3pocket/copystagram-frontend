import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LikeIcon(props: IIconProps) {
  return (
    <FontAwesomeIcon
      icon={faHeart}
      size="lg"
      className={props.className || "p-1"}
    />
  );
}
