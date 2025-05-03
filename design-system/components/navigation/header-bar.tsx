import React from "react";
import { SizableText, XStack, YStack } from "tamagui";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import Close from "@assets/svgs/close";
import images from "@assets/images/images";
import { Image } from "react-native";
import { DeviceType, deviceType } from "expo-device";

export type HeaderBarProps = {
  title?: string;
  subTitle?: string;
  titleLeftIcon?: JSX.Element;
  subTitleLeftIcon?: JSX.Element;
  back?: boolean;
  cross?: boolean;
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
  goBack?: () => void;
  titleSize?: "$hsm" | "$hmd" | string;
  profileElement?: JSX.Element;
  titleNumberOfLines?: number;
  titleEllipsizeMode?: "head" | "tail" | "middle" | "clip";
  customTitle?: JSX.Element;
};

function HeaderBar(props: Readonly<HeaderBarProps>) {
  const {
    title,
    titleLeftIcon,
    customTitle,
    leftElement,
    rightElement,
    back = true,
    cross,
    goBack,
    titleSize = "$hsm",
    subTitle,
    subTitleLeftIcon,
    profileElement,
    titleNumberOfLines,
    titleEllipsizeMode,
  } = props;

  const isPhoneDevice = deviceType === DeviceType.PHONE;

  const renderCross = cross ? (
    <TouchableScale onPress={goBack}>
      <YStack
        height={28}
        width={44}
        borderRadius={4}
        bg={"$secondPrimaryColor"}
        justifyContent="center"
        alignItems="center"
      >
        <Close height={28} width={28} fill={"#FFFFFF"} />
      </YStack>
    </TouchableScale>
  ) : (
    <></>
  );

  const renderBackOrCross = back ? (
    <TouchableScale onPress={goBack}>
      <YStack
        height={24}
        width={24}
        p={4}
        alignItems="center"
        justifyContent="center"
      >
        <Image
          key={"backArrow"}
          source={images.backArrow}
          style={{ height: 18, width: 18, tintColor: "#1c2e4a" }}
          alt={"back arrow"}
        />
      </YStack>
    </TouchableScale>
  ) : (
    renderCross
  );

  return (
    <XStack alignItems={profileElement ? "flex-start" : "center"}>
      <YStack minWidth={40} alignItems="flex-start">
        {leftElement || renderBackOrCross}
      </YStack>
      <YStack flex={1} alignItems="center" mt={profileElement ? "$-2" : 0}>
        {profileElement}
        <XStack alignItems="center" justifyContent="center" mx={"$2"}>
          {titleLeftIcon}
          {customTitle ? (
            <>{customTitle}</>
          ) : (
            <SizableText
              fontSize={titleSize}
              fontWeight={"$bold700"}
              color={"$secondPrimaryColor"}
              numberOfLines={titleNumberOfLines}
              ellipsizeMode={titleEllipsizeMode}
            >
              {title}
            </SizableText>
          )}
        </XStack>
        <XStack alignItems="center">
          {subTitleLeftIcon || <></>}
          {subTitle && subTitleLeftIcon && <YStack w={"$1"} />}
          {subTitle ? (
            <SizableText
              fontSize={isPhoneDevice ? "$xs" : "$lg"}
              lineHeight={isPhoneDevice ? 20 : 26}
              fontWeight={"$medium"}
              color={"$blueGray.500"}
            >
              {subTitle}
            </SizableText>
          ) : (
            <></>
          )}
        </XStack>
      </YStack>
      <YStack minWidth={40} alignItems="flex-end">
        {rightElement || <></>}
      </YStack>
    </XStack>
  );
}

export default HeaderBar;
