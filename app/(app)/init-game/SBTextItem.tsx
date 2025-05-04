import { DeviceType, deviceType } from "expo-device";
import React from "react";
import { SizableText, YStack } from "tamagui";

interface Props {
  index?: number;
  selectedIndex?: number;
  value: string;
  onPress: () => void;
}

const SBTextItem: React.FC<Props> = ({
  selectedIndex,
  index,
  value,
  onPress,
}) => {
  const isSelected = selectedIndex === index;
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      borderRadius={8}
      borderWidth={1}
      borderColor={isSelected ? "#1c2e4a" : "$white"}
      backgroundColor={isSelected ? "white" : "#1c2e4a"}
      onPress={onPress}
    >
      {typeof index === "number" && (
        <SizableText
          fontSize={isPhoneDevice ? "$hmd" : "$hlg"}
          lineHeight={isPhoneDevice ? 30 : 40}
          fontWeight={"$bold900"}
          color={isSelected ? "$secondPrimaryColor" : "$white"}
        >
          {value ?? ""}
        </SizableText>
      )}
    </YStack>
  );
};

export default SBTextItem;
