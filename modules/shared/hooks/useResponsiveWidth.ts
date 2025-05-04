import { useWindowDimensions } from "react-native";
import useMediaQuery from "./useMediaQuery";

function useResponsiveWidth() {
  const { width } = useWindowDimensions();
  const RESPONSIVE_WIDTH = [
    width,
    width * 0.9,
    width * 0.85,
    width * 0.8,
    width * 0.5,
  ];
  const { mQ } = useMediaQuery();

  return mQ(RESPONSIVE_WIDTH) as number;
}

export default useResponsiveWidth;
