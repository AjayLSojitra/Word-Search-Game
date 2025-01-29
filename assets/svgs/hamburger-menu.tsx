import { useToken } from "native-base";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgNBProps } from "../../utils/types";

function HamburgerMenu(props: SvgNBProps) {
  const { fill = "blueGray.600" } = props;
  const fillColor = useToken<any>("colors", fill);

  return (
    <Svg width={17} height={17} viewBox="0 0 17 17" {...props} fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.457 8.417a.75.75 0 0 1 .75-.75h12.285a.75.75 0 0 1 0 1.5H2.207a.75.75 0 0 1-.75-.75ZM1.457 3.48a.75.75 0 0 1 .75-.75h12.285a.75.75 0 0 1 0 1.5H2.207a.75.75 0 0 1-.75-.75ZM1.457 13.355a.75.75 0 0 1 .75-.75h12.285a.75.75 0 0 1 0 1.5H2.207a.75.75 0 0 1-.75-.75Z"
        fill={fillColor}
      />
    </Svg>
  );
}

export default HamburgerMenu;
