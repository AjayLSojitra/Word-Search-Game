import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgNBProps } from "@utils/types";

function HealthFitnessIcon(props: SvgNBProps) {
  return (
    <Svg width={44} height={44} viewBox="0 0 48 48" {...props} fill="none">
      <Path fill="#2F88FF" fillOpacity={0.01} d="M0 0H48V48H0z" />
      <Path
        d="M36 15a5 5 0 100-10 5 5 0 000 10z"
        fill="#000000"
        stroke="#2F88FF"
        strokeWidth={4}
      />
      <Path
        d="M12 16.77l8.003-2.772L31 19.247l-10.997 8.197L31 34.684l-6.992 9.314M35.32 21.643L38 23.102 44 17.466M16.849 31.545l-2.97 3.912-9.875 5.54"
        stroke="#2F88FF"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default HealthFitnessIcon;
