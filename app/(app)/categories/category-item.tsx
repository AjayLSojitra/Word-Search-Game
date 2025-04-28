import React from "react";
import { SizableText, YStack } from "tamagui";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import { SvgNBProps } from "@utils/types";

export type CategoryItemProps = {
  category: string;
  icon?: (props: SvgNBProps) => JSX.Element;
  onPress: () => void;
};

function CategoryItem(props: CategoryItemProps) {
  const { onPress, category } = props;

  return (
    <TouchableScale
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
        backgroundColor: "#1c2e4a",
        padding: 12,
        borderRadius: 8,
      }}
    >
      <YStack alignItems="center" justifyContent="center">
        {props.icon && <props.icon />}
        <YStack h={"$2"} />
        <SizableText
          fontSize={"$sm"}
          fontWeight={"$semibold"}
          color={"$white"}
          adjustsFontSizeToFit
          textAlign="center"
          lineHeight={18}
        >
          {category}
        </SizableText>
      </YStack>
    </TouchableScale>
  );
}

export default CategoryItem;
