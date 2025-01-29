import React from "react";
import BasicButton, {
  BasicButtonProps,
} from "@design-system/components/buttons/basic-button";
import { SizableText } from "tamagui";
import { GRADIENTS } from "@design-system/utils/constants";

export type PrimaryButtonProps = {
  children: string;
  onPress?: () => void;
  alt?: boolean;
  danger?: boolean;
} & Pick<
  BasicButtonProps,
  | "disabled"
  | "linearGradientProps"
  | "disabledLinearGradientProps"
  | "pressedLinearGradientProps"
  | "testID"
  | "height"
  | "width"
>;

function PrimaryButton(props: PrimaryButtonProps) {
  const {
    children,
    onPress,
    disabled,
    danger,
    linearGradientProps = danger ? GRADIENTS.danger : GRADIENTS.primary,
    pressedLinearGradientProps = danger
      ? GRADIENTS.dangerPressed
      : GRADIENTS.primaryPressed,
    disabledLinearGradientProps = GRADIENTS.primaryDisabled,
    alt = danger,
    testID,
    height = alt ? 41 : 48,
    width,
  } = props;

  return (
    <BasicButton
      height={height}
      width={width}
      onPress={onPress}
      linearGradientProps={linearGradientProps}
      pressedLinearGradientProps={pressedLinearGradientProps}
      disabledLinearGradientProps={disabledLinearGradientProps}
      disabled={disabled}
      testID={testID}
      gradientOpacity={disabled ? 0.4 : 1}
      hideShadow={alt}
    >
      <SizableText
        fontSize={alt ? "$sm" : "$md"}
        fontWeight={"$semibold"}
        color={"$white"}
      >
        {children}
      </SizableText>
    </BasicButton>
  );
}

export default PrimaryButton;
