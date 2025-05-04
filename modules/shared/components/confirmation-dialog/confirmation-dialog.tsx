import React, { Fragment, useState } from "react";
import { useConfirmationDialog } from "../../atoms/confirmation-dialog-atom";
import Close from "@assets/svgs/close";
import { SizableText, XStack, YStack } from "tamagui";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import PrimaryButton from "@design-system/components/buttons/primary-button";
import SecondaryButton from "@design-system/components/buttons/secondary-button";
import Modal from "react-native-modal";
import Checkbox from "../checkbox";
import { DeviceType, deviceType } from "expo-device";

function ConfirmationDialog() {
  const { isOpen, close, confirmationDialogState } = useConfirmationDialog();
  const [isEnabled, setIsEnabled] = useState(false);
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <Modal
      isVisible={isOpen}
      onDismiss={close}
      onBackdropPress={close}
      style={{ margin: 0, alignItems: "center" }}
      useNativeDriver
      useNativeDriverForBackdrop
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      hideModalContentWhileAnimating
    >
      <YStack borderRadius={12} width={343} backgroundColor={"$white"}>
        {confirmationDialogState.close && (
          <TouchableScale
            onPress={close}
            style={{ position: "absolute", zIndex: 1, left: 10, top: 10 }}
          >
            <Close height={24} width={24} />
          </TouchableScale>
        )}
        <YStack padding={"$4"}>
          <YStack>
            <YStack alignItems={"center"}>
              {confirmationDialogState.icon ?? <></>}
            </YStack>
            <YStack height={"$2"} />
            <SizableText
              color={"$blueGray.800"}
              fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
              lineHeight={isPhoneDevice ? 22 : 34}
              fontWeight={"$semibold"}
              textAlign={"center"}
            >
              {confirmationDialogState.title}
            </SizableText>
            {confirmationDialogState.description ? (
              <>
                <YStack height={"$2"} />
                <SizableText
                  color={"$blueGray.600"}
                  fontSize={
                    confirmationDialogState.descriptionFontSize
                      ? confirmationDialogState.descriptionFontSize
                      : "$sm"
                  }
                  fontWeight={"$medium"}
                  textAlign={"center"}
                >
                  {confirmationDialogState.description}
                </SizableText>
              </>
            ) : (
              <></>
            )}

            {confirmationDialogState.shortDescription ? (
              <>
                <YStack height={"$2"} />
                <XStack alignItems="center">
                  {confirmationDialogState.checkbox && (
                    <>
                      <Checkbox
                        type="SQUARE"
                        status={isEnabled}
                        onStatusChange={setIsEnabled}
                        size={16}
                      />
                      <YStack w={"$2"} />
                    </>
                  )}
                  <SizableText
                    color={"$blueGray.500"}
                    fontSize={confirmationDialogState.shortDescriptionFontSize}
                    fontWeight={"$medium"}
                  >
                    {confirmationDialogState.shortDescription}
                  </SizableText>
                </XStack>
              </>
            ) : (
              <></>
            )}
            <YStack height={"$3"} />
            <XStack>
              {confirmationDialogState.buttons.map((button, index) => {
                const { buttonType } = button;
                const ButtonComponent =
                  buttonType === "Primary" ? PrimaryButton : SecondaryButton;

                return (
                  <Fragment key={index}>
                    <YStack flex={1}>
                      <ButtonComponent
                        alt
                        hideShadow={buttonType === "Secondary"}
                        {...button}
                        disabled={
                          !isEnabled &&
                          (button.onPress ? true : false) &&
                          confirmationDialogState.checkbox
                        }
                        height={button.height ? button.height : 40}
                        onPress={() => {
                          button.onPress?.();
                          close();
                        }}
                      />
                    </YStack>
                    {index < confirmationDialogState.buttons.length - 1 && (
                      <YStack w={"$4"} />
                    )}
                  </Fragment>
                );
              })}
            </XStack>
          </YStack>
        </YStack>
      </YStack>
    </Modal>
  );
}

export default ConfirmationDialog;
