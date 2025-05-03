import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { useFocusEffect, useGlobalSearchParams, useRouter } from "expo-router";
import BasicButton from "@design-system/components/buttons/basic-button";
import LottieWrapper from "@modules/shared/components/lottie-wrapper";
import lotties from "@assets/lotties/lotties";
import { Audio } from "expo-av";
import sounds from "@assets/sounds/sounds";
import { useCallback, useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import images from "@assets/images/images";
import LocalStorage from "@utils/local-storage";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";
import ResponsiveContent from "@modules/shared/responsive-content";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import { staticInterstitialAd } from "@modules/shared/components/helpers";
import { deviceType, DeviceType } from "expo-device";

function HalfTimeScreen() {
  const {
    isForTraining = "No",
  }: {
    isForTraining?: string;
  } = useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isPhoneDevice = deviceType === DeviceType.PHONE;
  const [sound, setSound] = useState<Audio.Sound>();
  const isSoundEnabled = useRef(true);
  const responsiveWidth = useResponsiveWidth();
  const { isLoaded, isClosed, load, show } = useInterstitialAd(
    __DEV__
      ? TestIds.INTERSTITIAL_VIDEO
      : global?.interstitialAd ?? staticInterstitialAd
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      load();

      // Action after the ad is closed
      setTimeout(() => {
        redirectToNextScreenAfterAdmobInterstitial();
      }, 500);
    }
  }, [isClosed]);

  const redirectToNextScreenAfterAdmobInterstitial = () => {
    router.back();
  };

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
      const { sound } = await Audio.Sound.createAsync(sounds.buzzer);
      setSound(sound);
      await sound.playAsync();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <YStack flex={1} backgroundColor={"$black"}>
      <ScrollHeader title="" backgroundColor={"$black"} back={false} />

      <ResponsiveContent flex={1}>
        <SizableText
          fontSize={"$6xl"}
          color={"$white"}
          fontWeight={"700"}
          textAlign="center"
          rotateX={"-30deg"}
          rotateY={"30deg"}
          lineHeight={80}
          textShadowOffset={{ width: 0, height: 7 }}
          textShadowColor={"$primary"}
          textShadowRadius={8}
        >
          {`Half Time`}
        </SizableText>
        <YStack h={"$8"} />
        <YStack alignItems="center" justifyContent="center" flex={1}>
          <Image
            key={"whistle"}
            source={images.whistle}
            style={{ width: responsiveWidth / 1.5 }}
            resizeMode="contain"
            alt={"whistle"}
          />
        </YStack>
        <YStack mx={"$4"} mb={"$4"}>
          <BasicButton
            height={46}
            linearGradientProps={{ colors: ["#ffffff", "#ffffff"] }}
            onPress={() => {
              if (isLoaded && global?.showAds) {
                show();
              } else {
                // No advert ready to show yet
                redirectToNextScreenAfterAdmobInterstitial();
              }
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
                  height: 30,
                  width: 30,
                }}
                width={30}
                height={30}
                source={lotties.watchVideo}
                loop={false}
              />
              <YStack w={"$1"} />
              <SizableText
                fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                lineHeight={isPhoneDevice ? 24 : 30}
                color={"$black"}
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
