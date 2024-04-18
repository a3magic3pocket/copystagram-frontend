"use client";
import Logo from "@/component/Logo";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const copystagramRootUrl = process.env.NEXT_PUBLIC_COPYSTAGRAM_API_URL;
  const url = `${copystagramRootUrl}/oauth2/authorization/google`;

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="flex flex-col border">
        <div className="flex p-2">
          <Logo />
        </div>
        <div className="flex justify-center items-center p-2">
          <Link href={url} passHref>
            <Image
              src="/image/google-login.svg"
              alt="daf"
              width={150}
              height={0}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
