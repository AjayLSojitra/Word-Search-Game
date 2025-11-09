import { useEffect, useState, useCallback, useRef } from "react";
import {
  RewardedAd,
  AdEventType,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";
import { AdsConsent } from "react-native-google-mobile-ads";
import { staticRewardInterstitialAd } from "@modules/shared/components/helpers";

interface UseRewardedAdProps {
  onAdClosed?: () => void;
  onAdFailedToLoad?: (error: any) => void;
  onAdAttempt?: (willShow: boolean, reason?: string) => void;
  onRewardEarned?: (reward: { type: string; amount: number }) => void;
}

export const useRewardedAd = ({
  onAdClosed,
  onAdFailedToLoad,
  onAdAttempt,
  onRewardEarned,
}: UseRewardedAdProps = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [canShowAd, setCanShowAd] = useState(false);
  const [rewardedAd, setRewardedAd] = useState<RewardedAd | null>(null);
  const hasLoadedRef = useRef(false);
  const isShowingRef = useRef(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const checkConsentAndLoadAd = async () => {
      try {
        const consentInfo = await AdsConsent.getConsentInfo();
        if (consentInfo && typeof consentInfo.canRequestAds === "boolean") {
          setCanShowAd((global as any)?.showAds && consentInfo.canRequestAds);
        } else {
          console.warn("Invalid consent info received");
          setCanShowAd(false);
        }
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
      // Clean up event listeners when component unmounts or ad changes
      if (unsubscribeRef.current) {
        try {
          unsubscribeRef.current();
          unsubscribeRef.current = null;
        } catch (error) {
          console.log("Error cleaning up ad listeners:", error);
        }
      }
    };
  }, [rewardedAd]);

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

    // Clean up previous ad's event listeners if they exist
    if (unsubscribeRef.current) {
      try {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      } catch (error) {
        console.log("Error cleaning up previous ad listeners:", error);
      }
    }

    setIsLoading(true);
    setIsLoaded(false);
    hasLoadedRef.current = true;

    const unitId = __DEV__
      ? TestIds.REWARDED
      : (global as any)?.rewardInterstitialAd ?? staticRewardInterstitialAd;

    if (!unitId) {
      console.error("Rewarded ad unit ID is not available");
      setIsLoading(false);
      hasLoadedRef.current = false;
      onAdFailedToLoad?.(new Error("Ad unit ID not available"));
      return;
    }

    const ad = RewardedAd.createForAdRequest(unitId, {
      requestNonPersonalizedAdsOnly: false,
    });

    if (!ad) {
      console.error("Failed to create rewarded ad instance");
      setIsLoading(false);
      hasLoadedRef.current = false;
      onAdFailedToLoad?.(new Error("Failed to create ad instance"));
      return;
    }

    const unsubscribeLoaded = ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log("Rewarded ad loaded");
      setIsLoaded(true);
      setIsLoading(false);
    });

    const unsubscribeClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
      console.log("Rewarded ad closed");
      setIsLoaded(false);
      hasLoadedRef.current = false; // Reset to allow reloading
      isShowingRef.current = false; // Reset showing flag
      onAdClosed?.();
    });

    const unsubscribeEarned = ad.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("Rewarded ad earned reward:", reward);
        onRewardEarned?.(reward);
      }
    );

    const unsubscribeError = ad.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.error("Rewarded ad failed to load:", error);
        setIsLoaded(false);
        setIsLoading(false);
        hasLoadedRef.current = false; // Reset to allow reloading
        onAdFailedToLoad?.(error);
      }
    );

    // Store cleanup function with null checks
    unsubscribeRef.current = () => {
      try {
        if (unsubscribeLoaded) unsubscribeLoaded();
        if (unsubscribeClosed) unsubscribeClosed();
        if (unsubscribeEarned) unsubscribeEarned();
        if (unsubscribeError) unsubscribeError();
      } catch (error) {
        console.log("Error unsubscribing from ad events:", error);
      }
    };

    try {
      ad.load();
      setRewardedAd(ad);
    } catch (error) {
      console.error("Error loading rewarded ad:", error);
      setIsLoading(false);
      setIsLoaded(false);
      hasLoadedRef.current = false;
      // Clean up listeners if load fails
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      onAdFailedToLoad?.(error);
    }
  }, [canShowAd, onAdClosed, onAdFailedToLoad, onRewardEarned]);

  const showAd = useCallback(() => {
    if (!canShowAd) {
      console.log("Cannot show ad: consent not granted or ads disabled");
      onAdAttempt?.(false, "Consent not granted or ads disabled");
      return;
    }

    // Prevent multiple simultaneous show attempts
    if (isShowingRef.current) {
      console.log("Ad is already being shown");
      onAdAttempt?.(false, "Ad already being shown");
      return;
    }

    if (!rewardedAd || !isLoaded) {
      console.log("Rewarded ad not ready to show");
      onAdAttempt?.(false, "Ad not loaded or ready");
      return;
    }

    // All conditions met - ad will show
    onAdAttempt?.(true, "Ad will show");

    try {
      isShowingRef.current = true;
      if (rewardedAd && typeof rewardedAd.show === "function") {
        rewardedAd.show();
      } else {
        throw new Error("Rewarded ad show method is not available");
      }
    } catch (error) {
      console.error("Error showing rewarded ad:", error);
      isShowingRef.current = false;
      onAdAttempt?.(
        false,
        `Error showing ad: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }, [rewardedAd, isLoaded, canShowAd, onAdAttempt]);

  return {
    isLoaded,
    isLoading,
    canShowAd,
    loadAd,
    showAd,
  };
};
