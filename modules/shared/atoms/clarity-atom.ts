import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";

export type ClarityState = {
  value: boolean;
  clarityScore: number;
  previousClarityScore: number;
};

const clarityState = atom<ClarityState>({
  key: "clarityState",
  default: {
    value: false,
    clarityScore: 0,
    previousClarityScore: 0,
  },
});

export const useClarityStateValue = () => useRecoilValue(clarityState);
export const useClarityState = () => useRecoilState(clarityState);
export const useSetClarityState = () => useSetRecoilState(clarityState);
export const useResetClarityState = () => useResetRecoilState(clarityState);
