import { YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import ResponsiveContent from "@modules/shared/responsive-content";
import { catrgoriesIcons } from "@modules/shared/components/helpers";
import { useCallback, useEffect, useRef, useState } from "react";
import contents from "@assets/contents/contents";
import { InteractionManager } from "react-native";
import CategoryItem from "./category-item";
import { DeviceType, deviceType } from "expo-device";
import { useInterstitialAd } from "@modules/app/interstitial-ad";
import { AdLoader } from "@modules/app/ad-loader";

function CategoriesScreen() {
  const languageData =
    contents.categories?.[
      (global as any)?.currentSelectedLanguage ?? "English"
    ];
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Store pending navigation
  const pendingNavigationRef = useRef<(() => void) | null>(null);

  const executePendingNavigation = () => {
    if (pendingNavigationRef.current) {
      pendingNavigationRef.current();
      pendingNavigationRef.current = null;
    }
  };

  const handleSectionPress = (value: string) => {
    // Store the navigation action
    pendingNavigationRef.current = () => {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          try {
            switch (value) {
              case "PLAY-GAME":
                router.push(`./play-game?category=${selectedCategory.current}`);
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

  // Load interstitial ad when component mounts
  useEffect(() => {
    loadAd();
  }, [loadAd]);

  const selectedCategory = useRef<any>(undefined);

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      return (
        <CategoryItem
          category={item}
          icon={catrgoriesIcons[index]}
          onPress={() => {
            selectedCategory.current = item;
            handleSectionPress("PLAY-GAME");
          }}
        />
      );
    },
    [selectedCategory.current, pendingNavigationRef]
  );

  const keyExtractor = useCallback(
    (item: string, index: number) => (item ?? "") + (index ?? 0),
    []
  );

  const renderFooter = useCallback(() => {
    return <YStack h={insets.bottom} />;
  }, [insets.bottom]);

  const categories: string[] = Object.entries(languageData)
    .filter(([key]) => key !== "Choose_Category")
    .map(([key, value]) => value as string);

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader
        title={languageData.Choose_Category}
        backgroundColor={"$primary"}
      />
      <ResponsiveContent flex={1}>
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

      {/* Interstitial Ad Loader */}
      <AdLoader
        isVisible={isPreparingToShow}
        message="Preparing ad, please wait..."
      />
    </YStack>
  );
}

export default CategoriesScreen;
