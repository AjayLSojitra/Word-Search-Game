import React from "react";
import { YStack, SizableText } from "tamagui";
import ErrorIcon from "../../../assets/svgs/error-icon";
import ResponsiveContent from "./responsive-content";
import SecondaryButton from "@design-system/components/buttons/secondary-button";

type ErrorPlaceholderProps = {
  title: string;
  description: string;
  buttonTitle: string;
  onPress: () => void;
};

function ErrorPlaceholder(props: ErrorPlaceholderProps) {
  const { title, description, buttonTitle, onPress } = props;

  return (
    <ResponsiveContent flex={1}>
      <YStack mx={"$8"} flex={1} justifyContent="center" alignItems="center">
        <ErrorIcon height={32} width={32} fill={"blueGray.500"} />
        <SizableText
          fontSize={"$hxs"}
          color={"$blueGray.500"}
          fontWeight={"$semibold"}
          textAlign="center"
        >
          {title}
        </SizableText>
        <SizableText
          fontSize={"$xs"}
          color={"$blueGray.500"}
          fontWeight={"$medium"}
          textAlign="center"
        >
          {description}
        </SizableText>
        <YStack h={"$4"} />
        <SecondaryButton width={140} onPress={onPress}>
          {buttonTitle}
        </SecondaryButton>
      </YStack>
    </ResponsiveContent>
  );
}

export default ErrorPlaceholder;
