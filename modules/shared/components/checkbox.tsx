import React from "react";
import images from "@assets/images/images";
import { Image } from "react-native";
import TouchableScale from "@design-system/components/shared/touchable-scale";

function Checkbox(props: {
  status: boolean;
  disabled?: boolean;
  isFillCheckbox?: boolean;
  onStatusChange?: (status: boolean) => void;
  type?: "SQUARE" | "CIRCLE";
  size?: number;
}) {
  const {
    status,
    onStatusChange,
    disabled = false,
    isFillCheckbox = false,
    type = "CIRCLE",
    size = 24,
  } = props;
  return (
    <TouchableScale
      onPress={
        onStatusChange
          ? () => {
              onStatusChange(!status);
            }
          : undefined
      }
      disabled={!onStatusChange || disabled}
    >
      <></>
      {/* <Image
        key={status ? 1 : 0}
        source={
          type === "CIRCLE"
            ? disabled
              ? images.checkDisabled
              : status
              ? isFillCheckbox
                ? images.fillCheckSelected
                : images.checkSelected
              : images.checkUnselected
            : disabled
            ? images.squareCheckDisabled
            : status
            ? images.squareCheckSelected
            : images.squareCheckUnselected
        }
        style={{ height: size, width: size }}
        resizeMode={"contain"}
        alt={"switch"}
        {...props}
      /> */}
    </TouchableScale>
  );
}

export default Checkbox;
