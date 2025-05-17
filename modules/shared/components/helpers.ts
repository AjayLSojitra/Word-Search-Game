import BeautyPersonalCareIcon from "@assets/svgs/beauty-personal-care-icon";
import BooksStationaryIcon from "@assets/svgs/books-stationary-icon";
import ClothingAccessoriesIcon from "@assets/svgs/clothing-accessories-icon";
import CookingApplicanesIcon from "@assets/svgs/cooking-appliances-icon";
import ElectronicsIcon from "@assets/svgs/electronics-icon";
import FirstAidItemsIcon from "@assets/svgs/first-aid-items-icon";
import FruitsIcon from "@assets/svgs/fruits-icon";
import HealthFitnessIcon from "@assets/svgs/health-fitness-icon";
import HomeDecorIcon from "@assets/svgs/home-decor-icon";
import HouseholdItemsIcon from "@assets/svgs/household-items-icon";
import MusicalInstrumentsIcon from "@assets/svgs/musical-instruments-icon";
import OfficeSuppliesIcon from "@assets/svgs/office-supplies-icon";
import PetsSuppliesIcon from "@assets/svgs/pets-supplies-icon";
import SnacksIcon from "@assets/svgs/snacks-icon";
import SportsIcon from "@assets/svgs/sports-icon";
import ToysGamesIcon from "@assets/svgs/toys-games-icon";
import VegatablesIcon from "@assets/svgs/vegetables-icon";
import VehiclesIcon from "@assets/svgs/vehicles-icon";
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
      message: `Download WordSpark now and make every word count!
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
  ? "ca-app-pub-1802560534115589/3327967921"
  : "ca-app-pub-1802560534115589/2432547018";
export const staticBannerAd = isAndroid
  ? "ca-app-pub-1802560534115589/4641049596"
  : "ca-app-pub-1802560534115589/3254674092";
export const staticInterstitialAd = isAndroid
  ? "ca-app-pub-1802560534115589/7099691976"
  : "ca-app-pub-1802560534115589/4096164236";
export const staticRewardInterstitialAd = isAndroid
  ? "ca-app-pub-1802560534115589/9628510757"
  : "ca-app-pub-1802560534115589/1470000897";
export const staticInterstitialAdIntervalClicks = 10;
export const staticInterstitialAdIntervalSeconds = 60;
export const staticDefaultLanguage = "English";
export const staticSupportEmail = "srkwebstudio@gmail.com";
export const staticPoweredBy = "SRK Webstudio";
export const staticPrivacyPolicy =
  "https://doc-hosting.flycricket.io/srkwebstudio-privacy-policy/64f68df3-4304-4de0-84b6-8b293a40f23b/privacy";
export const appStoreLink =
  "https://apps.apple.com/app/word-search-game/id6745386392";
export const staticAndroidPackageName =
  "com.shreeramkrishna.wordsearch.spelling.checker";
export const APPLE_STORE_ID = "id6745386392";

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

export const catrgoriesIcons = [
  VehiclesIcon,
  FruitsIcon,
  SnacksIcon,
  VegatablesIcon,
  HouseholdItemsIcon,
  SportsIcon,
  FirstAidItemsIcon,
  MusicalInstrumentsIcon,
  BooksStationaryIcon,
  CookingApplicanesIcon,
  ClothingAccessoriesIcon,
  ElectronicsIcon,
  HomeDecorIcon,
  HealthFitnessIcon,
  BeautyPersonalCareIcon,
  ToysGamesIcon,
  OfficeSuppliesIcon,
  PetsSuppliesIcon,
];
