import { useToken } from "native-base";
import { Stack } from "@tamagui/core";
import React from "react";
import { OpaqueColorValue } from "react-native";
import {
  ThemeValueFallback,
  ColorTokens,
  FontLetterSpacingTokens,
  SizableText,
} from "tamagui";

export type ListItemProps = {
  title: string;
  description?: string;
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
  disabled?: boolean;
  titleColor?: ThemeValueFallback | ColorTokens | OpaqueColorValue;
  descriptionColor?: ThemeValueFallback | ColorTokens | OpaqueColorValue;
  descriptionFontWeight?: "$normal" | "$medium" | "$semibold";
  titleFontWeight?: "$normal" | "$medium" | "$semibold" | "900";
  titleSize?: "$hxs" | "$hsm" | "$2xs";
  descriptionSize?: "$xs" | "$2xs" | "$hxs";
  opacity?: number;
  descriptionTextTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  titleTextTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  descriptionNumberOfLines?: number;
  descriptionAdjustsFontSizeToFit?: boolean;
  listItemPX?: "$1" | 0;
  titleLetterSpacing?: FontLetterSpacingTokens;
  selectable?: boolean;
  titleLineHeight?: number;
  descriptionLineHeight?: number;
};

function ListItem(props: Readonly<ListItemProps>) {
  const {
    title,
    description,
    leftElement = null,
    rightElement = null,
    disabled,
    titleColor = "blueGray.600",
    titleFontWeight = "$semibold",
    descriptionColor = "blueGray.500",
    titleSize = "$hxs",
    descriptionSize = "$xs",
    descriptionFontWeight = "$medium",
    descriptionTextTransform = "capitalize",
    titleTextTransform = "none",
    opacity,
    descriptionNumberOfLines,
    descriptionAdjustsFontSizeToFit = false,
    listItemPX = "$1",
    titleLetterSpacing,
    selectable = false,
    titleLineHeight,
    descriptionLineHeight,
  } = props;
  const titleColorValue = useToken<any>("colors", titleColor);
  const descriptionColorValue = useToken<any>("colors", descriptionColor);

  return (
    <Stack
      flexDirection={"row"}
      px={listItemPX}
      alignItems={"center"}
      opacity={opacity ?? (disabled ? 0.5 : 1)}
    >
      {leftElement}
      <Stack flex={1} pl={leftElement ? "$3" : 0} pr={leftElement ? "$3" : 0}>
        <SizableText
          fontSize={titleSize}
          fontWeight={titleFontWeight}
          color={titleColorValue}
          numberOfLines={1}
          letterSpacing={titleLetterSpacing}
          textTransform={titleTextTransform}
          allowFontScaling={false}
          selectable={selectable}
          lineHeight={titleLineHeight}
        >
          {title}
        </SizableText>
        {description != null && (
          <SizableText
            fontSize={descriptionSize}
            fontWeight={descriptionFontWeight}
            color={descriptionColorValue}
            allowFontScaling={false}
            textTransform={descriptionTextTransform}
            numberOfLines={descriptionNumberOfLines}
            adjustsFontSizeToFit={descriptionAdjustsFontSizeToFit}
            lineHeight={descriptionLineHeight}
          >
            {description}
          </SizableText>
        )}
      </Stack>
      {rightElement}
    </Stack>
  );
}

export default ListItem;
