import React from "react";
import { SizableText, XStack, YStack } from "tamagui";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";
import { Modal } from "react-native";
import BasicButton from "@design-system/components/buttons/basic-button";
import ResponsiveContent from "@modules/shared/responsive-content";
import lotties from "@assets/lotties/lotties";
import LottieWrapper from "../lottie-wrapper";

type AdsConfirmationDialogProps = {
  onPositivePress?: () => void;
  onNegativePress?: () => void;
  showDialog: boolean;
  setChangeShowDialogStatus?: (value: boolean) => void;
  content: string;
};
function AdsConfirmationDialog(props: Readonly<AdsConfirmationDialogProps>) {
  const {
    onPositivePress,
    onNegativePress,
    showDialog = false,
    setChangeShowDialogStatus,
    content,
  } = props;
  const responsiveWidth = useResponsiveWidth();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showDialog}
      onRequestClose={() => {
        setChangeShowDialogStatus(!showDialog);
      }}
    >
      <YStack backgroundColor={"#rgba(33, 33, 33, 0.25)"} flex={1}>
        <ResponsiveContent
          alignItems="center"
          justifyContent="center"
          width={responsiveWidth}
          flex={1}
        >
          <YStack
            backgroundColor={"$white"}
            width={responsiveWidth - 40}
            p={"$4"}
            borderRadius={20}
            alignItems="center"
            justifyContent="center"
          >
            <SizableText
              color={"$secondPrimaryColor"}
              lineHeight={21.79}
              fontSize={"$hsm"}
              fontWeight={"400"}
              textAlign="center"
            >
              {content}
            </SizableText>
            <XStack alignContent="center" justifyContent="center">
              <LottieWrapper
                webProps={{
                  options: {
                    loop: true,
                    autoplay: true,
                    animationData: lotties.watchVideo,
                  },
                  height: 100,
                  width: 100,
                }}
                width={100}
                height={100}
                source={lotties.watchVideo}
                loop={true}
              />
            </XStack>
            <XStack>
              <BasicButton
                hideShadow
                width={responsiveWidth / 2 - 50}
                height={46}
                linearGradientProps={{ colors: ["#000000", "#000000"] }}
                onPress={() => {
                  setChangeShowDialogStatus(!showDialog);
                  onNegativePress();
                }}
              >
                <SizableText
                  fontSize={"$hsm"}
                  lineHeight={18.75}
                  color={"$white"}
                  fontWeight={"700"}
                >
                  Close
                </SizableText>
              </BasicButton>
              <YStack w={"$3"} />
              <BasicButton
                hideShadow
                width={responsiveWidth / 2 - 50}
                height={46}
                linearGradientProps={{ colors: ["#05958f", "#05958f"] }}
                onPress={() => {
                  onPositivePress();
                }}
              >
                <SizableText
                  fontSize={"$hsm"}
                  lineHeight={18.75}
                  color={"$white"}
                  fontWeight={"700"}
                >
                  Watch Now
                </SizableText>
              </BasicButton>
            </XStack>
          </YStack>
        </ResponsiveContent>
      </YStack>
    </Modal>
  );
}

export default AdsConfirmationDialog;
