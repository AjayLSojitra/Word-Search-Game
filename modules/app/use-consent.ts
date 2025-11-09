import { useEffect, useRef, useState } from 'react';
import mobileAds, { AdsConsent, AdsConsentStatus } from 'react-native-google-mobile-ads';

export interface ConsentInfo {
  status: AdsConsentStatus;
  isConsentFormAvailable: boolean;
  canRequestAds: boolean;
}

export interface ConsentChoices {
  activelyScanDeviceCharacteristicsForIdentification: boolean;
  applyMarketResearchToGenerateAudienceInsights: boolean;
  createAPersonalisedAdsProfile: boolean;
  createAPersonalisedContentProfile: boolean;
  developAndImproveProducts: boolean;
  measureAdPerformance: boolean;
  measureContentPerformance: boolean;
  selectBasicAds: boolean;
  selectPersonalisedAds: boolean;
  selectPersonalisedContent: boolean;
  storeAndAccessInformationOnDevice: boolean;
  usePreciseGeolocationData: boolean;
}

export const useConsent = () => {
  const [consentInfo, setConsentInfo] = useState<ConsentInfo | null>(null);
  const [consentChoices, setConsentChoices] = useState<ConsentChoices | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobileAdsStartCalledRef = useRef(false);

  const initializeConsent = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Request consent information and load/present a consent form if necessary
      await AdsConsent.gatherConsent();
      
      // Get consent info
      const info = await AdsConsent.getConsentInfo();
      setConsentInfo(info);

      // Get user choices if consent is obtained
      if (info.status === AdsConsentStatus.OBTAINED) {
        const choices = await AdsConsent.getUserChoices();
        setConsentChoices(choices);
      }

      // Initialize Google Mobile Ads SDK if we can request ads
      if (info.canRequestAds && !isMobileAdsStartCalledRef.current) {
        isMobileAdsStartCalledRef.current = true;
        await mobileAds().initialize();
      }

    } catch (err) {
      console.error('Consent gathering failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to gather consent');
      
      // Still try to initialize ads with previous session consent
      try {
        const info = await AdsConsent.getConsentInfo();
        if (info.canRequestAds && !isMobileAdsStartCalledRef.current) {
          isMobileAdsStartCalledRef.current = true;
          await mobileAds().initialize();
        }
      } catch (initError) {
        console.error('Failed to initialize ads:', initError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetConsent = async () => {
    try {
      await AdsConsent.reset();
      setConsentInfo(null);
      setConsentChoices(null);
      isMobileAdsStartCalledRef.current = false;
    } catch (err) {
      console.error('Failed to reset consent:', err);
      setError(err instanceof Error ? err.message : 'Failed to reset consent');
    }
  };

  const requestConsentUpdate = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const info = await AdsConsent.requestInfoUpdate();
      setConsentInfo(info);
      
      if (info.status === AdsConsentStatus.OBTAINED) {
        const choices = await AdsConsent.getUserChoices();
        setConsentChoices(choices);
      }
    } catch (err) {
      console.error('Failed to request consent update:', err);
      setError(err instanceof Error ? err.message : 'Failed to request consent update');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeConsent();
  }, []);

  return {
    consentInfo,
    consentChoices,
    isLoading,
    error,
    resetConsent,
    requestConsentUpdate,
    initializeConsent,
  };
};
