import React from "react";
import TouchableScale from "../shared/touchable-scale";
import { SizableText, XStack } from "tamagui";

export type TitleCtaProps = {
  title?: string;
  icon?: JSX.Element;
  titleSize?: "$sm" | "$xs";
  onPress?: () => void;
  testID?: string;
};

function TitleCta(props: TitleCtaProps) {
  const { title, icon, titleSize = "$sm", onPress, testID } = props;

  return (
    <TouchableScale disabled={!onPress} onPress={onPress} testID={testID}>
      <XStack space={"$1"} alignItems="center">
        <SizableText
          fontSize={titleSize}
          color={"$info.600"}
          fontWeight={"$medium"}
        >
          {title}
        </SizableText>
        {icon}
      </XStack>
    </TouchableScale>
  );
}

export default TitleCta;
