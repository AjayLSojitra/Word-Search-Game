import React from "react";
import {
  GestureResponderEvent,
  OpaqueColorValue,
  StyleSheet,
} from "react-native";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { ColorTokens, XStack, YStack } from "tamagui";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import { SHADOW } from "@design-system/utils/constants";

export type BasicButtonProps = {
  disabled?: boolean;
  hideShadow?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  icon?: JSX.Element;
  children?: JSX.Element;
  linearGradientProps?: LinearGradientProps;
  pressedLinearGradientProps?: LinearGradientProps;
  disabledLinearGradientProps?: LinearGradientProps;
  locations?: Array<number>;
  height?: number;
  width?: number;
  backgroundColor?: ColorTokens | OpaqueColorValue;
  borderColor?: ColorTokens | OpaqueColorValue | string;
  rightIcon?: JSX.Element;
  testID?: string;
  gradientOpacity?: number;
  bgColor?: string;
};

function BasicButton(props: BasicButtonProps) {
  const {
    onPress,
    icon,
    children,
    linearGradientProps,
    height = 41,
    width,
    disabled,
    borderColor,
    rightIcon,
    testID,
    hideShadow = false, // hideShadow = disabled
    pressedLinearGradientProps = linearGradientProps,
    disabledLinearGradientProps = linearGradientProps,
    gradientOpacity = 1,
    bgColor = "$white"
  } = props;

  return (
    <TouchableScale
      testID={testID}
      accessibilityLabel={disabled ? `${testID}-disabled` : testID}
      onPress={onPress}
      disabled={disabled}
    >
      {({ pressed, hovered }) => {
        const disabledOrDefaultGradientProps = disabled
          ? disabledLinearGradientProps
          : linearGradientProps;
        const gradientProps =
          pressed || hovered
            ? pressedLinearGradientProps
            : disabledOrDefaultGradientProps;

        return (
          <YStack
            borderRadius={8}
            bg={bgColor}
            {...(hideShadow || pressed || disabled ? {} : SHADOW.button)}
          >
            <YStack
              height={height}
              width={width}
              borderRadius={8}
              borderWidth={borderColor ? 1 : 0}
              borderColor={borderColor}
              bg={bgColor}
              {...(hideShadow || pressed ? {} : SHADOW.button)}
            >
              <LinearGradient
                {...gradientProps}
                style={[
                  StyleSheet.absoluteFill,
                  {
                    opacity: gradientOpacity,
                    borderRadius: 8,
                  },
                ]}
              />

              <XStack flex={1} alignItems={"center"} px={5.5}>
                {icon ? <YStack w={32}>{icon}</YStack> : <></>}
                <YStack flex={1} alignItems={"center"}>
                  {children}
                </YStack>
                {rightIcon ? <YStack w={32}>{rightIcon}</YStack> : <></>}
              </XStack>
            </YStack>
          </YStack>
        );
      }}
    </TouchableScale>
  );
}

export default BasicButton;
