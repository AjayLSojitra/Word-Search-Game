import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";

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
export const staticSupportEmail = "srkwebstudio@gmail.com";
export const staticPoweredBy = "SRK Webstudio";
export const staticPrivacyPolicy =
  "http://as2infotech.infinityfreeapp.com/privacy-policy-verbal-fluency.html";
export const appStoreLink =
  "https://apps.apple.com/app/verbal-fluency-game/id6480371490";
export const staticAndroidPackageName =
  "com.shreeramkrishna.wordsearch.spelling.checker";
export const APPLE_STORE_ID = "id6480371490";

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
