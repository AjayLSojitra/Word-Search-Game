import { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import {
  AppOpenAd,
  AdEventType,
  TestIds,
  AdsConsent,
} from "react-native-google-mobile-ads";
import { staticAppOpenAd } from "./helpers";

const adUnitId = __DEV__
  ? TestIds.APP_OPEN
  : (global as any)?.appOpenAd ?? staticAppOpenAd;

export function useAppOpenAd() {
  const appState = useRef(AppState.currentState);
  const adLoaded = useRef(false);
  const [canShowAd, setCanShowAd] = useState(false);
  const canShowAdRef = useRef(canShowAd);
  const adRef = useRef<AppOpenAd | null>(null);
  const adListenerRef = useRef<(() => void) | null>(null);
  const subscriptionRef = useRef<{ remove: () => void } | null>(null);

  // Keep ref in sync with state
  useEffect(() => {
    canShowAdRef.current = canShowAd;
  }, [canShowAd]);

  // Check consent status
  useEffect(() => {
    const checkConsentAndLoadAd = async () => {
      try {
        const { canRequestAds } = await AdsConsent.getConsentInfo();
        setCanShowAd((global as any)?.showAds && canRequestAds);
      } catch (error) {
        console.error("Failed to check consent for app open ad:", error);
        setCanShowAd(false);
      }
    };

    checkConsentAndLoadAd();
  }, []);

  useEffect(() => {
    if (!canShowAd) {
      // Clean up if consent is revoked
      if (adRef.current && adListenerRef.current) {
        adListenerRef.current();
        adListenerRef.current = null;
      }
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      adRef.current = null;
      adLoaded.current = false;
      return;
    }

    const ad = AppOpenAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });
    adRef.current = ad;
    adLoaded.current = false;

    const onAdEvent = (event: { type: AdEventType; payload?: Error }) => {
      // Use ref to get latest value and avoid stale closures
      if (!canShowAdRef.current) {
        return;
      }

      if (event.type === AdEventType.LOADED) {
        adLoaded.current = true;
      } else if (event.type === AdEventType.CLOSED) {
        adLoaded.current = false;
        // Only reload if we still have consent
        if (canShowAdRef.current && adRef.current) {
          // Use a small delay to ensure the ad is fully closed
          setTimeout(() => {
            if (canShowAdRef.current && adRef.current) {
              adRef.current.load();
            }
          }, 100);
        }
      } else if (event.type === AdEventType.ERROR) {
        adLoaded.current = false;
        console.error("App open ad error:", event.payload);
      }
    };

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      // Use ref to get latest value and avoid stale closures
      if (!canShowAdRef.current || !adLoaded.current || !adRef.current) {
        appState.current = nextAppState;
        return;
      }

      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        // Only show when returning to the app and ad is loaded
        try {
          adRef.current.show();
        } catch (error) {
          console.error("Error showing app open ad:", error);
          adLoaded.current = false;
        }
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    subscriptionRef.current = subscription;

    const adListener = ad.addAdEventsListener(onAdEvent);
    adListenerRef.current = adListener;

    // Initial load
    ad.load();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      if (adListenerRef.current) {
        adListenerRef.current();
        adListenerRef.current = null;
      }
      adRef.current = null;
      adLoaded.current = false;
    };
  }, [canShowAd]);
}
