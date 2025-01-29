import React from "react";
import BasicButton, {
  BasicButtonProps,
} from "@design-system/components/buttons/basic-button";
import { SizableText, YStack } from "tamagui";
import { GRADIENTS } from "@design-system/utils/constants";

export type SecondaryButtonProps = {
  children: string | JSX.Element;
  onPress?: () => void;
  alt?: boolean;
} & Pick<
  BasicButtonProps,
  | "disabled"
  | "linearGradientProps"
  | "disabledLinearGradientProps"
  | "pressedLinearGradientProps"
  | "height"
  | "width"
  | "testID"
  | "hideShadow"
>;

function SecondaryButton(props: SecondaryButtonProps) {
  const {
    children,
    onPress,
    disabled,
    alt = false,
    linearGradientProps = alt ? GRADIENTS.tertiary : GRADIENTS.secondary,
    pressedLinearGradientProps = alt
      ? GRADIENTS.tertiaryPressed
      : GRADIENTS.secondaryPressed,
    disabledLinearGradientProps = alt
      ? GRADIENTS.tertiaryDisabled
      : GRADIENTS.secondaryDisabled,
    height = 41,
    width,
    testID,
    hideShadow = !alt,
  } = props;

  return (
    <YStack opacity={alt ? 1 : disabled ? 0.4 : 1}>
      <BasicButton
        height={height}
        width={width}
        onPress={onPress}
        linearGradientProps={linearGradientProps}
        pressedLinearGradientProps={pressedLinearGradientProps}
        disabledLinearGradientProps={disabledLinearGradientProps}
        disabled={disabled}
        hideShadow={hideShadow}
        borderColor={alt ? undefined : "$blue.200"}
        testID={testID}
        gradientOpacity={alt && disabled ? 0.4 : 1}
      >
        {typeof children === "string" ? (
          <SizableText
            fontSize={"$sm"}
            fontWeight={"$medium"}
            color={alt ? "$text.50" : "$info.600"}
          >
            {children}
          </SizableText>
        ) : (
          children
        )}
      </BasicButton>
    </YStack>
  );
}

export default SecondaryButton;
