import { SizableText, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import ResponsiveContent from "@modules/shared/responsive-content";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import {
  canShowAdmobInteratitial,
  staticInterstitialAd,
} from "@modules/shared/components/helpers";
import { useEffect } from "react";
import contents from "@assets/contents/contents";
import TouchableScale from "@design-system/components/shared/touchable-scale";

function CategoriesScreen() {
  const languageData =
    contents.categories?.[global?.currentSelectedLanguage ?? "English"];

  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isLoaded, isClosed, load, show, isShowing } = useInterstitialAd(
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
      redirectToNextScreenAfterAdmobInterstitial();
    }
  }, [isClosed]);

  const redirectToNextScreenAfterAdmobInterstitial = () => {};

  const renderItem = ({ item }) => (
    <TouchableScale
      onPress={() => {
        router.push(`./countdown?item=${item}&&duration=${180}`);
      }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
      }}
    >
      <SizableText
        fontSize={16}
        fontWeight={"600"}
        color={"#1c2e4a"}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {item}
      </SizableText>
    </TouchableScale>
  );

  const keyExtractor = (item, index) => index.toString();

  const filteredData = Object.entries(languageData)
    .filter(([key]) => key !== "Choose_Category")
    .map(([key, value]) => value);

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader
        title={languageData.Choose_Category}
        backgroundColor={"$primary"}
      />
      <ResponsiveContent flex={1}>
        <YStack flex={1} mx={"$3"} justifyContent="center">
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={filteredData} // Use the category values from languageData
            renderItem={renderItem}
            keyExtractor={keyExtractor} // Ensure each item has a unique key
            numColumns={2} // Display in 2 columns
          />
        </YStack>
      </ResponsiveContent>
      {!isShowing && <AdmobBanner />}
      <YStack h={insets.bottom} />
    </YStack>
  );
}

export default CategoriesScreen;
