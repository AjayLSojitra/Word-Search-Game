import { SizableText, View, XStack, Text, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { useFocusEffect, useRouter } from "expo-router";
import BasicButton from "@design-system/components/buttons/basic-button";
import images from "@assets/images/images";
import { FlatList, Image, TouchableOpacity } from "react-native";
import ResponsiveContent from "@modules/shared/responsive-content";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import {
  canShowAdmobInteratitial,
  staticInterstitialAd,
} from "@modules/shared/components/helpers";
import { useCallback, useEffect, useRef, useState } from "react";
import contents from "@assets/contents/contents";
import LocalStorage from "@utils/local-storage";
import { CATEGORIES_KEY } from "@modules/shared/components/constants";

function LevelSelectionScreen() {
  const languageData =
    contents.levelSelectionScreenSelectedLanguage?.[
      global?.currentSelectedLanguage ?? "English"
    ];
  const [categoriesData, setCategoriesData] = useState([]);
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );
  const loadData = async () => {
    LocalStorage.getItemDefault(CATEGORIES_KEY).then((val) => {
      if (val) {
        const categoriesData = JSON.parse(val);
        setCategoriesData(categoriesData); // Set categories data from LocalStorage
      }
    });
  };

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

  const redirectToNextScreenAfterAdmobInterstitial = () => {};

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        router.push(`./init-game`);
      }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        backgroundColor: "#1c2e4a",
        padding: 20,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const keyExtractor = (item, index) => index.toString();

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader title={"Choose Category"} backgroundColor={"$primary"} />
      <ResponsiveContent flex={1}>
        <YStack flex={1} mx={"$3"} justifyContent="center">
          <FlatList
            showsHorizontalScrollIndicator={false} // Ensures no horizontal scrollbar
            showsVerticalScrollIndicator={false}
            data={categoriesData}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            numColumns={2} // This makes the list display in 2 columns
          />
        </YStack>
      </ResponsiveContent>
      {!isShowing && <AdmobBanner />}
      <YStack h={insets.bottom} />
    </YStack>
  );
}

export default LevelSelectionScreen;
