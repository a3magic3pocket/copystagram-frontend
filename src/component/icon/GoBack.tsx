import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GoBackIcon(props: IIconProps) {
  return (
    <FontAwesomeIcon
      icon={faChevronLeft}
      size="lg"
      className={props.className || "flex self-center"}
    />
  );
}
