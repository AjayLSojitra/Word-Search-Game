import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { useRouter } from "expo-router";
import BasicButton from "@design-system/components/buttons/basic-button";
import images from "@assets/images/images";
import { Image } from "react-native";
import ResponsiveContent from "@modules/shared/responsive-content";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import {
  canShowAdmobInteratitial,
  staticInterstitialAd,
} from "@modules/shared/components/helpers";
import { useEffect, useRef, useState } from "react";
import contents from "@assets/contents/contents";
import AdsNotifyDialog from "@modules/shared/components/confirmation-dialog/ads-notify-dialog";
import { deviceType, DeviceType } from "expo-device";

function LevelSelectionScreen() {
  const languageData =
    contents.levelSelectionScreenSelectedLanguage?.[
      global?.currentSelectedLanguage ?? "English"
    ];
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isPhoneDevice = deviceType === DeviceType.PHONE;
  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    __DEV__
      ? TestIds.INTERSTITIAL_VIDEO
      : global?.interstitialAd ?? staticInterstitialAd
  );
  const redirectTo = useRef<"EASY" | "HARD">();

  const redirectToInitGame = (level: "EASY" | "HARD") => {
    router.push(`./init-game?level=${level}`);
  };

  const [showAdsConfirmationPopup, setShowAdsConfirmationPopup] =
    useState(false);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      load();

      // Action after the ad is closed
      setShowAdsConfirmationPopup(false);
      redirectToNextScreenAfterAdmobInterstitial();
    }
  }, [isClosed]);

  useEffect(() => {
    if (error) {
      setShowAdsConfirmationPopup(false);
    }
  }, [error]);

  const showInterstitial = () => {
    setShowAdsConfirmationPopup(true);
    setTimeout(() => {
      show();
    }, 2000);
  };

  const redirectToNextScreenAfterAdmobInterstitial = () => {
    if (redirectTo.current === "EASY") {
      redirectToInitGame("EASY");
    }

    if (redirectTo.current === "HARD") {
      redirectToInitGame("HARD");
    }
  };

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader
        title={languageData.choose_level}
        backgroundColor={"$primary"}
      />
      <ResponsiveContent flex={1}>
        <YStack alignItems="center" justifyContent="center">
          <AdsNotifyDialog
            showDialog={showAdsConfirmationPopup}
            content={`Ad is loading...`}
          />
        </YStack>
        <YStack flex={1} mx={isPhoneDevice ? "$6" : 0} justifyContent="center">
          <BasicButton
            height={isPhoneDevice ? 56 : 84}
            linearGradientProps={{ colors: ["#1c2e4a", "#1c2e4a"] }}
            onPress={() => {
              redirectTo.current = "EASY";
              if (isLoaded && canShowAdmobInteratitial()) {
                showInterstitial();
              } else {
                // No advert ready to show yet
                redirectToNextScreenAfterAdmobInterstitial();
              }
            }}
          >
            <XStack alignItems="center">
              <SizableText
                fontSize={isPhoneDevice ? "$hsm" : "$hmd"}
                lineHeight={isPhoneDevice ? 30 : 40}
                color={"$white"}
                fontWeight={"700"}
              >
                {languageData.easy}
              </SizableText>
              <YStack w={isPhoneDevice ? "$3" : "$5"} />
              <Image
                key={"easy"}
                source={images.easy}
                style={{
                  height: isPhoneDevice ? 24 : 36,
                  width: isPhoneDevice ? 24 : 36,
                }}
                alt={"easy"}
              />
            </XStack>
          </BasicButton>
          <YStack h={isPhoneDevice ? "$5" : "$8"} />
          <BasicButton
            height={isPhoneDevice ? 56 : 84}
            linearGradientProps={{ colors: ["#1c2e4a", "#1c2e4a"] }}
            onPress={() => {
              redirectTo.current = "HARD";
              if (isLoaded && canShowAdmobInteratitial()) {
                showInterstitial();
              } else {
                // No advert ready to show yet
                redirectToNextScreenAfterAdmobInterstitial();
              }
            }}
          >
            <XStack alignItems="center">
              <SizableText
                fontSize={isPhoneDevice ? "$hsm" : "$hmd"}
                lineHeight={isPhoneDevice ? 30 : 40}
                color={"$white"}
                fontWeight={"700"}
              >
                {languageData.hard}
              </SizableText>
              <YStack w={isPhoneDevice ? "$3" : "$5"} />
              <Image
                key={"hard"}
                source={images.hard}
                style={{
                  height: isPhoneDevice ? 24 : 36,
                  width: isPhoneDevice ? 24 : 36,
                }}
                alt={"hard"}
              />
            </XStack>
          </BasicButton>
        </YStack>
      </ResponsiveContent>
      <YStack h={insets.bottom} />
    </YStack>
  );
}

export default LevelSelectionScreen;
