import { YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import ResponsiveContent from "@modules/shared/responsive-content";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import {
  canShowAdmobInteratitial,
  catrgoriesIcons,
  staticInterstitialAd,
} from "@modules/shared/components/helpers";
import { useCallback, useEffect, useRef, useState } from "react";
import contents from "@assets/contents/contents";
import AdsNotifyDialog from "@modules/shared/components/confirmation-dialog/ads-notify-dialog";
import CategoryItem from "./category-item";
import { DeviceType, deviceType } from "expo-device";

function CategoriesScreen() {
  const languageData =
    contents.categories?.[global?.currentSelectedLanguage ?? "English"];
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  const insets = useSafeAreaInsets();
  const router = useRouter();
  const redirectTo = useRef<"PLAY-GAME" | "IGNORE">();
  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    __DEV__
      ? TestIds.INTERSTITIAL_VIDEO
      : global?.interstitialAd ?? staticInterstitialAd
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (error) {
      setShowAdsConfirmationPopup(false);
    }
  }, [error]);

  useEffect(() => {
    if (isClosed) {
      load();

      // Action after the ad is closed
      setShowAdsConfirmationPopup(false);
      redirectToNextScreenAfterAdmobInterstitial();
    }
  }, [isClosed]);

  const [showAdsConfirmationPopup, setShowAdsConfirmationPopup] =
    useState(false);
  const showInterstitial = () => {
    setShowAdsConfirmationPopup(true);
    setTimeout(() => {
      show();
    }, 2000);
  };

  const selectedCategory = useRef<any>();

  const redirectToNextScreenAfterAdmobInterstitial = () => {
    if (redirectTo.current === "PLAY-GAME") {
      router.push(`./play-game?category=${selectedCategory.current}`);
    }
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <CategoryItem
          category={item}
          icon={catrgoriesIcons[index]}
          onPress={() => {
            selectedCategory.current = item;
            redirectTo.current = "PLAY-GAME";
            if (isLoaded && canShowAdmobInteratitial()) {
              showInterstitial();
            } else {
              // No advert ready to show yet
              redirectToNextScreenAfterAdmobInterstitial();
            }
          }}
        />
      );
    },
    [
      selectedCategory.current,
      redirectTo.current,
      isLoaded,
      canShowAdmobInteratitial(),
    ]
  );

  const keyExtractor = useCallback(
    (item, index) => (item ?? "") + (index ?? 0),
    []
  );

  const renderFooter = useCallback(() => {
    return <YStack h={insets.bottom} />;
  }, [insets.bottom]);

  const categories = Object.entries(languageData)
    .filter(([key]) => key !== "Choose_Category")
    .map(([key, value]) => value);

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader
        title={languageData.Choose_Category}
        backgroundColor={"$primary"}
      />
      <ResponsiveContent flex={1}>
        <YStack alignItems="center" justifyContent="center">
          <AdsNotifyDialog
            showDialog={showAdsConfirmationPopup}
            content={`Ad is loading...`}
          />
        </YStack>
        <YStack
          flex={1}
          mx={isPhoneDevice ? "$2" : 0}
          mt={isPhoneDevice ? "$4" : "$6"}
          justifyContent="center"
        >
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={categories}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListFooterComponent={renderFooter}
            horizontal={false}
            numColumns={isPhoneDevice ? 2 : 3}
          />
        </YStack>
      </ResponsiveContent>
    </YStack>
  );
}

export default CategoriesScreen;
