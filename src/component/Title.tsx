import GoBackIcon from "@/component/icon/GoBack";

export default function Title(props: ITitleProps) {
  return (
    <div className="grid grid-flow-col justify-stretch align-items p-2">
      <div className="flex justify-start">
        <GoBackIcon />
      </div>
      <div className="flex justify-center">{props.title}</div>
      <div className="flex"></div>
    </div>
  );
}
