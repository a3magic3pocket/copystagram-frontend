"use client";

import { useRouter } from "next/navigation";
import BaseTitle from "./BaseTitle";

export default function Title(props: ITitleProps) {
  const router = useRouter();
  return (
    <BaseTitle
      title={props.title}
      onClick={() => {
        if (props.backTo) {
          router.push(props.backTo);
        } else {
          router.back();
        }
      }}
    />
  );
}
