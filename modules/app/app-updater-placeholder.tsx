import React from "react";
import { YStack, SizableText } from "tamagui";
import lotties from "@assets/lotties/lotties";
import LottieWrapper from "../shared/components/lottie-wrapper";
import ResponsiveContent from "../shared/components/responsive-content";
import useResponsiveWidth from "../shared/hooks/useResponsiveWidth";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButton from "@design-system/components/buttons/primary-button";

function AppUpdaterPlaceholder(props: {
  title: string;
  description: string;
  onPress: () => void;
}) {
  const { title, description, onPress } = props;
  const responsiveWidth = useResponsiveWidth();
  const insets = useSafeAreaInsets();

  return (
    <YStack
      flex={1}
      bg={"$white"}
      alignItems="center"
      testID="version-restriction-provider"
    >
      <ResponsiveContent>
        <YStack alignItems="center">
          <LottieWrapper
            width={responsiveWidth}
            height={responsiveWidth}
            source={lotties.forceUpdateAnimation}
            loop={true}
            webProps={{
              options: {
                loop: true,
                autoplay: true,
                animationData: lotties.forceUpdateAnimation,
              },
              width: responsiveWidth,
            }}
          />
        </YStack>
      </ResponsiveContent>
      <YStack h={"$10"} />
      <YStack mx={"$6"}>
        <SizableText
          fontSize={"$hmd"}
          textAlign="center"
          color={"$blueGray.700"}
          fontWeight={"$semibold"}
        >
          {title}
        </SizableText>
        <YStack h={"$2"} />
        <ResponsiveContent>
          <SizableText
            fontSize={"$sm"}
            textAlign="center"
            color={"$blueGray.500"}
          >
            {description}
          </SizableText>
        </ResponsiveContent>
      </YStack>
      <YStack flex={1} />
      <YStack bg={"$white"} pb={insets.bottom}>
        <YStack h={1} bg={"$blueGray.100"} />
        <ResponsiveContent>
          <YStack mx={"$4"} mt={"$4"}>
            <PrimaryButton onPress={onPress} disabled={false}>
              Update
            </PrimaryButton>
            <YStack h={"$2"} />
          </YStack>
        </ResponsiveContent>
      </YStack>
    </YStack>
  );
}

export default AppUpdaterPlaceholder;
