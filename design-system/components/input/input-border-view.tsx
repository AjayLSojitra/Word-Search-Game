import React from "react";
import { YStack, YStackProps } from "tamagui";

function InputBorderView(props: YStackProps) {
  return <YStack {...props} borderWidth={1} borderColor={"$borderColor"} borderRadius={12} />;
}

export default InputBorderView;
