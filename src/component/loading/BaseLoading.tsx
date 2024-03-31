import Image from "next/image";

export default function BaseLoading() {
  return (
    <div className="flex animate-spin h-10 w-10">
      <Image src="/image/loading.svg" alt="daf" width={50} height={50} />
    </div>
  );
}
