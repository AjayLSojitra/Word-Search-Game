import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { AdsConsent } from "react-native-google-mobile-ads";
import { DeviceType, deviceType } from "expo-device";
import { staticBannerAd } from "@modules/shared/components/helpers";
import { SizableText, YStack } from "tamagui";

interface BannerAdComponentProps {
  size?: BannerAdSize;
}

export const BannerAdComponent: React.FC<BannerAdComponentProps> = ({
  size = BannerAdSize.ANCHORED_ADAPTIVE_BANNER,
}) => {
  const [canShowAd, setCanShowAd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  useEffect(() => {
    const checkConsentAndLoadAd = async () => {
      try {
        const { canRequestAds } = await AdsConsent.getConsentInfo();
        setCanShowAd((global as any)?.showAds && canRequestAds);
      } catch (error) {
        console.error("Failed to check consent for ads:", error);
        setCanShowAd(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkConsentAndLoadAd();
  }, []);

  if (isLoading) {
    return (
      <YStack
        bg="$white"
        borderRadius="$4"
        ai="center"
        jc="center"
        minHeight={65}
      >
        <SizableText
          fontSize={isPhoneDevice ? "$sm" : "$md"}
          color="$colorText"
          ta="center"
        >
          Loading ad...
        </SizableText>
      </YStack>
    );
  }

  if (!canShowAd) {
    return (
      <YStack
        bg="$white"
        borderRadius="$4"
        ai="center"
        jc="center"
        minHeight={65}
      >
        <SizableText
          fontSize={isPhoneDevice ? "$sm" : "$md"}
          color="$colorText"
          ta="center"
        >
          {`${
            (global as any)?.showAds
              ? "Ad not available due to consent settings"
              : "Ad not available"
          }`}
        </SizableText>
      </YStack>
    );
  }

  return (
    <YStack style={styles.container} bg="$white" minHeight={65}>
      <BannerAd
        unitId={
          __DEV__ ? TestIds.BANNER : (global as any)?.bannerAd ?? staticBannerAd
        }
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false,
        }}
        onAdLoaded={() => {
          console.log("Banner ad loaded");
        }}
        onAdFailedToLoad={(error) => {
          console.error("Banner ad failed to load:", error);
        }}
      />
    </YStack>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
