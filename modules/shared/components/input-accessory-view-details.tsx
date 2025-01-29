import { InputAccessoryView, Keyboard } from "react-native";
import React from "react";
import { SizableText, YStack } from "tamagui";
import TouchableScale from "@design-system/components/shared/touchable-scale";

export type InputAccessoryViewiOSProps = {
  title: string;
};

function InputAccessoryViewiOS(props: InputAccessoryViewiOSProps) {
  const { title } = props;

  return (
    <InputAccessoryView nativeID="inputAccessoryView">
      <YStack
        borderWidth={1}
        borderColor={"$blueGray.100"}
        h={"$10"}
        bg={"white"}
        alignItems={"flex-end"}
        justifyContent={"center"}
      >
        <TouchableScale onPress={Keyboard.dismiss}>
          <YStack
            mr={"$2"}
            paddingVertical={4}
            paddingHorizontal={10}
            borderRadius={52}
            backgroundColor={"$blueGray.50"}
          >
            <SizableText
              fontSize={"$sm"}
              color={"$primary"}
              fontWeight={"$medium"}
              lineHeight={20}
            >
              {title}
            </SizableText>
          </YStack>
        </TouchableScale>
      </YStack>
    </InputAccessoryView>
  );
}

export default InputAccessoryViewiOS;
