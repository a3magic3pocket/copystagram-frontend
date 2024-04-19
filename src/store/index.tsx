import { create } from "zustand";
import { createNotiSlide } from "./noti/noti";

import { createNavigationEventsSlice } from "./navigationEvents/navigationEvents";
import { devtools } from "zustand/middleware";

export const useBoundStore = create<INotiState & INavigationEvents>()(
  devtools((...args) => ({
    ...createNotiSlide(...args),
    ...createNavigationEventsSlice(...args),
  }))
);
