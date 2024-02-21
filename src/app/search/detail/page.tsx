import Post from "@/component/Post";
import GoBackIcon from "@/component/icon/GoBack";

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="grid grid-flow-col justify-stretch align-items p-2">
        <div className="flex justify-start">
          <GoBackIcon />
        </div>
        <div className="flex justify-center">탐색 탭</div>
        <div className="flex"></div>
      </div>
      {[...Array(3)].map((_, i) => {
        return <Post key={i} />;
      })}
    </div>
  );
}
