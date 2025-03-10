import { useCallback } from "react";
import { useWindowDimensions } from "react-native";

type BREAK_POINTS = {
  base: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

const initialBreakPoints: BREAK_POINTS = {
  base: 0,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1280,
};

function useMediaQuery(customBreakPoints?: BREAK_POINTS) {
  const { width } = useWindowDimensions();
  const breakPoints = customBreakPoints ? customBreakPoints : initialBreakPoints;

  const resultantDimension = useCallback(
    (base: any, sm?: any, md?: any, lg?: any, xl?: any) => {
      if (width > breakPoints.base && width <= breakPoints.sm) {
        return base;
      } else if (width > breakPoints.sm && width <= breakPoints.md) {
        return sm ?? base;
      } else if (width > breakPoints.md && width <= breakPoints.lg) {
        return md ?? sm ?? base;
      } else if (width > breakPoints.lg && width <= breakPoints.xl) {
        return lg ?? md ?? sm ?? base;
      } else {
        return xl ?? lg ?? md ?? sm ?? base;
      }
    },
    [width, breakPoints]
  );

  const mediaQuery = useCallback(
    (
      dimensions: Array<any> | (Partial<BREAK_POINTS> & { base: any })
    ) => {
      if (Array.isArray(dimensions)) {
        const [base, sm, md, lg, xl] = dimensions;
        return resultantDimension(base, sm, md, lg, xl);
      } else {
        const { base, sm, md, lg, xl } = dimensions;
        return resultantDimension(base, sm, md, lg, xl);
      }
    },
    [resultantDimension]
  );

  return {
    mediaQuery,
    mQ: mediaQuery,
  };
}

export default useMediaQuery;