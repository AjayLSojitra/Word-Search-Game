import { useToken } from "native-base";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgNBProps } from "../../utils/types";

function ErrorIcon(props: SvgNBProps) {
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
        d="M8.342 4.754a.844.844 0 0 1 .852.883l-.18 3.812a.665.665 0 0 1-1.328 0l-.18-3.812a.844.844 0 0 1 .836-.883Z"
        fill={fillColor}
      />
      <Path
        d="M8.35 11.915a.625.625 0 1 1 0-1.25.625.625 0 0 1 0 1.25Z"
        fill={fillColor}
      />
    </Svg>
  );
}

export default ErrorIcon;
