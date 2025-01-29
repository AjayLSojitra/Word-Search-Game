import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";

export type ConfettiState = {
  value: boolean;
};

const confettiState = atom<ConfettiState>({
  key: "confettiState",
  default: {
    value: false,
  },
});

export const useConfettiStateValue = () => useRecoilValue(confettiState);
export const useConfettiState = () => useRecoilState(confettiState);
export const useSetConfettiState = () => useSetRecoilState(confettiState);
export const useResetConfettiState = () => useResetRecoilState(confettiState);
