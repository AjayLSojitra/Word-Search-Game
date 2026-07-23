import { create } from "zustand";

export type ConfettiState = {
  value: boolean;
  mode: "small" | "large";
};

interface ConfettiStore {
  confettiState: ConfettiState;
  setConfettiState: (state: ConfettiState) => void;
  resetConfettiState: () => void;
}

const useConfettiStore = create<ConfettiStore>((set) => ({
  confettiState: {
    value: false,
    mode: "large",
  },
  setConfettiState: (state) => set({ confettiState: state }),
  resetConfettiState: () =>
    set({ confettiState: { value: false, mode: "large" } }),
}));

export const useConfettiStateValue = () =>
  useConfettiStore((state) => state.confettiState);
export const useConfettiState = () => {
  const confettiState = useConfettiStore((state) => state.confettiState);
  const setConfettiState = useConfettiStore((state) => state.setConfettiState);
  return [confettiState, setConfettiState] as const;
};
export const useSetConfettiState = () =>
  useConfettiStore((state) => state.setConfettiState);
export const useResetConfettiState = () =>
  useConfettiStore((state) => state.resetConfettiState);
