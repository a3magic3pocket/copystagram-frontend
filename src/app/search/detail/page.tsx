import Post from "@/component/Post";
import Title from "@/component/Title";
import GoBackIcon from "@/component/icon/GoBack";

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <Title title={"탐색 탭"} />
      {[...Array(3)].map((_, i) => {
        return <Post key={i} />;
      })}
    </div>
  );
}
