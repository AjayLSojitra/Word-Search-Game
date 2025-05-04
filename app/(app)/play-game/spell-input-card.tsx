import React from "react";
import { SizableText, XStack, YStack } from "tamagui";
import { SpellInputs } from "../../../modals/spell-inputs.model";
import { SHADOW } from "@design-system/utils/constants";
import images from "@assets/images/images";
import { Image } from "react-native";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import { DeviceType, deviceType } from "expo-device";

function SpellInputCard({
  item,
  onPress,
}: Readonly<{
  item: SpellInputs;
  onPress: () => void;
}>) {
  const isPhoneDevice = deviceType === DeviceType.PHONE;
  const getBGColor = () => {
    if (item?.status === "DUPLICATE") {
      return "$yellow.500";
    }

    if (item?.status === "CORRECT") {
      return "$green.500";
    }

    if (item?.status === "WRONG") {
      return "$red.500";
    }
  };

  const getStatusImage = () => {
    if (item?.status === "DUPLICATE") {
      return images.repeat;
    }

    if (item?.status === "CORRECT") {
      return images.correct;
    }

    if (item?.status === "WRONG") {
      return images.wrong;
    }
  };

  return (
    <YStack
      bg={getBGColor()}
      alignItems="center"
      justifyContent="center"
      alignSelf="center"
      borderRadius={8}
      px={isPhoneDevice ? "$2" : "$3"}
      ml={isPhoneDevice ? "$2" : "$3"}
      mt={isPhoneDevice ? "$3" : "$5"}
      height={isPhoneDevice ? 25 : 37}
      borderColor={"$white"}
      borderWidth={1}
      {...SHADOW.basicCard}
    >
      <TouchableScale onPress={onPress}>
        <XStack alignItems="center">
          <Image
            key={"help"}
            source={getStatusImage()}
            style={{
              height: isPhoneDevice ? 12 : 18,
              width: isPhoneDevice ? 12 : 18,
            }}
            alt={"help"}
          />
          <YStack w={isPhoneDevice ? "$1" : "$1.5"} />
          <SizableText
            fontSize={isPhoneDevice ? "$xs" : "$lg"}
            lineHeight={isPhoneDevice ? 20 : 26}
            color={item?.status === "CORRECT" ? "$white" : "$white"}
            fontWeight={"700"}
          >
            {item?.inputValue}
          </SizableText>
          <YStack w={isPhoneDevice ? "$1" : "$1.5"} />
          <Image
            key={"copy"}
            source={images.copy}
            style={{
              height: isPhoneDevice ? 12 : 18,
              width: isPhoneDevice ? 12 : 18,
              tintColor: "#ffffff",
            }}
            alt={"copy"}
          />
        </XStack>
      </TouchableScale>
    </YStack>
  );
}

export default SpellInputCard;
