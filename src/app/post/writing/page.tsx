"use client";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import PositiveBtn from "@/component/button/PositiveBtn";
import Title from "@/component/Title";

export default function Page() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [contents, setContents] = useState<File[]>([]);
  const [isShowUploadButton, setIsShowUploadButton] = useState(true);

  useEffect(() => {
    if (contents.length > 0) {
      setIsShowUploadButton(false);
    } else {
      setIsShowUploadButton(true);
    }
  }, [contents]);

  const handleFiles = (files: FileList | null) => {
    if (files === null) {
      return;
    }

    const contents = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isImage = /^image\/.+/.test(file.type);
      if (isImage) {
        contents.push(file);
      }
    }

    contents.push(new File([], "empty"));

    if (contents.length > 0) {
      setContents(contents);
    }
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
            slidesPerView={2}
            spaceBetween={2}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="post-slide"
          >
            {contents.map((file, i) => {
              const fileUrl = window.URL.createObjectURL(file);
              const isLast = i === contents.length - 1;
              return (
                <SwiperSlide key={fileUrl}>
                  {isLast ? (
                    <div className="flex flex-col w-full aspect-square justify-center items-center">
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
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="flex w-full h-40">
          <textarea
            className="flex w-full mt-2 p-1 bg-black resize-none"
            placeholder="문구를 입력하세요..."
            name="content"
            cols={30}
            rows={10}
            maxLength={1000}
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
        />
      </div>
    </div>
  );
}
