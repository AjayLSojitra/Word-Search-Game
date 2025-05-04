import React from "react";
import { SizableText, YStack } from "tamagui";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import { SvgNBProps } from "@utils/types";
import { DeviceType, deviceType } from "expo-device";

export type CategoryItemProps = {
  category: string;
  icon?: (props: SvgNBProps) => JSX.Element;
  onPress: () => void;
};

function CategoryItem(props: CategoryItemProps) {
  const { onPress, category } = props;
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <TouchableScale
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: isPhoneDevice ? 8 : 12,
        backgroundColor: "#1c2e4a",
        padding: isPhoneDevice ? 12 : 18,
        borderRadius: 8,
      }}
    >
      <YStack alignItems="center" justifyContent="center">
        {props.icon && (
          <props.icon
            height={isPhoneDevice ? 44 : 66}
            width={isPhoneDevice ? 44 : 66}
          />
        )}
        <YStack h={isPhoneDevice ? "$2" : "$3"} />
        <SizableText
          fontSize={isPhoneDevice ? "$sm" : "$xl"}
          lineHeight={isPhoneDevice ? 20 : 26}
          fontWeight={"$semibold"}
          color={"$white"}
          adjustsFontSizeToFit
          textAlign="center"
        >
          {category}
        </SizableText>
      </YStack>
    </TouchableScale>
  );
}

export default CategoryItem;
