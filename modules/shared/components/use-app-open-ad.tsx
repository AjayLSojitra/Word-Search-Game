import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import {
  AppOpenAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";
import { staticAppOpenAd } from "./helpers";

const adUnitId = __DEV__
  ? TestIds.APP_OPEN
  : global?.appOpenAd ?? staticAppOpenAd;

export function useAppOpenAd() {
  const appState = useRef(AppState.currentState);
  const adLoaded = useRef(false);

  useEffect(() => {
    const ad = AppOpenAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    const loadAd = () => {
      ad.load();
    };

    const showAd = () => {
      if (global?.showAds && adLoaded.current) {
        ad.show();
      }
    };

    const onAdEvent = (event: { type: AdEventType; payload: Error }) => {
      if (event.type === AdEventType.LOADED) {
        adLoaded.current = true;
      } else if (event.type === AdEventType.CLOSED) {
        adLoaded.current = false;
        ad.load(); // Preload the next ad
      } else if (event.type === AdEventType.ERROR) {
        adLoaded.current = false;
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          // Only show when returning to the app
          showAd();
        }
        appState.current = nextAppState;
      }
    );

    const adListener = ad.addAdEventsListener(onAdEvent);

    // Initial load
    loadAd();

    return () => {
      subscription.remove();
      adListener();
    };
  }, []);
}
