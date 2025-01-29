import { InterfaceInputProps } from "native-base/lib/typescript/components/primitives/Input/types";
import React, { forwardRef, useState } from "react";
import { Input, InputProps, XStack, YStack } from "tamagui";
import { SHADOW } from "../../../tamagui.config";

export type BasicInputProps = InputProps & {
  hideShadow?: boolean;
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
  errorElement?: JSX.Element;
  testID?: string;
};

function BasicInput(props: BasicInputProps, ref: InterfaceInputProps["ref"]) {
  const [focus, setFocus] = useState(false);
  const {
    onFocus,
    onBlur,
    height = 48,
    color = "$blueGray.700",
    bg = "$white",
    fontSize = "$md",
    fontFamily = "$body",
    fontWeight = "$medium",
    placeholderTextColor = "$blueGray.400",
    hideShadow = false,
    focusStyle = {
      bg: "$white",
      color: "$blueGray.700",
      outlineWidth: 0,
    },
    leftElement,
    rightElement,
    editable = true,
    errorElement,
    testID,
    ...textInputProps
  } = props;
  let inputShadow = {};

  if (hideShadow) {
    inputShadow = {};
  } else {
    if (focus) {
      inputShadow = SHADOW.input;
    }
  }
  return (
    <>
      <XStack
        bg={bg}
        borderRadius={16}
        borderWidth={focus && !hideShadow ? 1 : 0}
        borderColor={"$blueGray.100"}
        {...inputShadow}
      >
        {leftElement ? (
          <YStack justifyContent="center">{leftElement}</YStack>
        ) : (
          <></>
        )}
        <Input
          testID={testID}
          f={1}
          ref={ref}
          onFocus={(e) => {
            setFocus(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocus(false);
            onBlur?.(e);
          }}
          borderWidth={0}
          minHeight={height}
          color={color}
          focusStyle={focusStyle}
          fontSize={fontSize}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          editable={editable}
          placeholderTextColor={placeholderTextColor}
          borderRadius={16}
          px={"$4"}
          style={{
            includeFontPadding: false,
          }}
          {...textInputProps}
        />
        {rightElement ? (
          <YStack justifyContent="center">{rightElement}</YStack>
        ) : (
          <></>
        )}
      </XStack>
      {errorElement}
    </>
  );
}

export default forwardRef(BasicInput);
