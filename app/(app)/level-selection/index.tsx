import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { useRouter } from "expo-router";
import BasicButton from "@design-system/components/buttons/basic-button";
import images from "@assets/images/images";
import { Image } from "react-native";
import ResponsiveContent from "@modules/shared/responsive-content";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import {
  canShowAdmobInteratitial,
  staticInterstitialAd,
} from "@modules/shared/components/helpers";
import { useEffect, useRef } from "react";

function LevelSelectionScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isLoaded, isClosed, load, show, isShowing } = useInterstitialAd(
    __DEV__
      ? TestIds.INTERSTITIAL_VIDEO
      : global?.interstitialAd ?? staticInterstitialAd
  );
  const redirectTo = useRef<"EASY" | "HARD">();

  const redirectToInitGame = (level: "EASY" | "HARD") => {
    router.push(`./init-game?level=${level}`);
  };

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      load();

      // Action after the ad is closed
      redirectToNextScreenAfterAdmobInterstitial();
    }
  }, [isClosed]);

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
      <ScrollHeader title="Choose Level" backgroundColor={"$primary"} />
      <ResponsiveContent flex={1}>
        <YStack flex={1} mx={"$6"} justifyContent="center">
          <BasicButton
            height={56}
            linearGradientProps={{ colors: ["#1c2e4a", "#1c2e4a"] }}
            onPress={() => {
              redirectTo.current = "EASY";
              if (isLoaded && canShowAdmobInteratitial()) {
                show();
              } else {
                // No advert ready to show yet
                redirectToNextScreenAfterAdmobInterstitial();
              }
            }}
          >
            <XStack alignItems="center">
              <SizableText
                fontSize={"$hsm"}
                color={"$white"}
                fontWeight={"700"}
              >
                Easy
              </SizableText>
              <YStack w={"$3"} />
              <Image
                key={"easy"}
                source={images.easy}
                style={{ height: 24, width: 24 }}
                alt={"easy"}
              />
            </XStack>
          </BasicButton>
          <YStack h={"$5"} />
          <BasicButton
            height={56}
            linearGradientProps={{ colors: ["#1c2e4a", "#1c2e4a"] }}
            onPress={() => {
              redirectTo.current = "HARD";
              if (isLoaded && canShowAdmobInteratitial()) {
                show();
              } else {
                // No advert ready to show yet
                redirectToNextScreenAfterAdmobInterstitial();
              }
            }}
          >
            <XStack alignItems="center">
              <SizableText
                fontSize={"$hsm"}
                color={"$white"}
                fontWeight={"700"}
              >
                Hard
              </SizableText>
              <YStack w={"$3"} />
              <Image
                key={"hard"}
                source={images.hard}
                style={{ height: 24, width: 24 }}
                alt={"hard"}
              />
            </XStack>
          </BasicButton>
        </YStack>
      </ResponsiveContent>
      {!isShowing && <AdmobBanner />}
      <YStack h={insets.bottom} />
    </YStack>
  );
}

export default LevelSelectionScreen;
