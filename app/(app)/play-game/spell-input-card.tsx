import React from "react";
import { SizableText, XStack, YStack } from "tamagui";
import { SpellInputs } from "../../../modals/spell-inputs.model";
import { SHADOW } from "@design-system/utils/constants";
import images from "@assets/images/images";
import { Image } from "react-native";

function SpellInputCard({
  item,
}: Readonly<{
  item: SpellInputs;
}>) {

  const getBGColor = () => {
    if (item?.status === "DUPLICATE") {
      return "$yellow.500"
    }


    if (item?.status === "CORRECT") {
      return "$green.500"
    }

    if (item?.status === "WRONG") {
      return "$red.500"
    }
  }

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
  }


  return (
    <YStack
      bg={getBGColor()}
      alignItems="center"
      justifyContent="center"
      alignSelf="center"
      borderRadius={8}
      px={"$2"}
      ml={"$2"}
      mt={"$3"}
      height={25}
      borderColor={"$white"}
      borderWidth={1}
      {...SHADOW.basicCard}
    >
      <XStack alignItems="center">
        <Image
          key={"help"}
          source={getStatusImage()}
          style={{ height: 12, width: 12 }}
          alt={"help"}
        />
        <YStack w={"$1"} />
        <SizableText
          fontSize={"$xs"}
          color={item?.status === "CORRECT" ? "$white" : "$white"}
          fontWeight={"700"}
        >
          {item?.inputValue}
        </SizableText>
      </XStack>
    </YStack>
  );
}

export default SpellInputCard;
