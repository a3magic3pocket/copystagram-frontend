import { StateCreator } from "zustand";

export const createNotiSlide: StateCreator<
  INotiState & INavigationEvents,
  [],
  [],
  INotiState
> = (set) => ({
  hadLeftNotiPage: false,
  setHadLeftNotiPage: (hadLeftNotiPage: boolean) =>
    set((state) => ({ ...state, hadLeftNotiPage: hadLeftNotiPage })),
});
