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
export const staticAppOpenAd = isAndroid ? "ca-app-pub-5944540568418609/2618999213" : "ca-app-pub-5944540568418609/7327765955";
export const staticBannerAd = isAndroid ? "ca-app-pub-5944540568418609/5048887284" : "ca-app-pub-5944540568418609/6389254658";
export const staticInterstitialAd = isAndroid ? "ca-app-pub-5944540568418609/2298800559" : "ca-app-pub-5944540568418609/8640847625";
export const staticRewardInterstitialAd = isAndroid ? "ca-app-pub-5944540568418609/7631018288" : "ca-app-pub-5944540568418609/9184407569";
export const staticInterstitialAdIntervalClicks = 3;
export const staticInterstitialAdIntervalSeconds = 60;
export const staticPrivacyPolicy = "http://as2infotech.infinityfreeapp.com/privacy-policy-verbal-fluency.html";
export const appStoreLink = "https://apps.apple.com/app/verbal-fluency-game/id6480371490";
export const APPLE_STORE_ID = "id6480371490";

export const canShowAdmobInteratitial = () => {
  if (global?.showAds) {
    if ((global.interstitialAdIntervalClicks ?? staticInterstitialAdIntervalClicks) === (global.interstitialAdIntervalCurrentClicks ?? 0)) {
      global.interstitialAdIntervalCurrentClicks = 0;
      return true;
    } else {
      global.interstitialAdIntervalCurrentClicks = (global.interstitialAdIntervalCurrentClicks ?? 0) + 1;
      return false;
    }
  }

  return false;
}