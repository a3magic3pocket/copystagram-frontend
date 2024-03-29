import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchIcon(props: IIconProps) {
  return (
    <FontAwesomeIcon
      icon={faMagnifyingGlass}
      size={props.size || "sm"}
      className={props.className || "p-1"}
    />
  );
}
