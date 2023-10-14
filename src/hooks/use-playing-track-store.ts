import { create } from "zustand";

type PlayingTrackStatusType = "play" | "pause";

type PlayingTrackStoreType = {
  trackId: number | null;
  setTrackId: (value: number | null) => void;
  status: PlayingTrackStatusType;
  setStatus: (value: PlayingTrackStatusType) => void;
  toggleStatus: () => void;
};

export const usePlayingTrackStore = create<PlayingTrackStoreType>((set) => ({
  trackId: null,
  setTrackId: (trackId: number | null) => set(() => ({ trackId })),
  status: "pause",
  setStatus: (status: PlayingTrackStatusType) => set(() => ({ status })),
  toggleStatus: () =>
    set((state) => ({ status: state.status === "play" ? "pause" : "play" })),
}));
