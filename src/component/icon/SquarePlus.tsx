import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SquarePlusIcon(props: IIconProps) {
  return (
    <FontAwesomeIcon
      icon={faSquarePlus}
      size={props.size || "sm"}
      className={props.className || "p-1"}
    />
  );
}
