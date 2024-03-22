import SearchIcon from "@/component/icon/Search";

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex w-full justify-center items-center border border-black border-solid relative">
        <SearchIcon
          size="sm"
          className="absolute left-0 ml-7 text-stone-500"
        />
        <input
          type="text"
          placeholder="검색"
          className="flex w-full mx-5 my-1 p-1 pl-7 rounded-lg bg-stone-700 placeholder:text-stone-500"
        />
      </div>

      <div className="flex justify-start items-center flex-wrap">
        {[...Array(100)].map((_, i) => {
          return (
            <div className="flex w-[calc(100%/3)] aspect-square border border-black border-solid bg-red-500"></div>
          );
        })}
      </div>
    </div>
  );
}
