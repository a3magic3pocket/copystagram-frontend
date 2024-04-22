"use client";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import PositiveBtn from "@/component/button/PositiveBtn";
import Title from "@/component/title/Title";
import { AxiosError, isAxiosError } from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/query/copystagram/createPost";
import Swal from "sweetalert2";

export default function Page() {
  const router = useRouter();
  const descRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [contents, setContents] = useState<File[]>([]);
  const [isShowUploadButton, setIsShowUploadButton] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const allowedExts = ["png", "jpg", "jpeg"];
  const [isContainedWrongExts, setIsContainedWrongExts] = useState(false);
  const authHintCookieName =
    process.env.NEXT_PUBLIC_COPYSTAGRAM_AUTH_HINT_COOKIE_NAME || "";
  const [cookies, ,] = useCookies([authHintCookieName]);

  const mut = useMutation({
    mutationFn: (formData: FormData) => createPost(formData),
    onError: (error: Error) => {
      if (!isAxiosError(error)) {
        router.push("/error");
      }

      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 422) {
        const data = axiosError.response.data as any;
        let { message } = data;

        Swal.fire({
          title: message,
          icon: "error",
        });

        return;
      }

      if (axiosError.response?.status === 413) {
        Swal.fire({
          title: "이미지 용량의 합은 10M보다 작아야 합니다.",
          icon: "error",
        });

        return;
      }

      Swal.fire({
        title: "알 수 없는 오류 발생",
        icon: "warning",
      });
      return;
    },
    onSuccess: () => {
      Swal.fire({
        title: "글 생성 요청 완료",
        text: "약 1분 정도 소요됩니다.",
        icon: "success",
      }).then(() => {
        router.push("/");
      });
    },
  });

  useEffect(() => {
    if (!cookies[authHintCookieName]) {
      router.replace("/auth/login");
    }
  }, [cookies]);

  useEffect(() => {
    if (contents.length > 0) {
      setIsShowUploadButton(false);
    } else {
      setIsShowUploadButton(true);
    }
  }, [contents]);

  const handleFiles = (files: FileList | null) => {
    const contents = [];
    let isContainedWrongExts = false;

    if (files !== null) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const pattern = new RegExp(`^image\/(?:${allowedExts.join("|")})`);
        const isImage = pattern.test(file.type);
        if (isImage) {
          contents.push(file);
        } else {
          isContainedWrongExts = true;
        }
      }

      setIsContainedWrongExts(isContainedWrongExts);
    }

    contents.push(new File([], "empty"));
    setContents(contents);

    if (contents.length > 1) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(1);
    }
  };

  const handleSubmit = () => {
    const description = descRef.current?.value;

    const formData = new FormData();
    contents.forEach((content) => {
      if (content.size === 0) {
        return;
      }
      formData.append("image", content);
    });
    formData.append("description", description || "");

    mut.mutate(formData);
  };

  return (
    <div className="flex flex-col w-full h-[99vh] justify-between">
      <Title title={"새 게시물"} />

      <div
        className={`flex-col w-full h-[99vh] justify-center items-center ${
          isShowUploadButton ? "flex" : "hidden"
        }`}
      >
        <input
          type="file"
          id="file-elem"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          ref={fileRef}
          className="hidden"
        />
        <FontAwesomeIcon icon={faImage} size={"5x"} />
        <PositiveBtn
          onClick={() => {
            fileRef.current?.click();
          }}
          text={"업로드"}
        />
      </div>

      <div
        className={`flex flex-col justify-start items-start min-h-[80vh] ${
          isShowUploadButton ? "hidden" : "flex"
        }`}
      >
        <div className="flex w-full">
          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={2}
            pagination={{
              clickable: true,
            }}
            autoHeight={true}
            modules={[Pagination]}
            className="post-slide"
            style={
              {
                "--swiper-pagination-bullet-inactive-color": "white",
              } as React.CSSProperties
            }
          >
            {contents.map((file, i) => {
              const fileUrl = window.URL.createObjectURL(file);
              const isLast = i === contents.length - 1;
              return (
                <SwiperSlide key={fileUrl}>
                  {isLast ? (
                    <div className="flex flex-col w-full h-[30vh] aspect-square justify-center items-center">
                      <PositiveBtn
                        onClick={() => {
                          fileRef.current?.click();
                        }}
                        text={"새 이미지 업로드"}
                      />
                    </div>
                  ) : (
                    <img
                      src={fileUrl}
                      alt={file.name}
                      className="w-full h-[30vh] aspect-square object-cover rounded-lg"
                    />
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div
          className={`${
            isContainedWrongExts ? "flex" : "hidden"
          } text-red-300 pl-1}`}
        >
          {allowedExts.join(", ")} 파일만 업로드할 수 있습니다.
          <br />그 외 파일은 제외됩니다.
        </div>
        <div className="flex w-full h-40">
          <textarea
            className="flex w-full mt-2 p-1 bg-black resize-none"
            placeholder="문구를 입력하세요..."
            name="content"
            cols={30}
            rows={10}
            maxLength={1000}
            ref={descRef}
          ></textarea>
        </div>
      </div>

      <div
        className={`justify-center items-end border-t border-black border-solid ${
          isShowUploadButton ? "hidden" : "flex"
        }`}
      >
        <PositiveBtn
          className="w-[calc(100%-1rem)] m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          text="공유"
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  );
}
