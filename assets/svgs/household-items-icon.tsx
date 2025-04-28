import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgNBProps } from "@utils/types";

function HouseholdItemsIcon(props: SvgNBProps) {
  return (
    <Svg
      width={44}
      height={44}
      viewBox="0 0 64 64"
      data-name="Layer 1"
      id="Layer_1"
      {...props}
      fill="none"
    >
      <Path
        d="M38.75 53.57h-13.5a2 2 0 01-2-2V37.86a2 2 0 012-2h13.5a2 2 0 012 2v13.71a2 2 0 01-2 2zm-11.5-4h9.5v-9.71h-9.5z"
        fill="#ffb300"
      />
      <Path
        d="M51.07 53.57H12.93a2 2 0 01-2-2V22.43A2 2 0 0112 20.66l19.07-10a2 2 0 011.86 0l19.07 10a2 2 0 011.07 1.77v15.43a2 2 0 01-4 0V23.64L32 14.69l-17.07 9v25.88h34.14v-1.82a2 2 0 014 0v3.82a2 2 0 01-2 2z"
        fill="#0074ff"
      />
    </Svg>
  );
}

export default HouseholdItemsIcon;
