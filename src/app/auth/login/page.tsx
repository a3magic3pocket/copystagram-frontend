"use client";
import Link from "next/link";

export default function Page() {
  const url = "http://localhost:8080/oauth2/authorization/google";

  return (
    <div className="flex flex-col">
      <Link href={url} passHref>
        구글 로그인
      </Link>
    </div>
  );
}
