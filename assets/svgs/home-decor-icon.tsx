import React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import { SvgNBProps } from "@utils/types";

function HomeDecorIcon(props: SvgNBProps) {
  return (
    <Svg
      height={44}
      width={44}
      viewBox="0 0 52.03 52.03"
      {...props}
      fill="none"
    >
      <Path
        d="M48 48.015L48 51.015"
        fill="none"
        stroke="#c7cac7"
        strokeWidth={2}
        strokeLinecap="round"
        strokeMiterlimit={10}
      />
      <Path
        d="M47 51.015L49 51.015"
        fill="none"
        stroke="#c7cac7"
        strokeWidth={2}
        strokeLinecap="round"
        strokeMiterlimit={10}
      />
      <Path
        d="M4 48.015L4 51.015"
        fill="none"
        stroke="#c7cac7"
        strokeWidth={2}
        strokeLinecap="round"
        strokeMiterlimit={10}
      />
      <Path
        d="M3 51.015L5 51.015"
        fill="none"
        stroke="#c7cac7"
        strokeWidth={2}
        strokeLinecap="round"
        strokeMiterlimit={10}
      />
      <Path
        d="M52 33.015v-13.08a.92.92 0 00-.92-.92h-8.16a.92.92 0 00-.92.92v13.08H10v-13.08a.92.92 0 00-.92-.92H.92a.92.92 0 00-.92.92v23.08h52.03v-10H52z"
        fill="#1bb4bf"
      />
      <Path
        d="M10 19.935v13.08h32v-13.08a.92.92 0 01.92-.92H46V1.638c0-.897-.727-1.623-1.623-1.623H7.623C6.727.015 6 .742 6 1.638v17.377h3.08a.92.92 0 01.92.92z"
        fill="#19c8e0"
      />
      <Path d="M10 24.015H42V33.015H10z" fill="#118793" />
      <Path d="M46 43.015H50V48.015H46z" fill="#839594" />
      <Path d="M2 43.015H6V48.015H2z" fill="#839594" />
      <Circle cx={23} cy={6.015} r={1} fill="#57f7e4" />
      <Circle cx={29} cy={6.015} r={1} fill="#57f7e4" />
      <Circle cx={14} cy={9.015} r={1} fill="#57f7e4" />
      <Circle cx={14} cy={15.015} r={1} fill="#57f7e4" />
      <Circle cx={17} cy={12.015} r={1} fill="#57f7e4" />
      <Circle cx={20} cy={9.015} r={1} fill="#57f7e4" />
      <Circle cx={26} cy={9.015} r={1} fill="#57f7e4" />
      <Circle cx={20} cy={15.015} r={1} fill="#57f7e4" />
      <Circle cx={26} cy={15.015} r={1} fill="#57f7e4" />
      <Circle cx={23} cy={12.015} r={1} fill="#57f7e4" />
      <Circle cx={29} cy={12.015} r={1} fill="#57f7e4" />
      <Circle cx={23} cy={18.015} r={1} fill="#57f7e4" />
      <Circle cx={29} cy={18.015} r={1} fill="#57f7e4" />
      <Circle cx={32} cy={9.015} r={1} fill="#57f7e4" />
      <Circle cx={38} cy={9.015} r={1} fill="#57f7e4" />
      <Circle cx={32} cy={15.015} r={1} fill="#57f7e4" />
      <Circle cx={38} cy={15.015} r={1} fill="#57f7e4" />
      <Circle cx={35} cy={12.015} r={1} fill="#57f7e4" />
    </Svg>
  );
}

export default HomeDecorIcon;
