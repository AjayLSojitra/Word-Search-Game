import { DeviceType, deviceType } from "expo-device";
import React from "react";
import { FlexAlignType, Platform, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, XStack, YStack } from "tamagui";

function AppBar({
  title = "",
  left,
  right,
  titleCustom,
  leftCustom,
  rightCustom,
  bgColor,
  paddingLeft = "$1",
  minHeight,
  alignItems,
}: {
  title?: string;
  left?: JSX.Element;
  paddingLeft?: number | string;
  right?: JSX.Element;
  titleCustom?: JSX.Element;
  leftCustom?: JSX.Element;
  rightCustom?: JSX.Element;
  bgColor?: string;
  minHeight?: number;
  alignItems?: FlexAlignType;
}) {
  const insets = useSafeAreaInsets();
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <XStack
      bg={bgColor}
      minHeight={
        minHeight ??
        (Platform.OS === "android"
          ? 100 - StatusBar.currentHeight
          : Platform.OS === "web"
          ? 60
          : 100)
      }
      alignItems={alignItems ?? "center"}
      px={paddingLeft}
      pt={minHeight === undefined ? insets.top : undefined}
    >
      {leftCustom ? (
        leftCustom
      ) : (
        <YStack w={64} alignItems={"flex-start"}>
          {left}
        </YStack>
      )}
      <YStack flex={1}>
        {titleCustom ? (
          titleCustom
        ) : (
          <Text
            textAlign={"center"}
            fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
            lineHeight={isPhoneDevice ? 22 : 34}
            fontWeight={"$semibold"}
            color={"$blueGray.700"}
            fontFamily={"$body"}
          >
            {title}
          </Text>
        )}
      </YStack>
      {rightCustom ? (
        rightCustom
      ) : (
        <YStack w={64} alignItems={"flex-end"}>
          {right}
        </YStack>
      )}
    </XStack>
  );
}

export default AppBar;
