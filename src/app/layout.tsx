import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { QueryProvider } from "../query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-center items-center">
          <div className="flex flex-col main-content-wrap bg-pink-800 border border-black border-solid">
            <QueryProvider>{children}</QueryProvider>
          </div>
        </div>
        {/* 430 x 932 */}
      </body>
    </html>
  );
}
