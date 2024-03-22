import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserIcon(props: IIconProps) {
  return (
    <FontAwesomeIcon
      icon={faCircleUser}
      size={props.size || "sm"}
      className={props.className || "p-1"}
    />
  );
}
