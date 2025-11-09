import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { useRouter } from "expo-router";
import BasicButton from "@design-system/components/buttons/basic-button";
import images from "@assets/images/images";
import { Image } from "react-native";
import ResponsiveContent from "@modules/shared/responsive-content";
import { useEffect, useRef } from "react";
import contents from "@assets/contents/contents";
import { InteractionManager } from "react-native";
import { deviceType, DeviceType } from "expo-device";
import { useInterstitialAd } from "@modules/app/interstitial-ad";
import { AdLoader } from "@modules/app/ad-loader";

function LevelSelectionScreen() {
  const languageData =
    contents.levelSelectionScreenSelectedLanguage?.[
      (global as any)?.currentSelectedLanguage ?? "English"
    ];
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isPhoneDevice = deviceType === DeviceType.PHONE;
  // Initialize interstitial ad
  const { isPreparingToShow, loadAd, showAd } = useInterstitialAd({
    onAdClosed: () => {
      console.log("Interstitial ad was closed");
      // Navigate after ad is closed
      executePendingNavigation();
    },
    onAdFailedToLoad: (error) => {
      console.log("Interstitial ad failed to load:", error);
      // Navigate even if ad fails
      executePendingNavigation();
    },
    onAdAttempt: (willShow, reason) => {
      console.log(
        `Ad attempt: ${willShow ? "Will show" : "Will not show"} - ${reason}`
      );
      if (!willShow) {
        // Ad won't show, navigate immediately
        executePendingNavigation();
      }
    },
  });

  // Store pending navigation
  const pendingNavigationRef = useRef<(() => void) | null>(null);

  const executePendingNavigation = () => {
    if (pendingNavigationRef.current) {
      pendingNavigationRef.current();
      pendingNavigationRef.current = null;
    }
  };

  const handleSectionPress = (value: "EASY" | "HARD" | undefined) => {
    // Store the navigation action
    pendingNavigationRef.current = () => {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          try {
            switch (value) {
              case "EASY":
                router.push(`./init-game?level=EASY`);
                break;
              case "HARD":
                router.push(`./init-game?level=HARD`);
                break;
            }
          } catch (error) {
            console.warn("Navigation error:", error);
            try {
              router.replace("/welcome");
            } catch (fallbackError) {
              if (router.canGoBack()) {
                router.back();
              }
            }
          }
        }, 100);
      });
    };

    // Show interstitial ad - navigation will happen in callbacks
    showAd();
  };

  // Load interstitial ad when component mounts
  useEffect(() => {
    loadAd();
  }, [loadAd]);

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader
        title={languageData.choose_level}
        backgroundColor={"$primary"}
      />
      <ResponsiveContent flex={1}>
        <YStack flex={1} mx={isPhoneDevice ? "$6" : 0} justifyContent="center">
          <BasicButton
            height={isPhoneDevice ? 56 : 84}
            linearGradientProps={{ colors: ["#1c2e4a", "#1c2e4a"] }}
            onPress={() => {
              handleSectionPress("EASY");
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
              handleSectionPress("HARD");
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

      {/* Interstitial Ad Loader */}
      <AdLoader
        isVisible={isPreparingToShow}
        message="Preparing ad, please wait..."
      />
    </YStack>
  );
}

export default LevelSelectionScreen;
