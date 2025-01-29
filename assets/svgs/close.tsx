import { useToken } from "native-base";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgNBProps } from "../../utils/types";

function Close(props: SvgNBProps) {
  const { fill = "blueGray.600" } = props;
  const fillColor = useToken<any>("colors", fill);

  return (
    <Svg width={17} height={17} viewBox="0 0 17 17" {...props} fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.56 5.692a.75.75 0 0 1 1.06-1.06l2.728 2.727 2.725-2.725a.75.75 0 0 1 1.06 1.06L9.409 8.42l2.724 2.723a.75.75 0 0 1-1.06 1.061L8.347 9.48l-2.726 2.726a.75.75 0 1 1-1.06-1.06L7.286 8.42 4.56 5.692Z"
        fill={fillColor}
      />
    </Svg>
  );
}

export default Close;
