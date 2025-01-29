import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BasicButton from "@design-system/components/buttons/basic-button";
import { Image, Platform } from "react-native";
import images from "@assets/images/images";
import AdsConfirmationDialog from "@modules/shared/components/confirmation-dialog/ads-confirmation-dialog";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import ResponsiveContent from "@modules/shared/components/responsive-content";
import ErrorBoundary from "@modules/shared/components/error-boundary";
import { alphabets } from "@utils/helper";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import { HIT_SLOP } from "@utils/theme";
import { TestIds, useRewardedAd, useInterstitialAd } from 'react-native-google-mobile-ads';
import { canShowAdmobInteratitial, staticInterstitialAd, staticRewardInterstitialAd } from "@modules/shared/components/helpers";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import InAppReview from 'react-native-in-app-review';
import { OneSignal } from 'react-native-onesignal';

function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const [showAdsConfirmationPopup, setShowAdsConfirmationPopup] = useState(false)
  const router = useRouter();
  const [randomWordLength, setRandomWordLength] = useState<number>();
  const [duration, setDuration] = useState<number>();
  const {
    isLoaded: isLoadedRewarded,
    isClosed: isClosedRewarded,
    load: loadRewarded,
    show: showRewarded
  } = useRewardedAd(__DEV__ ? TestIds.REWARDED : (global?.rewardInterstitialAd ?? staticRewardInterstitialAd));
  const { isLoaded, isClosed, load, show, isShowing } = useInterstitialAd(__DEV__ ? TestIds.INTERSTITIAL_VIDEO : (global?.interstitialAd ?? staticInterstitialAd));
  const redirectTo = useRef<"LEVEL-SELECTION-SCREEN" | "SETTING-SCREEN">();

  useEffect(() => {
    OneSignal.Notifications.requestPermission(true);
  }, [])

  useEffect(() => {
    if (global?.show_review_popup) {
      if (InAppReview.isAvailable()) {
        InAppReview.RequestInAppReview()
          .then((hasFlowFinishedSuccessfully) => {
            if (hasFlowFinishedSuccessfully) {
              // do something for ios
              // do something for android
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [])

  const loadRewardedAd = () => {
    // Start loading the rewarded straight away
    if (global?.showAds) {
      loadRewarded();
    }
  }

  useEffect(() => {
    loadRewardedAd()
  }, [loadRewarded]);

  useEffect(() => {
    if (isClosedRewarded) {
      loadRewardedAd()

      // Action after the ad is closed
      redirectToPlayGameScreen()
    }
  }, [isClosedRewarded]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      load();

      // Action after the ad is closed
      redirectToNextScreenAfterAdmobInterstitial()
    }
  }, [isClosed]);

  const redirectToNextScreenAfterAdmobInterstitial = () => {
    if (redirectTo.current === "LEVEL-SELECTION-SCREEN") {
      router.push('./level-selection')
    }

    if (redirectTo.current === "SETTING-SCREEN") {
      router.push("./settings")
    }
  }

  const getDurationAccordingToRandomWordLength = useCallback((randomLength: number) => {
    switch (randomLength) {
      case 3: { return 30 }
      case 4: { return 60 }
      case 5: { return 90 }
      case 6: { return 120 }
      case 7: { return 150 }
      case 8: { return 180 }
      default: { return 60 }
    }
  }, [])

  const redirectToPlayGameScreen = () => {
    const minAlphabets = 0;
    const maxAlphabets = 25;
    const randomAlphabet = Math.floor(Math.random() * (maxAlphabets - minAlphabets + 1)) + minAlphabets;
    router.push(`./play-game?alphabet=${alphabets[randomAlphabet]}&&wordLength=${randomWordLength}&&duration=${duration}&&isForTraining=Yes`)
  }

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader
        backgroundColor={"$primary"}
        back={false}
        rightElement={
          <TouchableScale
            hitSlop={HIT_SLOP}
            onPress={() => {
              redirectTo.current = "SETTING-SCREEN";
              if (isLoaded && canShowAdmobInteratitial()) {
                show();
              } else {
                // No advert ready to show yet
                redirectToNextScreenAfterAdmobInterstitial()
              }
            }}
          >
            <Image
              key={"settings"}
              source={images.settings}
              style={{ height: 24, width: 24, alignSelf: "center" }}
              alt={"settings"}
            />
          </TouchableScale>
        }
      />

      <ResponsiveContent flex={1} backgroundColor={"$primary"}>
        <YStack alignItems="center" justifyContent="center">
          <AdsConfirmationDialog
            onPositivePress={() => {
              //Show Rewarded Ad
              if (isLoadedRewarded) {
                showRewarded();
              } else {
                // No advert ready to show yet
                redirectToPlayGameScreen()
              }
            }}
            onNegativePress={() => { }}
            showDialog={showAdsConfirmationPopup}
            setChangeShowDialogStatus={setShowAdsConfirmationPopup}
            content={`Watch a video to unlock this feature for ${duration} seconds!`}
          />
        </YStack>
        <YStack flex={1} justifyContent="center">
          <Image
            key={"appIcon"}
            source={images.appIcon}
            style={{ height: 200, width: 200, alignSelf: "center" }}
            alt={"appIcon"}
          />
        </YStack>
        <YStack mx={"$6"} my={"$6"}>
          <BasicButton
            height={56}
            linearGradientProps={{ colors: ["#FFFFFF", "#FFFFFF"] }}
            onPress={() => {
              redirectTo.current = "LEVEL-SELECTION-SCREEN";
              if (isLoaded && canShowAdmobInteratitial()) {
                show();
              } else {
                // No advert ready to show yet
                redirectToNextScreenAfterAdmobInterstitial()
              }
            }}
          >
            <XStack alignItems="center">
              <Image
                key={"letsPlayPrimary"}
                source={images.letsPlayPrimary}
                style={{ height: 22, width: 22 }}
                alt={"letsPlayPrimary"}
              />
              <YStack w={"$3"} />
              <SizableText
                fontSize={"$hsm"}
                lineHeight={18.75}
                color={"$primary"}
                fontWeight={"700"}
              >
                Play Game
              </SizableText>
            </XStack>
          </BasicButton>
          <YStack h={"$5"} />
          <BasicButton
            height={56}
            linearGradientProps={{ colors: ["#000000", "#000000"] }}
            onPress={() => {
              const minWordLength = 3;
              const maxWordLength = 8;
              const randomLength = Math.floor(Math.random() * (maxWordLength - minWordLength + 1)) + minWordLength
              setRandomWordLength(randomLength);
              const dur = getDurationAccordingToRandomWordLength(randomLength);
              setDuration(dur)

              if (global?.showAds && isLoadedRewarded) {
                setShowAdsConfirmationPopup(true)
              } else {
                // redirectToPlayGameScreen
                const minAlphabets = 0;
                const maxAlphabets = 25;
                const randomAlphabet = Math.floor(Math.random() * (maxAlphabets - minAlphabets + 1)) + minAlphabets;
                router.push(`./play-game?alphabet=${alphabets[randomAlphabet]}&&wordLength=${randomLength}&&duration=${dur}&&isForTraining=Yes`)
              }
            }
            }
          >
            <XStack alignItems="center">
              <Image
                key={"premium"}
                source={images.premium}
                style={{ height: 22, width: 22, alignSelf: "center", marginTop: -4 }}
                alt={"premium"}
              />
              <YStack w={"$3"} />
              <SizableText
                fontSize={"$hsm"}
                color={"$white"}
                fontWeight={"700"}
              >
                Train Your Mind
              </SizableText>
            </XStack>
          </BasicButton>
        </YStack>
      </ResponsiveContent>


      {(Platform.OS === "android" && !isShowing && global?.showAds) && (
        <YStack justifyContent="flex-end">
          <AdmobBanner />
        </YStack>
      )}
      <YStack h={insets.bottom} />
    </YStack>
  )
}

export default () => (
  <ErrorBoundary>
    <WelcomeScreen />
  </ErrorBoundary>
);