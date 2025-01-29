import React from "react";
import { SizableText, XStack, YStack } from "tamagui";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import Close from "@assets/svgs/close";
import images from "@assets/images/images";
import { Image } from "react-native";

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
};

function HeaderBar(props: HeaderBarProps) {
  const {
    title,
    titleLeftIcon,
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
      <YStack height={24} width={24} p={4} alignItems="center" justifyContent="center">
        <Close height={18} width={18} fill={"blueGray.700"} />
      </YStack>
    </TouchableScale>
  ) : (
    <></>
  );

  const renderBackOrCross = back ? (
    <TouchableScale onPress={goBack}>
      <YStack height={24} width={24} p={4} alignItems="center" justifyContent="center">
        <Image
          key={"backArrow"}
          source={images.backArrow}
          style={{ height: 18, width: 18, }}
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
        {leftElement ? leftElement : renderBackOrCross}
      </YStack>
      <YStack flex={1} alignItems="center" mt={profileElement ? "$-2" : 0}>
        {profileElement}
        <XStack alignItems="center" justifyContent="center" mx={"$2"}>
          {titleLeftIcon}
          <SizableText
            fontSize={titleSize}
            fontWeight={"$semibold"}
            color={"$white"}
            numberOfLines={titleNumberOfLines}
            ellipsizeMode={titleEllipsizeMode}
          >
            {title}
          </SizableText>
        </XStack>
        <XStack alignItems="center">
          {subTitleLeftIcon ? subTitleLeftIcon : <></>}
          {subTitle && subTitleLeftIcon && <YStack w={"$1"} />}
          {subTitle ? (
            <SizableText
              fontSize={"$xs"}
              fontWeight={"$medium"}
              color={"$blueGray.500"}
              lineHeight={18}
            >
              {subTitle}
            </SizableText>
          ) : (
            <></>
          )}
        </XStack>
      </YStack>
      <YStack minWidth={40} alignItems="flex-end">
        {rightElement ? rightElement : <></>}
      </YStack>
    </XStack>
  );
}

export default HeaderBar;
