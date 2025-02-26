import { YStack } from "tamagui";
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
  staticPrivacyPolicy,
  staticRewardInterstitialAd,
} from "@modules/shared/components/helpers";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { AppManifest } from "../../app-manifest";
import { LANGUAGE_KEY } from "@modules/shared/components/constants";
import LocalStorage from "@utils/local-storage";

function SplashScreen() {
  const router = useRouter();
  const isRedirectedToNextScreen = useRef<boolean>(false);

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
  });

  function loadFirebaseApp() {
    // Initialize Firebase
    const firebaseConfig = AppManifest.extra.firebaseWeb;
    const app = initializeApp(firebaseConfig);
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    const colRef = collection(db, "verbal_fluency_game_configuration");
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
      global.showAds = false; //TODO
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

  return (
    <YStack
      flex={1}
      bg={"$primary"}
      alignItems="center"
      justifyContent="center"
    >
      <Image
        key={"letsPlayPrimary"}
        source={images.appIcon}
        style={{ height: 200, width: 200 }}
        alt={"letsPlayPrimary"}
      />
    </YStack>
  );
}

export default () => (
  <ErrorBoundary>
    <SplashScreen />
  </ErrorBoundary>
);
