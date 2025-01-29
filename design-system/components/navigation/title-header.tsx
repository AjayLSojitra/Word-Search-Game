import React from "react";
import { SizableText, XStack, YStack } from "tamagui";

export type TitleHeaderProps = {
  title: string;
  subTitle?: string;
  titleCTA?: JSX.Element;
};

function TitleHeader(props: TitleHeaderProps) {
  const { title, subTitle, titleCTA } = props;

  return (
    <XStack>
      <YStack flex={1} space={"$1"}>
        <SizableText
          fontSize={"$hmd"}
          fontWeight={"$semibold"}
          color={"$blueGray.800"}
        >
          {title}
        </SizableText>
        {subTitle ? (
          <SizableText
            fontSize={"$sm"}
            fontWeight={"$medium"}
            color={"$blueGray.600"}
          >
            {subTitle}
          </SizableText>
        ) : (
          <></>
        )}
      </YStack>
      {titleCTA}
    </XStack>
  );
}

export default TitleHeader;
