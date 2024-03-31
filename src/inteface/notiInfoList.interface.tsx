import type { INotiInfo } from "./notiInfo.inteface";

export interface INotiInfoList {
  pageNum: number;
  pageSize: number;
  notifications: INotiInfo[];
}
