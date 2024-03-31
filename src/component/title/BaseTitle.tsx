import GoBackIcon from "@/component/icon/GoBack";
import { useRouter } from "next/navigation";

export default function BaseTitle(props: IBaseTitleProps) {
  return (
    <div className="sticky top-0 grid grid-flow-col justify-stretch p-2 bg-yellow-500">
      <div className="flex justify-start">
        <GoBackIcon onClick={props.onClick} />
      </div>
      <div className="flex justify-center">{props.title}</div>
      <div className="flex"></div>
    </div>
  );
}
