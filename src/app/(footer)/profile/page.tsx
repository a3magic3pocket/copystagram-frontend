export default function Page() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-between">
        <div className="flex text-4xl pl-2">myID</div>
      </div>
      <div className="flex flex-row justify-start">
        <div className="flex relative w-20 m-4 aspect-square rounded-full bg-yellow-500">
          <div className="flex absolute top-10 left-10 w-6 m-4 aspect-square rounded-full bg-blue-500 border-4 border-black border-solid">
            <div className="relative">
              <div className="absolute top-[-7px] left-[2.2px] text-lg font-bold">
                +
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-80 justify-evenly items-center">
          <div className="flex flex-col items-center px-5">
            <p>121</p>
            <p className="text-sm">게시글</p>
          </div>
          <div className="flex flex-col items-center px-5">
            <p>121</p>
            <p className="text-sm">팔로워</p>
          </div>
          <div className="flex flex-col items-center px-5">
            <p>121</p>
            <p className="text-sm">팔로잉</p>
          </div>
        </div>
      </div>
      <div className="flex p-2">2123157 hjkl vnbm 26+86 78465 jioko</div>
      <div className="flex flex-row justify-evenly pb-2">
        <button className="flex w-[calc(100%/2-0.8rem)] rounded-lg bg-stone-700 justify-center items-center">
          프로필 편집
        </button>
        <button className="flex w-[calc(100%/2-0.8rem)] rounded-lg bg-stone-700 justify-center items-center">
          프로필 공유
        </button>
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
