import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { useFocusEffect, useGlobalSearchParams } from "expo-router";
import BasicButton from "@design-system/components/buttons/basic-button";
import LottieWrapper from "@modules/shared/components/lottie-wrapper";
import lotties from "@assets/lotties/lotties";
import { createAudioPlayer, AudioPlayer } from "expo-audio";
import sounds from "@assets/sounds/sounds";
import { useCallback, useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import images from "@assets/images/images";
import LocalStorage from "@utils/local-storage";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";
import ResponsiveContent from "@modules/shared/responsive-content";
import { deviceType, DeviceType } from "expo-device";
import useGoBack from "@modules/shared/hooks/use-go-back";
import { useInterstitialAd } from "@modules/app/interstitial-ad";

function HalfTimeScreen() {
  const {
    isForTraining = "No",
  }: {
    isForTraining?: string;
  } = useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const goBack = useGoBack();
  const isPhoneDevice = deviceType === DeviceType.PHONE;
  const [sound, setSound] = useState<AudioPlayer>();
  const isSoundEnabled = useRef(true);
  const responsiveWidth = useResponsiveWidth();
  // Initialize interstitial ad
  const { loadAd, showAd } = useInterstitialAd({
    isForceShowAd: true,
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
      setTimeout(() => {
        pendingNavigationRef.current?.();
        pendingNavigationRef.current = null;
      }, 500);
    }
  };

  const handleSectionPress = (value: "WELCOME") => {
    // Store the navigation action
    pendingNavigationRef.current = () => {
      switch (value) {
        case "WELCOME":
          goBack("/welcome");
          break;
      }
    };

    // Show interstitial ad - navigation will happen in callbacks
    showAd();
  };

  // Load interstitial ad when component mounts
  useEffect(() => {
    loadAd();
  }, [loadAd]);

  useFocusEffect(
    useCallback(() => {
      LocalStorage.getItemDefault("SOUND_KEY").then((val) => {
        isSoundEnabled.current = val == null || val === "Yes";
        if (val == null || val === "Yes") {
          playHalfTimeIntervalSound();
        }
      });
    }, [])
  );

  async function playHalfTimeIntervalSound() {
    if (isSoundEnabled.current) {
      const player = createAudioPlayer(sounds.buzzer);
      setSound(player);
      player.play();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.remove();
        }
      : undefined;
  }, [sound]);

  return (
    <YStack flex={1} backgroundColor={"$primary"}>
      <ScrollHeader title="" backgroundColor={"$primary"} back={false} />

      <ResponsiveContent flex={1}>
        <SizableText
          fontSize={isPhoneDevice ? "$6xl" : "$8xl"}
          lineHeight={isPhoneDevice ? 80 : 110}
          color={"$secondPrimaryColor"}
          fontWeight={"700"}
          textAlign="center"
          textShadowOffset={{ width: 0, height: 7 }}
          textShadowColor={"$primary"}
          textShadowRadius={8}
        >
          {`Half Time`}
        </SizableText>
        <YStack h={isPhoneDevice ? "$8" : "$12"} />
        <YStack alignItems="center" justifyContent="center" flex={1}>
          <Image
            key={"whistle"}
            source={images.whistle}
            style={{ width: responsiveWidth / 1.5, tintColor: "#1c2e4a" }}
            resizeMode="contain"
            alt={"whistle"}
          />
        </YStack>
        <YStack mx={isPhoneDevice ? "$4" : 0} mb={isPhoneDevice ? "$4" : "$6"}>
          <BasicButton
            height={isPhoneDevice ? 46 : 69}
            linearGradientProps={{ colors: ["#ffffff", "#ffffff"] }}
            onPress={() => {
              handleSectionPress("WELCOME");
            }}
          >
            <XStack alignItems="center">
              <LottieWrapper
                webProps={{
                  options: {
                    loop: false,
                    autoplay: true,
                    animationData: lotties.watchVideo,
                  },
                  height: isPhoneDevice ? 30 : 45,
                  width: isPhoneDevice ? 30 : 45,
                }}
                width={isPhoneDevice ? 30 : 45}
                height={isPhoneDevice ? 30 : 45}
                source={lotties.watchVideo}
                loop={false}
              />
              <YStack w={isPhoneDevice ? "$1" : "$1.5"} />
              <SizableText
                fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                lineHeight={isPhoneDevice ? 24 : 34}
                color={"$secondPrimaryColor"}
                fontWeight={"700"}
                textAlign="center"
                textTransform="uppercase"
                adjustsFontSizeToFit
              >
                {`Watch video & resume  ${
                  isForTraining === "Yes" ? "training" : "game"
                }`}
              </SizableText>
            </XStack>
          </BasicButton>
        </YStack>
      </ResponsiveContent>
      <YStack h={insets.bottom} />
    </YStack>
  );
}

export default HalfTimeScreen;
