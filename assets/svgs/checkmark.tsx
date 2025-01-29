import { useToken } from "native-base";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgNBProps } from "../../utils/types";

function Checkmark(props: SvgNBProps) {
  const { fill = "blueGray.600" } = props;
  const fillColor = useToken<any>("colors", fill);

  return (
    <Svg width={17} height={17} viewBox="0 0 17 17" {...props} fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.686 8.417A6.667 6.667 0 0 1 8.35 1.752a6.667 6.667 0 0 1 6.664 6.665 6.666 6.666 0 0 1-6.664 6.665 6.667 6.667 0 0 1-6.665-6.665ZM8.35 3.082a5.337 5.337 0 0 0-5.335 5.335 5.336 5.336 0 0 0 5.335 5.335 5.336 5.336 0 0 0 5.334-5.335 5.336 5.336 0 0 0-5.334-5.335Z"
        fill={fillColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.504 5.637a.665.665 0 0 1 .082.937l-4.009 4.771a.665.665 0 0 1-1.003.017L4.856 9.454a.665.665 0 1 1 .989-.89l1.206 1.34 3.516-4.186a.665.665 0 0 1 .937-.081Z"
        fill={fillColor}
      />
    </Svg>
  );
}

export default Checkmark;
