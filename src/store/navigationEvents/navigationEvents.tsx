import { StateCreator } from "zustand";

export const createNavigationEventsSlice: StateCreator<
  INotiState & INavigationEvents,
  [],
  [],
  INavigationEvents
> = (set) => ({
  beforePathname: "",
  setBeforePathname: (beforePathname: string) =>
    set((state) => ({ ...state, beforePathname: beforePathname })),
});
