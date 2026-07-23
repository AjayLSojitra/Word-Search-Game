import React from "react";
import { AdsConsentStatus } from "react-native-google-mobile-ads";
import { DeviceType, deviceType } from "expo-device";
import { useConsent } from "./use-consent";
import { Button, Spinner, SizableText, XStack, YStack } from "tamagui";

interface ConsentManagerProps {
  onConsentChange?: (hasConsent: boolean) => void;
}

export const ConsentManager: React.FC<ConsentManagerProps> = ({
  onConsentChange,
}) => {
  const {
    consentInfo,
    consentChoices,
    isLoading,
    error,
    resetConsent,
    requestConsentUpdate,
  } = useConsent();

  const isPhoneDevice = deviceType === DeviceType.PHONE;

  const getStatusText = (status: AdsConsentStatus) => {
    switch (status) {
      case AdsConsentStatus.UNKNOWN:
        return "Unknown consent status";
      case AdsConsentStatus.REQUIRED:
        return "Consent required";
      case AdsConsentStatus.NOT_REQUIRED:
        return "Consent not required";
      case AdsConsentStatus.OBTAINED:
        return "Consent obtained";
      default:
        return "Unknown status";
    }
  };

  const getStatusColor = (status: AdsConsentStatus) => {
    switch (status) {
      case AdsConsentStatus.OBTAINED:
        return "$green.500";
      case AdsConsentStatus.REQUIRED:
        return "$yellow.500";
      case AdsConsentStatus.NOT_REQUIRED:
        return "$blue.500";
      default:
        return "$gray.500";
    }
  };

  React.useEffect(() => {
    if (consentInfo && onConsentChange) {
      onConsentChange(consentInfo.canRequestAds);
    }
  }, [consentInfo, onConsentChange]);

  if (isLoading) {
    return (
      <YStack p="$4" bg="$blueGray.50" borderRadius="$4">
        <XStack alignItems="center" gap="$3">
          <Spinner size="small" color="$info.600" />
          <SizableText fontSize={isPhoneDevice ? "$sm" : "$md"} color="$color">
            Loading consent information...
          </SizableText>
        </XStack>
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack p="$4" bg="$red.50" borderRadius="$4">
        <YStack gap="$2">
          <SizableText
            fontSize={isPhoneDevice ? "$sm" : "$md"}
            color="$red.600"
            fontWeight="$semibold"
          >
            Error loading consent
          </SizableText>
          <SizableText
            fontSize={isPhoneDevice ? "$xs" : "$sm"}
            color="$red.500"
          >
            {error}
          </SizableText>
          <Button
            onPress={requestConsentUpdate}
            bg="$red.600"
            h={32}
            borderRadius="$2"
          >
            <SizableText color="$white" fontSize="$sm" fontWeight="$semibold">
              Retry
            </SizableText>
          </Button>
        </YStack>
      </YStack>
    );
  }

  return (
    <YStack p="$4" bg="$blueGray.50" borderRadius="$4">
      <YStack gap="$3">
        <SizableText
          fontSize={isPhoneDevice ? "$md" : "$lg"}
          fontWeight="$bold700"
          color="$color"
        >
          Privacy & Consent
        </SizableText>

        {consentInfo && (
          <YStack gap="$2">
            <XStack justifyContent="space-between" alignItems="center">
              <SizableText
                fontSize={isPhoneDevice ? "$sm" : "$md"}
                color="$color"
              >
                Status:
              </SizableText>
              <SizableText
                fontSize={isPhoneDevice ? "$sm" : "$md"}
                fontWeight="$semibold"
                color={getStatusColor(consentInfo.status)}
              >
                {getStatusText(consentInfo.status)}
              </SizableText>
            </XStack>

            <XStack justifyContent="space-between" alignItems="center">
              <SizableText
                fontSize={isPhoneDevice ? "$sm" : "$md"}
                color="$color"
              >
                Can request ads:
              </SizableText>
              <SizableText
                fontSize={isPhoneDevice ? "$sm" : "$md"}
                fontWeight="$semibold"
                color={consentInfo.canRequestAds ? "$green.500" : "$red.500"}
              >
                {consentInfo.canRequestAds ? "Yes" : "No"}
              </SizableText>
            </XStack>

            {consentInfo.isConsentFormAvailable && (
              <XStack justifyContent="space-between" alignItems="center">
                <SizableText
                  fontSize={isPhoneDevice ? "$sm" : "$md"}
                  color="$color"
                >
                  Form available:
                </SizableText>
                <SizableText
                  fontSize={isPhoneDevice ? "$sm" : "$md"}
                  fontWeight="$semibold"
                  color="$green.500"
                >
                  Yes
                </SizableText>
              </XStack>
            )}
          </YStack>
        )}

        {consentChoices && (
          <YStack gap="$2" mt="$2">
            <SizableText
              fontSize={isPhoneDevice ? "$sm" : "$md"}
              fontWeight="$semibold"
              color="$color"
            >
              Your consent choices:
            </SizableText>
            <YStack gap="$1">
              <XStack justifyContent="space-between" alignItems="center">
                <SizableText
                  fontSize={isPhoneDevice ? "$xs" : "$sm"}
                  color="$color"
                >
                  Personalized ads:
                </SizableText>
                <SizableText
                  fontSize={isPhoneDevice ? "$xs" : "$sm"}
                  fontWeight="$semibold"
                  color={
                    consentChoices.selectPersonalisedAds
                      ? "$green.500"
                      : "$red.500"
                  }
                >
                  {consentChoices.selectPersonalisedAds ? "Allowed" : "Denied"}
                </SizableText>
              </XStack>

              <XStack justifyContent="space-between" alignItems="center">
                <SizableText
                  fontSize={isPhoneDevice ? "$xs" : "$sm"}
                  color="$color"
                >
                  Store information:
                </SizableText>
                <SizableText
                  fontSize={isPhoneDevice ? "$xs" : "$sm"}
                  fontWeight="$semibold"
                  color={
                    consentChoices.storeAndAccessInformationOnDevice
                      ? "$green.500"
                      : "$red.500"
                  }
                >
                  {consentChoices.storeAndAccessInformationOnDevice
                    ? "Allowed"
                    : "Denied"}
                </SizableText>
              </XStack>
            </YStack>
          </YStack>
        )}

        <XStack gap="$2" mt="$2">
          <Button
            onPress={requestConsentUpdate}
            flex={1}
            bg="$primary"
            h={40}
            borderRadius="$2"
          >
            <SizableText color="$white" fontSize="$sm" fontWeight="$semibold" adjustsFontSizeToFit numberOfLines={1}>
              Update Consent
            </SizableText>
          </Button>

          <Button
            onPress={resetConsent}
            flex={1}
            bg="$red.600"
            h={40}
            borderRadius="$2"
          >
            <SizableText color="$white" fontSize="$sm" fontWeight="$semibold">
              Reset
            </SizableText>
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
};
