import React from "react";
import Svg, { Path, Rect, SvgProps } from "react-native-svg";

function Google(props: SvgProps) {
  return (
    <Svg width={16} height={17} viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8.868c0-.576-.052-1.13-.148-1.661H8.164v3.142h4.393a3.736 3.736 0 01-1.629 2.451v2.039h2.638C15.11 13.424 16 11.342 16 8.869z"
        fill="#4285F4"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.163 16.807c2.204 0 4.052-.728 5.402-1.968L10.927 12.8c-.731.487-1.666.775-2.764.775-2.127 0-3.926-1.429-4.568-3.349H.868v2.105a8.164 8.164 0 007.295 4.475z"
        fill="#34A853"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.596 10.227a4.862 4.862 0 01-.256-1.543c0-.536.092-1.056.256-1.544V5.036H.868a8.088 8.088 0 000 7.296l2.728-2.105z"
        fill="#FBBC05"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.163 3.791c1.198 0 2.274.41 3.12 1.215l2.342-2.33C12.21 1.366 10.363.56 8.163.56A8.164 8.164 0 00.868 5.036L3.595 7.14c.642-1.92 2.441-3.349 4.568-3.349z"
        fill="#EA4335"
      />
    </Svg>
  );
}

export default Google;
