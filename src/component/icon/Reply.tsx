import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ReplyIcon(props: IIconProps) {
  return (
    <FontAwesomeIcon
      icon={faComment}
      size="lg"
      flip="horizontal"
      className={props.className || "p-1"}
    />
  );
}
