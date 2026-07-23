import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BasicButton from "@design-system/components/buttons/basic-button";
import { Image } from "react-native";
import images from "@assets/images/images";
import AdsConfirmationDialog from "@modules/shared/components/confirmation-dialog/ads-confirmation-dialog";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { InteractionManager } from "react-native";
import ResponsiveContent from "@modules/shared/components/responsive-content";
import ErrorBoundary from "@modules/shared/components/error-boundary";
import { alphabets } from "@utils/helper";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import { HIT_SLOP } from "@utils/theme";
import { AdsConsent } from "react-native-google-mobile-ads";
import { rateMyApp, shareMyApp } from "@modules/shared/components/helpers";
import InAppReview from "react-native-in-app-review";
import { DeviceType, deviceType } from "expo-device";
import useTriggeredEvent from "@modules/shared/components/use-triggered-event";
import contents from "@assets/contents/contents";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";
import useSubscriptionData, {
  presentPaywall,
} from "@modules/shared/hooks/use-subscription-data";
import { useInterstitialAd } from "@modules/app/interstitial-ad";
import { useRewardedAd } from "@modules/app/rewarded-ad";
import { AdLoader } from "@modules/app/ad-loader";

function WelcomeScreen() {
  const isPhoneDevice = deviceType === DeviceType.PHONE;
  const iconSize = isPhoneDevice ? 24 : 36;
  const { premium, refresh } = useSubscriptionData();
  const insets = useSafeAreaInsets();
  const [showRewardsAdsConfirmationPopup, setShowRewardsAdsConfirmationPopup] =
    useState(false);

  const languageData =
    contents.welcomeScreenSelectedLanguage?.[
    (global as any)?.currentSelectedLanguage ?? "English"
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

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [])
  );

  const responsiveWidth = useResponsiveWidth();
  const router = useRouter();
  const [randomWordLength, setRandomWordLength] = useState<number>();
  const [duration, setDuration] = useState<number>();
  const [shouldReloadRewardedAd, setShouldReloadRewardedAd] = useState(false);

  // Initialize rewarded ad
  const {
    isLoaded: isLoadedRewarded,
    loadAd: loadRewardedAd,
    showAd: showRewardedAd,
  } = useRewardedAd({
    onAdClosed: () => {
      console.log("Rewarded ad was closed");
      // Close the confirmation popup
      setShowRewardsAdsConfirmationPopup(false);
      // Navigate to play game screen after ad is closed
      redirectToPlayGameScreen();
      // Trigger reload
      setShouldReloadRewardedAd(true);
    },
    onAdFailedToLoad: (error) => {
      console.log("Rewarded ad failed to load:", error);
      // Close the confirmation popup if it's open
      setShowRewardsAdsConfirmationPopup(false);
    },
    onAdAttempt: (willShow, reason) => {
      console.log(
        `Rewarded ad attempt: ${willShow ? "Will show" : "Will not show"
        } - ${reason}`
      );
      if (!willShow) {
        // Ad won't show, close popup and navigate directly
        setShowRewardsAdsConfirmationPopup(false);
        redirectToPlayGameScreen();
      }
    },
    onRewardEarned: (reward) => {
      console.log("Reward earned:", reward);
      // Reward is earned, user will get the benefit
    },
  });

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

  const handleSectionPress = (
    value:
      | "LEVEL-SELECTION-SCREEN"
      | "SETTING-SCREEN"
      | "CATEGORY-SCREEN"
      | undefined
  ) => {
    // Store the navigation action
    pendingNavigationRef.current = () => {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          try {
            switch (value) {
              case "LEVEL-SELECTION-SCREEN":
                router.push("./level-selection");
                break;
              case "SETTING-SCREEN":
                router.push("./settings");
                break;
              case "CATEGORY-SCREEN":
                router.push("./categories");
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



  useEffect(() => {
    if ((global as any)?.show_review_popup) {
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

  // Load rewarded ad when component mounts
  useEffect(() => {
    loadRewardedAd();
  }, [loadRewardedAd]);

  // Reload rewarded ad after it's closed
  useEffect(() => {
    if (shouldReloadRewardedAd) {
      loadRewardedAd();
      setShouldReloadRewardedAd(false);
    }
  }, [shouldReloadRewardedAd, loadRewardedAd]);

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
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        try {
          const alphabetList = alphabets();
          const randomAlphabetIndex = Math.floor(Math.random() * alphabetList.length);
          const randomAlphabet = alphabetList[randomAlphabetIndex];
          router.push(
            `./play-game?alphabet=${randomAlphabet}&&wordLength=${randomWordLength}&&duration=${duration}&&isForTraining=Yes`
          );
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

  const onPressTrainYourMind = async () => {
    const { canRequestAds } = await AdsConsent.getConsentInfo();
    const minWordLength = 3;
    const maxWordLength = 8;
    const randomLength =
      Math.floor(Math.random() * (maxWordLength - minWordLength + 1)) +
      minWordLength;
    setRandomWordLength(randomLength);
    const dur = getDurationAccordingToRandomWordLength(randomLength);
    setDuration(dur);

    if (canRequestAds && (global as any)?.showAds && isLoadedRewarded) {
      setShowRewardsAdsConfirmationPopup(true);
    } else {
      // If ads are not available, navigate directly
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          try {
            const alphabetList = alphabets();
            const randomAlphabetIndex = Math.floor(
              Math.random() * alphabetList.length
            );
            const randomAlphabet = alphabetList[randomAlphabetIndex];

            router.push(
              `./play-game?alphabet=${randomAlphabet}&&wordLength=${randomLength}&&duration=${dur}&&isForTraining=Yes`
            );
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
    }
  };

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader
        backgroundColor={"$primary"}
        back={false}
        customTitle={
          <XStack
            width={responsiveWidth / 2 - (isPhoneDevice ? 48 : 72)}
            justifyContent="center"
          >
            <TouchableScale
              style={{
                paddingHorizontal: isPhoneDevice ? 8 : 12,
                paddingVertical: isPhoneDevice ? 8 : 12,
                backgroundColor: "#1c2e4a",
                borderRadius: isPhoneDevice ? 12 : 18,
              }}
              hitSlop={HIT_SLOP}
              onPress={() => {
                shareMyApp();
              }}
            >
              <YStack
                alignItems="center"
                justifyContent="center"
                height={isPhoneDevice ? 24 : 36}
                width={isPhoneDevice ? 24 : 36}
              >
                <Image
                  key={"share"}
                  source={images.share}
                  style={{
                    height: isPhoneDevice ? 20 : 30,
                    width: isPhoneDevice ? 20 : 30,
                    alignSelf: "center",
                    tintColor: "#FFFFFF",
                  }}
                  alt={"share"}
                />
              </YStack>
            </TouchableScale>
            {premium === false && <YStack flex={1} />}
            {premium === true ? (
              <></>
            ) : (
              <TouchableScale
                style={{
                  backgroundColor: "#1c2e4a",
                  borderRadius: isPhoneDevice ? 8 : 12,
                }}
                hitSlop={HIT_SLOP}
                onPress={() => {
                  presentPaywall();
                }}
              >
                <Image
                  key={"adsFree"}
                  source={images.adsFree}
                  style={{
                    height: iconSize + (isPhoneDevice ? 16 : 24),
                    width: iconSize + (isPhoneDevice ? 16 : 24),
                    alignSelf: "center",
                    tintColor: "#FFFFFF",
                  }}
                  alt={"Ads Free"}
                />
              </TouchableScale>
            )}
          </XStack>
        }
        rightElement={
          <XStack>
            <TouchableScale
              style={{
                paddingHorizontal: isPhoneDevice ? 8 : 12,
                paddingVertical: isPhoneDevice ? 8 : 12,
                backgroundColor: "#1c2e4a",
                borderRadius: isPhoneDevice ? 8 : 12,
              }}
              hitSlop={HIT_SLOP}
              onPress={() => {
                handleSectionPress("SETTING-SCREEN");
              }}
            >
              <Image
                key={"settings"}
                source={images.settings}
                style={{
                  height: isPhoneDevice ? 24 : 36,
                  width: isPhoneDevice ? 24 : 36,
                  alignSelf: "center",
                }}
                alt={"settings"}
              />
            </TouchableScale>
            <YStack w={isPhoneDevice ? 12 : 18} />
          </XStack>
        }
        leftElement={
          <XStack>
            <YStack w={isPhoneDevice ? 12 : 18} />
            <TouchableScale
              style={{
                paddingHorizontal: isPhoneDevice ? 8 : 12,
                paddingVertical: isPhoneDevice ? 8 : 12,
                backgroundColor: "#1c2e4a",
                borderRadius: isPhoneDevice ? 12 : 18,
              }}
              hitSlop={HIT_SLOP}
              onPress={() => {
                rateMyApp();
              }}
            >
              <YStack
                alignItems="center"
                justifyContent="center"
                height={iconSize}
                width={iconSize}
              >
                <Image
                  key={"rating"}
                  source={images.rating}
                  style={{
                    height: iconSize,
                    width: iconSize,
                    alignSelf: "center",
                    tintColor: "#FFFFFF",
                  }}
                  alt={"rating"}
                />
              </YStack>
            </TouchableScale>
          </XStack>
        }
      />

      <ResponsiveContent flex={1} backgroundColor={"$primary"}>
        <YStack alignItems="center" justifyContent="center">
          <AdsConfirmationDialog
            onPositivePress={() => {
              // Show Rewarded Ad
              if (isLoadedRewarded) {
                showRewardedAd();
              } else {
                // No advert ready to show yet, try to load and navigate directly
                loadRewardedAd();
                redirectToPlayGameScreen();
              }
            }}
            onNegativePress={() => {
              // User declined to watch ad, navigate directly
              // redirectToPlayGameScreen();
            }}
            showDialog={showRewardsAdsConfirmationPopup}
            setChangeShowDialogStatus={setShowRewardsAdsConfirmationPopup}
            content={`Watch a video to unlock this feature for ${duration} seconds!`}
          />
        </YStack>
        <YStack flex={1} justifyContent="center">
          <Image
            key={"icon"}
            source={images.icon}
            style={{
              height: isPhoneDevice ? 144 : 244,
              width: isPhoneDevice ? 144 : 244,
              alignSelf: "center",
              resizeMode: "center",
              borderRadius: 8
            }}
            alt={"icon"}
          />

          {premium === true && (
            <YStack
              bg={"$secondPrimaryColor"}
              alignSelf="center"
              p={isPhoneDevice ? 4 : 6}
              borderRadius={12}
              justifyContent="center"
              alignItems="center"
            >
              <XStack
                bg={"$secondPrimaryColor"}
                p={isPhoneDevice ? "$2" : "$3"}
                borderRadius={8}
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  key={"prePartyCategory"}
                  source={images.prePartyCategory}
                  style={{
                    height: isPhoneDevice ? 30 : 45,
                    width: isPhoneDevice ? 30 : 45,
                    alignSelf: "center",
                    resizeMode: "center",
                  }}
                  alt={"prePartyCategory"}
                />
                <YStack w={isPhoneDevice ? "$2" : "$3"} />
                <YStack>
                  <SizableText
                    fontSize={isPhoneDevice ? "$lg" : "$2xl"}
                    lineHeight={isPhoneDevice ? 26 : 40}
                    color={"$white"}
                    fontWeight={"$bold700"}
                    textAlign="center"
                  >
                    Premium Subscriber
                  </SizableText>

                  <SizableText
                    fontSize={isPhoneDevice ? "$xs" : "$lg"}
                    lineHeight={isPhoneDevice ? 18 : 26}
                    color={"$white"}
                    fontWeight={"$normal"}
                    textAlign="center"
                  >
                    Enjoy Ad-Free experience!
                  </SizableText>
                </YStack>
              </XStack>
            </YStack>
          )}
        </YStack>
        <YStack mx={isPhoneDevice ? "$6" : 0} my={"$6"}>
          <BasicButton
            height={isPhoneDevice ? 56 : 84}
            linearGradientProps={{ colors: ["#1c2e4a", "#1c2e4a"] }}
            onPress={() => {
              handleSectionPress("LEVEL-SELECTION-SCREEN");
            }}
          >
            <YStack width={responsiveWidth - 60} justifyContent="center">
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
          <YStack h={isPhoneDevice ? "$5" : "$8"} />
          <BasicButton
            height={isPhoneDevice ? 56 : 84}
            linearGradientProps={{ colors: ["#1c2e4a", "#1c2e4a"] }}
            onPress={() => {
              handleSectionPress("CATEGORY-SCREEN");
            }}
          >
            <YStack width={responsiveWidth - 60} justifyContent="center">
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
          <YStack h={isPhoneDevice ? "$5" : "$8"} />
          <BasicButton
            height={isPhoneDevice ? 56 : 84}
            linearGradientProps={{ colors: ["#1c2e4a", "#1c2e4a"] }}
            onPress={onPressTrainYourMind}
          >
            <YStack width={responsiveWidth - 60} justifyContent="center">
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
      <YStack h={insets.bottom} />

      {/* Interstitial Ad Loader */}
      <AdLoader
        isVisible={isPreparingToShow}
        message="Preparing ad, please wait..."
      />
    </YStack>
  );
}

export default () => (
  <ErrorBoundary>
    <WelcomeScreen />
  </ErrorBoundary>
);
