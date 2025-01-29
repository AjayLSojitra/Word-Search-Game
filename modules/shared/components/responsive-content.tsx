import React from "react";
import { YStack, YStackProps } from "tamagui";
import useResponsiveWidth from "../hooks/useResponsiveWidth";

function ResponsiveContent(props: YStackProps) {
  const responsiveWidth = useResponsiveWidth();

  return <YStack {...props} width={responsiveWidth} alignSelf={'center'} />;
}

export default ResponsiveContent;
