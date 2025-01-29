import Toast from "react-native-toast-message";
import Checkmark from "@assets/svgs/checkmark";
import ErrorIcon from "@assets/svgs/error-icon";
import { SvgNBProps } from "./types";
import { ColorTokens, Text, XStack, YStack } from "tamagui";
import useResponsiveWidth from "../modules/shared/hooks/useResponsiveWidth";
import { SHADOW } from "../tamagui.config";
import React, { useEffect } from "react";
import { OpaqueColorValue } from "react-native";
import { HIT_SLOP } from "./theme";
import { useSetConfettiState } from "@modules/shared/atoms/confetti-atom";
import TouchableScale from "@design-system/components/shared/touchable-scale";

type ToastViewProps = {
  Icon: (props: SvgNBProps) => JSX.Element;
  title: string;
  bg?: ColorTokens | OpaqueColorValue;
  onPress?: () => void;
  buttonTitle?: string;
  showConfetti?: boolean;
};

function ToastView(props: ToastViewProps) {
  const { Icon, title, bg, onPress, buttonTitle, showConfetti } = props;
  const responsiveWidth = useResponsiveWidth();
  const setConfettiState = useSetConfettiState();

  useEffect(() => {
    if (showConfetti) {
      setConfettiState({ value: true });
    }
  }, [showConfetti]);

  return (
    <TouchableScale
      onPress={
        onPress
          ? () => {
            Toast.hide();
            onPress();
          }
          : undefined
      }
      hitSlop={HIT_SLOP}
    >
      <XStack
        alignItems={"center"}
        px={"$3"}
        bg={bg}
        w={responsiveWidth - 32}
        h={48}
        borderRadius={12}
        {...SHADOW.basicCard}
      >
        <Icon fill={"white"} />
        <YStack w={"$3"} />
        <YStack flex={1}>
          <Text
            fontFamily={"$body"}
            fontWeight={"$medium"}
            fontSize={"$xs"}
            color={"$white"}
          >
            {title}
          </Text>
        </YStack>
        {onPress ? (
          <Text
            fontFamily={"$body"}
            fontWeight={"$medium"}
            fontSize={"$xs"}
            color={"$info.500"}
          >
            {buttonTitle ?? "View"}
          </Text>
        ) : (
          <></>
        )}
      </XStack>
    </TouchableScale>
  );
}

type ClarityToastViewProps = {
  clarityScore: number;
  previousClarityScore: number;
};

export { ToastView };

export const toastConfig: any = {
  base: (toastConfigProps: { props: ToastViewProps }) => {
    return <ToastView {...toastConfigProps.props} bg={"$blueGray.900"} />;
  },
};

export const showClarityToast = (
  clarityScore: number,
  previousClarityScore: number
) => {
  Toast.show({
    type: "clarity",
    position: "top",
    props: { clarityScore, previousClarityScore },
    visibilityTime: 3000,
  });
};

export const showNormalToast = (
  title: string,
  Icon: (props: SvgNBProps) => JSX.Element = Checkmark,
  onPress?: () => void,
  buttonTitle?: string,
  showConfetti?: boolean
) => {
  Toast.show({
    type: "base",
    position: "top",
    props: { title, Icon, onPress, buttonTitle, showConfetti, key: Date.now() },
    visibilityTime: onPress ? 5000 : 3000,
  });
};

export const showConfettiToast = (
  title: string,
  Icon: (props: SvgNBProps) => JSX.Element = Checkmark,
  onPress?: () => void,
  buttonTitle?: string
) => {
  showNormalToast(title, Icon, onPress, buttonTitle, true);
};

export const showErrorToast = (
  title: string,
  Icon: (props: SvgNBProps) => JSX.Element = ErrorIcon,
  onPress?: () => void,
  buttonTitle?: string
) => {
  showNormalToast(title, Icon, onPress, buttonTitle);
};
