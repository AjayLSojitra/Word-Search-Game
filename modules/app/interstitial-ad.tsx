import { useEffect, useState, useCallback, useRef } from "react";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";
import { AdsConsent } from "react-native-google-mobile-ads";
import { staticInterstitialAd } from "@modules/shared/components/helpers";

// Global click counter - persists across all hook instances
let globalClickCount = 0;
let globalLastAdShown = 0;

interface UseInterstitialAdProps {
  isForceShowAd?: boolean;
  onAdClosed?: () => void;
  onAdFailedToLoad?: (error: any) => void;
  onAdAttempt?: (willShow: boolean, reason?: string) => void;
}

export const useInterstitialAd = ({
  isForceShowAd = false,
  onAdClosed,
  onAdFailedToLoad,
  onAdAttempt,
}: UseInterstitialAdProps = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreparingToShow, setIsPreparingToShow] = useState(false);
  const [canShowAd, setCanShowAd] = useState(false);
  const [interstitialAd, setInterstitialAd] = useState<InterstitialAd | null>(
    null
  );
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const checkConsentAndLoadAd = async () => {
      try {
        const { canRequestAds } = await AdsConsent.getConsentInfo();
        setCanShowAd((global as any)?.showAds && canRequestAds);
      } catch (error) {
        console.error("Failed to check consent for ads:", error);
        setCanShowAd(false);
      }
    };

    checkConsentAndLoadAd();
  }, []);

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      if (interstitialAd) {
        // Clean up any existing ad listeners
        try {
          interstitialAd.removeAllListeners?.();
        } catch (error) {
          console.log("Error cleaning up ad listeners:", error);
        }
      }
    };
  }, [interstitialAd]);

  const loadAd = useCallback(() => {
    if (!canShowAd) {
      console.log("Cannot load ad: consent not granted or ads disabled");
      return;
    }

    // Prevent multiple simultaneous loads
    if (isLoading || hasLoadedRef.current) {
      console.log("Ad is already loading or loaded");
      return;
    }

    setIsLoading(true);
    setIsLoaded(false);
    hasLoadedRef.current = true;

    const unitId = __DEV__
      ? TestIds.INTERSTITIAL
      : (global as any)?.interstitialAd ?? staticInterstitialAd;

    const ad = InterstitialAd.createForAdRequest(unitId, {
      requestNonPersonalizedAdsOnly: false,
    });

    const unsubscribeLoaded = ad.addAdEventListener(AdEventType.LOADED, () => {
      console.log("Interstitial ad loaded");
      setIsLoaded(true);
      setIsLoading(false);
    });

    const unsubscribeClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
      console.log("Interstitial ad closed");
      setIsLoaded(false);
      setIsPreparingToShow(false);
      hasLoadedRef.current = false; // Reset to allow reloading
      onAdClosed?.();
    });

    const unsubscribeError = ad.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.error("Interstitial ad failed to load:", error);
        setIsLoaded(false);
        setIsLoading(false);
        setIsPreparingToShow(false);
        hasLoadedRef.current = false; // Reset to allow reloading
        onAdFailedToLoad?.(error);
      }
    );

    ad.load();

    setInterstitialAd(ad);

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, [canShowAd, onAdClosed, onAdFailedToLoad]);

  const showAd = useCallback(() => {
    if (!canShowAd) {
      console.log("Cannot show ad: consent not granted or ads disabled");
      onAdAttempt?.(false, "Consent not granted or ads disabled");
      return;
    }

    // Prevent multiple simultaneous show attempts
    if (isPreparingToShow) {
      console.log("Ad is already being prepared to show");
      onAdAttempt?.(false, "Ad already being prepared");
      return;
    }

    const intervalClicks = (global as any)?.interstitialAdIntervalClicks ?? 3;
    const intervalSeconds =
      (global as any)?.interstitialAdIntervalSeconds ?? 30;

    // Always increment global click count first
    globalClickCount += 1;

    if (!interstitialAd || !isLoaded) {
      console.log("Interstitial ad not ready to show");
      onAdAttempt?.(false, "Ad not loaded or ready");
      return;
    }

    // Check click count requirement first
    if (!isForceShowAd && globalClickCount < intervalClicks) {
      const remainingClicks = intervalClicks - globalClickCount;
      console.log(`Need ${remainingClicks} more clicks to show ad`);
      onAdAttempt?.(false, `Need ${remainingClicks} more clicks`);
      return;
    }

    // Only check time interval AFTER click count is satisfied
    const currentTime = Date.now();
    if (
      !isForceShowAd &&
      currentTime - globalLastAdShown < intervalSeconds * 1000
    ) {
      const waitTime = Math.ceil(
        (intervalSeconds * 1000 - (currentTime - globalLastAdShown)) / 1000
      );
      console.log(`Ad cooldown active. Wait ${waitTime} seconds`);
      onAdAttempt?.(false, `Ad cooldown active. Wait ${waitTime} seconds`);
      return;
    }

    // All conditions met - ad will show
    onAdAttempt?.(true, "Ad will show");

    // Set preparing state to show loader
    setIsPreparingToShow(true);

    // Add a small delay to show the loader and prevent accidental clicks
    setTimeout(() => {
      try {
        interstitialAd.show();
        globalClickCount = 0; // Reset global click count
        globalLastAdShown = currentTime; // Update global last ad shown time
      } catch (error) {
        console.error("Error showing interstitial ad:", error);
        setIsPreparingToShow(false);
      }
    }, 1500); // 1500ms delay to show loader
  }, [
    interstitialAd,
    isLoaded,
    canShowAd,
    isPreparingToShow,
    onAdAttempt,
    isForceShowAd,
  ]);

  return {
    isLoaded,
    isLoading,
    isPreparingToShow,
    canShowAd,
    loadAd,
    showAd,
  };
};
