import Post from "@/component/post";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="grid grid-flow-col justify-stretch align-items p-2">
        <div className="flex justify-start">
          <FontAwesomeIcon icon={faChevronLeft} className="flex self-center" />
        </div>
        <div className="flex justify-center">탐색 탭</div>
        <div className="flex"></div>
      </div>
      {[...Array(3)].map((_, i) => {
        return <Post />;
      })}
    </div>
  );
}
