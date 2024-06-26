import SearchIcon from "@/component/icon/Search";
import SquarePlusIcon from "@/component/icon/SquarePlus";
import UserIcon from "@/component/icon/User";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Copystagram",
  description: "Copystagram",
};

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex min-h-[calc(100vh-3.2rem)]">
        {children}
      </div>
      <div className="flex h-[3.2] flex-row sticky bottom-0 justify-evenly items-center bg-black ">
        <Link href="/search">
          <SearchIcon size="2xl" className="p-2" />
        </Link>
        <Link href="/post/writing">
          <SquarePlusIcon size="2x" className="p-2" />
        </Link>
        <Link href="/profile">
          <UserIcon size="2x" className="p-2" />
        </Link>
      </div>
    </>
  );
}
