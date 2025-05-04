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
  const isPhoneDevice = deviceType === DeviceType.PHONE;
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

  const renderCross = cross ? (
    <TouchableScale onPress={goBack}>
      <YStack
        height={isPhoneDevice ? 28 : 42}
        width={isPhoneDevice ? 44 : 66}
        borderRadius={4}
        bg={"$secondPrimaryColor"}
        justifyContent="center"
        alignItems="center"
      >
        <Close
          height={isPhoneDevice ? 28 : 42}
          width={isPhoneDevice ? 28 : 42}
          fill={"#FFFFFF"}
        />
      </YStack>
    </TouchableScale>
  ) : (
    <></>
  );

  const renderBackOrCross = back ? (
    <TouchableScale onPress={goBack}>
      <YStack
        height={isPhoneDevice ? 24 : 36}
        width={isPhoneDevice ? 24 : 36}
        p={4}
        alignItems="center"
        justifyContent="center"
      >
        <Image
          key={"backArrow"}
          source={images.backArrow}
          style={{
            height: isPhoneDevice ? 18 : 27,
            width: isPhoneDevice ? 18 : 27,
            tintColor: "#1c2e4a",
          }}
          alt={"back arrow"}
        />
      </YStack>
    </TouchableScale>
  ) : (
    renderCross
  );

  return (
    <XStack alignItems={profileElement ? "flex-start" : "center"}>
      <YStack minWidth={isPhoneDevice ? 40 : 60} alignItems="flex-start">
        {leftElement || renderBackOrCross}
      </YStack>
      <YStack flex={1} alignItems="center" mt={profileElement ? "$-2" : 0}>
        {profileElement}
        <XStack
          alignItems="center"
          justifyContent="center"
          mx={isPhoneDevice ? "$2" : "$3"}
        >
          {titleLeftIcon}
          {customTitle ? (
            <>{customTitle}</>
          ) : (
            <SizableText
              fontWeight={"$bold700"}
              color={"$secondPrimaryColor"}
              numberOfLines={titleNumberOfLines}
              ellipsizeMode={titleEllipsizeMode}
              fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
              lineHeight={isPhoneDevice ? 22 : 34}
            >
              {title}
            </SizableText>
          )}
        </XStack>
        <XStack alignItems="center">
          {subTitleLeftIcon || <></>}
          {subTitle && subTitleLeftIcon && (
            <YStack w={isPhoneDevice ? "$1" : "$2"} />
          )}
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
      <YStack minWidth={isPhoneDevice ? 40 : 60} alignItems="flex-end">
        {rightElement || <></>}
      </YStack>
    </XStack>
  );
}

export default HeaderBar;
