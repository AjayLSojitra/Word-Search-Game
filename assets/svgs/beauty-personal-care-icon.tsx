import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgNBProps } from "@utils/types";

function BeautyPersonalCareIcon(props: SvgNBProps) {
  return (
    <Svg
      width={44}
      height={44}
      viewBox="0 0 30 30"
      id="Layer_1"
      {...props}
      fill="none"
    >
      <Path
        d="M25.3 7.5c-2.9-2.9-7.4-2.9-10.2 0-2.8-2.8-7.4-2.8-10.2 0-2.7 2.7-2.9 6.9-.4 9.8 1.3 1.5 2.6 2.8 4 4.1.6-.3 1.4-.6 2.1-1 0 0 3-1.3 4.9-4.1-2.4 1.7-4.7 2.4-5.7 2.6-.4-1.5-.1-3.1 1-4.2 1.5-1.5 5.8-1.9 7.3-4.3.2-.3.6-.3.8 0 .7 1.6 1.9 5.4-.7 9.3-1.3 2-4.2 2.9-6.3 1.8-.7.5-1.4 1-1.9 1.3 1.6 1.4 3.3 2.7 5.1 3.9 4.1-2.6 7.6-5.8 10.7-9.4 2.3-2.9 2.1-7.1-.5-9.8z"
        fill="#fd6a7e"
      />
    </Svg>
  );
}

export default BeautyPersonalCareIcon;
