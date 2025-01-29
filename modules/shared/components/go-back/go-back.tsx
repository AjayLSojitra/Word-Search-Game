import React from "react";
import { YStack } from "tamagui";
import { HIT_SLOP } from "@utils/theme";
import useGoBack from "@modules/shared/hooks/use-go-back";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import images from "@assets/images/images";
import { Image } from "react-native";

function GoBack(props: Readonly<{
  onPress?: () => void;
  fallbackLink?: string;
  removeML?: boolean;
  icon?: any;
}>) {
  const { onPress, fallbackLink, removeML = false, icon = null } = props;
  const goBack = useGoBack();
  const navLink = fallbackLink ? fallbackLink : '/home';
  return (
    <YStack alignSelf={"flex-start"} ml={removeML ? null : "$3"}>
      <TouchableScale
        hitSlop={HIT_SLOP}
        onPress={() => {
          onPress ? onPress() : goBack(navLink);
        }}
        testID="go-back-button"
      >
        <Image
          key={"backArrow"}
          source={icon ?? images.backArrow}
          style={{ height: 24, width: 24 }}
          alt={"back arrow"}
        />
      </TouchableScale>
    </YStack>
  );
}

export default GoBack;
