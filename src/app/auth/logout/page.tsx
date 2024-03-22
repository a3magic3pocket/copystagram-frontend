"use client";
import Link from "next/link";

export default function Page() {
  const url = "http://localhost:8080/v1/auth/logout";

  return (
    <div className="flex flex-col">
      <Link href={url} passHref>
        구글 로그아웃
      </Link>
    </div>
  );
}
