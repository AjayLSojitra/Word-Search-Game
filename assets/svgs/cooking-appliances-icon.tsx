import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgNBProps } from "@utils/types";

function CookingApplicanesIcon(props: SvgNBProps) {
  return (
    <Svg height={44} width={44} viewBox="0 0 512 512" {...props} fill="none">
      <Path
        d="M59.171 512c-15.159 0-30.319-5.771-41.859-17.312-23.081-23.081-23.081-60.639 0-83.72l47.882-47.882 83.721 83.721-47.882 47.882C89.49 506.229 74.331 512 59.171 512zM446.807 148.913l-83.721-83.721 47.882-47.882c23.081-23.08 60.639-23.081 83.72 0 23.081 23.081 23.081 60.639 0 83.72l-47.881 47.883z"
        fill="#f0c838"
      />
      <Path
        d="M59.171 512c15.16 0 30.319-5.771 41.861-17.312l47.882-47.882-41.861-41.861-89.743 89.743C28.851 506.229 44.012 512 59.171 512zM404.946 107.053l41.861 41.861 47.882-47.882c23.081-23.081 23.081-60.639 0-83.72l-89.743 89.741z"
        fill="#e79c25"
      />
      <Path
        d="M155.879 501.001L10.997 356.119 356.12 10.998 501.001 155.88 155.879 501.001z"
        fill="#e79c25"
      />
      <Path
        d="M155.879 501.001l-72.44-72.44L428.56 83.438l72.44 72.44-345.121 345.123z"
        fill="#e0711b"
      />
    </Svg>
  );
}

export default CookingApplicanesIcon;
