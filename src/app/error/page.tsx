import Title from "@/component/title/Title";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Title title={"에러"} />
      <div
        className={`flex flex-col w-full h-[90vh] justify-center items-center`}
      >
          <div>에러발생</div>
      </div>
    </>
  );
}
