import * as WebBrowser from "expo-web-browser";
import { Linking, Platform, Share } from "react-native";

export function getSubstring(
  value: string,
  endSubstringNumber: number
): string {
  if (value.length >= endSubstringNumber) {
    return value.substring(0, endSubstringNumber);
  }

  return value;
}

export async function openBrowser(
  url: string
): Promise<WebBrowser.WebBrowserResultType> {
  const pattern = /^((http|https|ftp):\/\/)/;
  if (pattern.test(url)) {
    const result = await WebBrowser.openBrowserAsync(url);
    return result.type;
  }

  return WebBrowser.WebBrowserResultType.CANCEL;
}

export async function shareMyApp() {
  try {
    Share.share({
      message: `Download "Word Search Game" now!
      \nGoogle Play Store link: https://play.google.com/store/apps/details?id=${
        global?.androidPackageName ?? staticAndroidPackageName
      }
      \nApp Store link: ${global?.appStoreLink ?? appStoreLink}`,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function rateMyApp() {
  try {
    if (Platform.OS === "android") {
      //To open the Google Play Store
      Linking.openURL(
        `market://details?id=${
          global?.androidPackageName ?? staticAndroidPackageName
        }`
      ).catch((err) => console.log(err));
    } else if (Platform.OS === "ios") {
      //To open the Apple App Store
      Linking.openURL(
        `itms-apps://itunes.apple.com.app/${
          global?.APPLE_STORE_ID ?? APPLE_STORE_ID
        }`
      ).catch((err) => console.log(err));
    }
  } catch (e) {
    console.log(e);
  }
}

//STATIC ADS IDS
const isAndroid = Platform.OS === "android";
export const staticAppOpenAd = isAndroid
  ? "ca-app-pub-1802560534115589/6978243138"
  : "ca-app-pub-1802560534115589/1498685742";
export const staticBannerAd = isAndroid
  ? "ca-app-pub-1802560534115589/1690257431"
  : "ca-app-pub-1802560534115589/4124849088";
export const staticInterstitialAd = isAndroid
  ? "ca-app-pub-1802560534115589/7611748088"
  : "ca-app-pub-1802560534115589/2048430216";
export const staticRewardInterstitialAd = isAndroid
  ? "ca-app-pub-1802560534115589/8064094096"
  : "ca-app-pub-1802560534115589/2811767413";
export const staticInterstitialAdIntervalClicks = 4;
export const staticInterstitialAdIntervalSeconds = 60;
export const staticDefaultLanguage = "English";
export const staticSupportEmail = "srkwebstudio@gmail.com";
export const staticPoweredBy = "SRK Webstudio";
export const staticPrivacyPolicy =
  "https://doc-hosting.flycricket.io/srkwebstudio-privacy-policy/64f68df3-4304-4de0-84b6-8b293a40f23b/privacy";
export const appStoreLink =
  "https://apps.apple.com/app/word-search-game/id0123456789";
export const staticAndroidPackageName =
  "com.shreeramkrishna.wordsearch.spelling.checker";
export const APPLE_STORE_ID = "id0123456789";

export const canShowAdmobInteratitial = () => {
  if (global?.showAds) {
    if (
      (global.interstitialAdIntervalClicks ??
        staticInterstitialAdIntervalClicks) ===
      (global.interstitialAdIntervalCurrentClicks ?? 0)
    ) {
      global.interstitialAdIntervalCurrentClicks = 0;
      return true;
    } else {
      global.interstitialAdIntervalCurrentClicks =
        (global.interstitialAdIntervalCurrentClicks ?? 0) + 1;
      return false;
    }
  }

  return false;
};
export const languages = [
  { name: "English" },
  { name: "Hindi" },
  { name: "Chinese" },
  { name: "Spanish" },
  { name: "Italian" },
  { name: "Portuguese" },
  { name: "Russian" },
  { name: "French" },
  { name: "German" },
  { name: "Urdu" },
];
