import React from "react";
import { SizableText, YStack } from "tamagui";

interface Props {
    index?: number
    selectedIndex?: number
    value: string
    onPress: () => void;
}

export const SBTextItem: React.FC<Props> = ({ selectedIndex, index, value, onPress }) => {
    const isSelected = selectedIndex === index;
    return (
        <YStack
            flex={1}
            justifyContent="center"
            alignItems="center"
            borderRadius={8}
            borderWidth={1}
            borderColor={isSelected ? "#a6897e" : "$white"}
            backgroundColor={isSelected ? "white" : "#a6897e"}
            onPress={onPress}
        >
            {typeof index === "number" &&
                <SizableText
                    fontSize={"$hmd"}
                    fontWeight={"$bold900"}
                    color={isSelected ? "$secondPrimaryColor" : "$white"}
                >
                    {value ?? ""}
                </SizableText>
            }
        </YStack>
    );
};