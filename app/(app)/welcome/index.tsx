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
import {
  TestIds,
  useRewardedAd,
  useInterstitialAd,
} from "react-native-google-mobile-ads";
import {
  canShowAdmobInteratitial,
  staticInterstitialAd,
  staticRewardInterstitialAd,
} from "@modules/shared/components/helpers";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import InAppReview from "react-native-in-app-review";
import { OneSignal } from "react-native-onesignal";
import { DeviceType, deviceType } from "expo-device";
import useTriggeredEvent from "@modules/shared/components/use-triggered-event";
import contents from "@assets/contents/contents";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";

function WelcomeScreen() {
  const isPhoneDevice = deviceType === DeviceType.PHONE;
  const insets = useSafeAreaInsets();
  const [showAdsConfirmationPopup, setShowAdsConfirmationPopup] =
    useState(false);

  const languageData =
    contents.welcomeScreenSelectedLanguage?.[
      global?.currentSelectedLanguage ?? "English"
    ];

  const [selectedLanguageRefreshKey, setSelectedLanguageRefreshKey] =
    useState(0);

  useTriggeredEvent(
    "languageSelection",
    () => {
      setSelectedLanguageRefreshKey(selectedLanguageRefreshKey + 1); // Trigger a re-render using a refresh key
    },
    [selectedLanguageRefreshKey]
  );
  const responsiveWidth = useResponsiveWidth();
  const router = useRouter();
  const [randomWordLength, setRandomWordLength] = useState<number>();
  const [duration, setDuration] = useState<number>();
  const {
    isLoaded: isLoadedRewarded,
    isClosed: isClosedRewarded,
    load: loadRewarded,
    show: showRewarded,
  } = useRewardedAd(
    __DEV__
      ? TestIds.REWARDED
      : global?.rewardInterstitialAd ?? staticRewardInterstitialAd
  );
  const { isLoaded, isClosed, load, show, isShowing } = useInterstitialAd(
    __DEV__
      ? TestIds.INTERSTITIAL_VIDEO
      : global?.interstitialAd ?? staticInterstitialAd
  );
  const redirectTo = useRef<
    "LEVEL-SELECTION-SCREEN" | "SETTING-SCREEN" | "CATEGORY-SCREEN"
  >();

  useEffect(() => {
    OneSignal.Notifications.requestPermission(true);
  }, []);

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
  }, []);

  const loadRewardedAd = () => {
    // Start loading the rewarded straight away
    if (global?.showAds) {
      loadRewarded();
    }
  };

  useEffect(() => {
    loadRewardedAd();
  }, [loadRewarded]);

  useEffect(() => {
    if (isClosedRewarded) {
      loadRewardedAd();

      // Action after the ad is closed
      redirectToPlayGameScreen();
    }
  }, [isClosedRewarded]);

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
    if (redirectTo.current === "LEVEL-SELECTION-SCREEN") {
      router.push("./level-selection");
    }

    if (redirectTo.current === "SETTING-SCREEN") {
      router.push("./settings");
    }

    if (redirectTo.current === "CATEGORY-SCREEN") {
      router.push("./categories");
    }
  };

  const getDurationAccordingToRandomWordLength = useCallback(
    (randomLength: number) => {
      switch (randomLength) {
        case 3: {
          return 30;
        }
        case 4: {
          return 60;
        }
        case 5: {
          return 90;
        }
        case 6: {
          return 120;
        }
        case 7: {
          return 150;
        }
        case 8: {
          return 180;
        }
        default: {
          return 60;
        }
      }
    },
    []
  );

  const redirectToPlayGameScreen = () => {
    const alphabetList = alphabets();
    const randomAlphabetIndex = Math.floor(Math.random() * alphabetList.length);
    const randomAlphabet = alphabetList[randomAlphabetIndex];
    router.push(
      `./play-game?alphabet=${randomAlphabet}&&wordLength=${randomWordLength}&&duration=${duration}&&isForTraining=Yes`
    );
  };

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader
        backgroundColor={"$primary"}
        back={false}
        rightElement={
          <TouchableScale
            style={{
              paddingHorizontal: isPhoneDevice ? 8 : 12,
              paddingVertical: isPhoneDevice ? 8 : 12,
              backgroundColor: "#1c2e4a",
              borderRadius: isPhoneDevice ? 8 : 12,
            }}
            hitSlop={HIT_SLOP}
            onPress={() => {
              redirectTo.current = "SETTING-SCREEN";
              if (isLoaded && canShowAdmobInteratitial()) {
                show();
              } else {
                // No advert ready to show yet
                redirectToNextScreenAfterAdmobInterstitial();
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
                redirectToPlayGameScreen();
              }
            }}
            onNegativePress={() => {}}
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
            linearGradientProps={{ colors: ["#1c2e4a", "#1c2e4a"] }}
            onPress={() => {
              redirectTo.current = "LEVEL-SELECTION-SCREEN";
              if (isLoaded && canShowAdmobInteratitial()) {
                show();
              } else {
                // No advert ready to show yet
                redirectToNextScreenAfterAdmobInterstitial();
              }
            }}
          >
            <YStack width={responsiveWidth - 60}>
              <Image
                key={"letsPlayPrimary"}
                source={images.letsPlayPrimary}
                style={{
                  height: isPhoneDevice ? 22 : 33,
                  width: isPhoneDevice ? 22 : 33,
                  tintColor: "white",
                  zIndex: 1,
                  position: "absolute",
                  left: isPhoneDevice ? 18 : 28,
                }}
                alt={"letsPlayPrimary"}
              />
              <SizableText
                fontSize={isPhoneDevice ? "$hsm" : "$hmd"}
                lineHeight={isPhoneDevice ? 30 : 40}
                color={"$white"}
                fontWeight={"700"}
                textAlign="center"
              >
                {languageData.play_game}
              </SizableText>
            </YStack>
          </BasicButton>
          <YStack h={"$5"} />
          <BasicButton
            height={56}
            linearGradientProps={{ colors: ["#1c2e4a", "#1c2e4a"] }}
            onPress={() => {
              redirectTo.current = "CATEGORY-SCREEN";
              if (isLoaded && canShowAdmobInteratitial()) {
                show();
              } else {
                // No advert ready to show yet
                redirectToNextScreenAfterAdmobInterstitial();
              }
            }}
          >
            <YStack width={responsiveWidth - 60}>
              <Image
                key={"categories"}
                source={images.categories}
                style={{
                  height: isPhoneDevice ? 22 : 33,
                  width: isPhoneDevice ? 22 : 33,
                  tintColor: "white",
                  zIndex: 1,
                  position: "absolute",
                  left: isPhoneDevice ? 18 : 28,
                }}
                alt={"categories"}
              />
              <SizableText
                fontSize={isPhoneDevice ? "$hsm" : "$hmd"}
                lineHeight={isPhoneDevice ? 30 : 40}
                color={"$white"}
                fontWeight={"700"}
                textAlign="center"
              >
                {languageData.pick_category}
              </SizableText>
            </YStack>
          </BasicButton>
          <YStack h={"$5"} />
          <BasicButton
            height={56}
            linearGradientProps={{ colors: ["#1c2e4a", "#1c2e4a"] }}
            onPress={() => {
              if (isLoaded && canShowAdmobInteratitial()) {
                show();
              } else {
                const minWordLength = 3;
                const maxWordLength = 8;
                const randomLength =
                  Math.floor(
                    Math.random() * (maxWordLength - minWordLength + 1)
                  ) + minWordLength;
                setRandomWordLength(randomLength);
                const dur =
                  getDurationAccordingToRandomWordLength(randomLength);
                setDuration(dur);

                if (global?.showAds && isLoadedRewarded) {
                  setShowAdsConfirmationPopup(true);
                } else {
                  const alphabetList = alphabets();
                  const randomAlphabetIndex = Math.floor(
                    Math.random() * alphabetList.length
                  );
                  const randomAlphabet = alphabetList[randomAlphabetIndex];

                  router.push(
                    `./play-game?alphabet=${randomAlphabet}&&wordLength=${randomLength}&&duration=${dur}&&isForTraining=Yes`
                  );
                }
              }
            }}
          >
            <YStack width={responsiveWidth - 60}>
              <Image
                key={"premium"}
                source={images.premium}
                style={{
                  height: isPhoneDevice ? 22 : 33,
                  width: isPhoneDevice ? 22 : 33,
                  zIndex: 1,
                  position: "absolute",
                  left: isPhoneDevice ? 18 : 28,
                }}
                alt={"premium"}
              />
              <SizableText
                fontSize={isPhoneDevice ? "$hsm" : "$hmd"}
                lineHeight={isPhoneDevice ? 30 : 40}
                color={"$white"}
                fontWeight={"700"}
                textAlign="center"
              >
                {languageData.train_your_mind}
              </SizableText>
            </YStack>
          </BasicButton>
        </YStack>
      </ResponsiveContent>

      {Platform.OS === "android" && !isShowing && global?.showAds && (
        <YStack justifyContent="flex-end">
          <AdmobBanner />
        </YStack>
      )}
      <YStack h={insets.bottom} />
    </YStack>
  );
}

export default () => (
  <ErrorBoundary>
    <WelcomeScreen />
  </ErrorBoundary>
);
