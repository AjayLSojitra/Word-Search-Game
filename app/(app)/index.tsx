import { SizableText, YStack } from "tamagui";
import { Image, Platform } from "react-native";
import images from "@assets/images/images";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import ErrorBoundary from "@modules/shared/components/error-boundary";
import {
  languages,
  staticAppOpenAd,
  staticBannerAd,
  staticDefaultLanguage,
  staticInterstitialAd,
  staticInterstitialAdIntervalClicks,
  staticInterstitialAdIntervalSeconds,
  staticPoweredBy,
  staticPrivacyPolicy,
  staticRewardInterstitialAd,
} from "@modules/shared/components/helpers";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { AppManifest } from "../../app-manifest";
import {
  CATEGORIES_KEY,
  LANGUAGE_KEY,
} from "@modules/shared/components/constants";
import LocalStorage from "@utils/local-storage";
import contents from "@assets/contents/contents";
import { triggerEvent } from "@modules/shared/components/use-triggered-event";
import { DeviceType, deviceType } from "expo-device";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  signInAnonymously,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

function SplashScreen() {
  const router = useRouter();
  const isRedirectedToNextScreen = useRef<boolean>(false);

  function fetchStaticCategoriesOnFallback() {
    LocalStorage.setItemDefault(
      CATEGORIES_KEY,
      JSON.stringify(contents.categories),
      () => {
        triggerEvent("CategoriesDataAdded");
      }
    );
  }

  const fetchCurrentLanguage = () => {
    LocalStorage.getItemDefault(LANGUAGE_KEY).then((val) => {
      if (val) {
        global.currentSelectedLanguage = val;
      } else {
        global.currentSelectedLanguage = languages[0].name;
      }
    });
  };

  useEffect(() => {
    fetchCurrentLanguage();
    fetchStaticCategoriesOnFallback();
  });

  async function loadFirebaseApp() {
    // Initialize Firebase
    const firebaseConfig = AppManifest.extra.firebaseWeb;
    const app = initializeApp(firebaseConfig);

    //Authentication
    try {
      const auth = getAuth(app);
      await setPersistence(
        auth,
        getReactNativePersistence(ReactNativeAsyncStorage)
      );
      await signInAnonymously(auth);
    } catch (error) {
      console.log(error);
    }

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    const colRef = collection(db, "word-search-game-config");
    const isAndroid = Platform.OS === "android";

    onSnapshot(colRef, (snapshot) => {
      const releaseModeAndroid = snapshot?.docs[0];
      const releaseModeiOS = snapshot?.docs[1];
      const releaseMode = isAndroid ? releaseModeAndroid : releaseModeiOS;

      const serverConfigEnable = releaseMode?.get("serverConfigEnable") ?? true;
      const showAds = releaseMode?.get("showAds") ?? false;

      const appOpenAd = serverConfigEnable
        ? releaseMode?.get("appOpenAd") ?? ""
        : staticAppOpenAd;
      const bannerAd = serverConfigEnable
        ? releaseMode?.get("bannerAd") ?? ""
        : staticBannerAd;
      const interstitialAd = serverConfigEnable
        ? releaseMode?.get("interstitialAd") ?? ""
        : staticInterstitialAd;
      const interstitialAdIntervalClicks = serverConfigEnable
        ? releaseMode?.get("interstitialAdIntervalClicks") ?? ""
        : staticInterstitialAdIntervalClicks;
      const interstitialAdIntervalSeconds = serverConfigEnable
        ? releaseMode?.get("interstitialAdIntervalSeconds") ?? ""
        : staticInterstitialAdIntervalSeconds;
      const defaultLanguage = serverConfigEnable
        ? releaseMode?.get("defaultLanguage") ?? staticDefaultLanguage
        : staticDefaultLanguage;
      const rewardInterstitialAd = serverConfigEnable
        ? releaseMode?.get("rewardInterstitialAd") ?? ""
        : staticRewardInterstitialAd;
      const privacy_policy = serverConfigEnable
        ? releaseMode?.get("privacy_policy") ?? ""
        : staticPrivacyPolicy;
      const show_review_popup = releaseMode?.get("show_review_popup") ?? "";

      global.appOpenAd = appOpenAd;
      global.bannerAd = bannerAd;
      global.interstitialAd = interstitialAd;
      global.interstitialAdIntervalClicks = interstitialAdIntervalClicks;
      global.interstitialAdIntervalSeconds = interstitialAdIntervalSeconds;
      global.rewardInterstitialAd = rewardInterstitialAd;
      global.serverConfigEnable = serverConfigEnable;
      global.defaultLanguage = defaultLanguage;
      global.showAds = showAds;
      global.privacy_policy = privacy_policy;
      global.show_review_popup = show_review_popup;

      redirectToWelcomeScreen();
    });
  }

  useEffect(() => {
    setTimeout(() => {
      redirectToWelcomeScreen();
    }, 3000);
  }, []);

  useEffect(() => {
    loadFirebaseApp();
  }, []);

  const redirectToWelcomeScreen = () => {
    if (!isRedirectedToNextScreen.current) {
      isRedirectedToNextScreen.current = true;
      router.replace(`./welcome`);
    }
  };

  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <YStack
      flex={1}
      bg={"$primary"}
      alignItems="center"
      justifyContent="center"
    >
      <Image
        key={"icon"}
        source={images.icon}
        style={{
          height: isPhoneDevice ? 200 : 300,
          width: isPhoneDevice ? 200 : 300,
          resizeMode: "center",
        }}
        alt={"icon"}
      />

      <YStack zIndex={1} pos="absolute" bottom={"$4"}>
        <SizableText
          fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
          lineHeight={isPhoneDevice ? 22 : 30}
          color={"$black"}
          fontWeight={"700"}
          textAlign="center"
        >
          {`Powered by ${global?.poweredBy ?? staticPoweredBy}`}
        </SizableText>
      </YStack>
    </YStack>
  );
}

export default () => (
  <ErrorBoundary>
    <SplashScreen />
  </ErrorBoundary>
);
