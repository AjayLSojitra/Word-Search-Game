import React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import { SvgNBProps } from "@utils/types";

function MusicalInstrumentsIcon(props: SvgNBProps) {
  return (
    <Svg
      height={44}
      width={44}
      viewBox="0 0 512.001 512.001"
      {...props}
      fill="none"
    >
      <Path
        d="M276.093 471.306c-60.655 60.655-161.016 50.847-223.633-11.771-65.599-65.599-69.836-165.568-11.771-223.633 29.112-29.112 69.522-43.158 112.915-39.628 4.003-21.263 13.654-39.861 28.327-54.534 36.331-36.331 96.752-41.039 146.814-11.378l-3.217 56.104-3.531 62.382c5.728 21.422 25.816 37.743 48.807 37.036.078-.078.078-.078.156 0 13.027 0 20.951 14.202 14.203 25.345-14.673 23.777-38.45 41.273-69.443 47.16 3.531 43.395-10.516 83.805-39.627 112.917z"
        fill="#e6563a"
      />
      <Path
        d="M276.093 471.306c-60.655 60.655-161.016 50.847-223.633-11.771l273.068-273.068-3.531 62.382c5.728 21.422 25.816 37.743 48.807 37.036.078-.078.078-.078.156 0 13.027 0 20.951 14.202 14.203 25.345-14.673 23.777-38.45 41.273-69.443 47.16 3.531 43.394-10.516 83.804-39.627 112.916z"
        fill="#d9472b"
      />
      <Circle cx={134.851} cy={424.23} r={16.646} fill="#dae1e6" />
      <Circle cx={229.01} cy={424.23} r={16.646} fill="#dae1e6" />
      <Path
        transform="rotate(-134.999 303.564 208.44)"
        d="M253.626 86.373H353.498V330.50600000000003H253.626z"
        fill="#736056"
      />
      <Path
        d="M501.258 112.719l-76.127 44.721-35.288-35.289-35.288-35.29 44.721-76.126c14.314-14.315 37.507-14.315 51.822 0l50.159 50.159c14.316 14.317 14.316 37.51.001 51.825z"
        fill="#e6563a"
      />
      <Path
        d="M501.258 112.719l-76.127 44.721-35.288-35.289 86.335-86.335 25.079 25.079c14.316 14.316 14.316 37.509.001 51.824z"
        fill="#d9472b"
      />
      <Path
        transform="rotate(45.001 321.216 226.099)"
        d="M296.244 104.035H346.18V348.168H296.244z"
        fill="#665247"
      />
      <Path
        d="M197.625 369.298l-54.927-54.927c-6.498-6.498-6.502-17.038 0-23.54 6.502-6.502 17.042-6.498 23.54 0l54.927 54.927c6.498 6.498 6.502 17.038 0 23.54-6.502 6.502-17.042 6.498-23.54 0z"
        fill="#736056"
      />
      <Path
        d="M221.165 345.757l-27.464-27.464-23.54 23.54 27.464 27.464c6.498 6.498 17.038 6.502 23.54 0 6.502-6.501 6.499-17.041 0-23.54z"
        fill="#665247"
      />
    </Svg>
  );
}

export default MusicalInstrumentsIcon;
