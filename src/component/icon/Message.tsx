import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MessageIcon(props: IIconProps) {
  return (
    <FontAwesomeIcon
      icon={faPaperPlane}
      size="lg"
      transform={{ rotate: 26 }}
      className={props.className || "p-1"}
    />
  );
}
