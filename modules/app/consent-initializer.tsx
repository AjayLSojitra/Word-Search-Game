import React, { useEffect, useRef } from "react";
import mobileAds, { AdsConsent } from "react-native-google-mobile-ads";

interface ConsentInitializerProps {
  children: React.ReactNode;
}

export const ConsentInitializer: React.FC<ConsentInitializerProps> = ({
  children,
}) => {
  const isMobileAdsStartCalledRef = useRef(false);

  useEffect(() => {
    const initializeConsentAndAds = async () => {
      try {
        // Request consent information and load/present a consent form if necessary
        await AdsConsent.gatherConsent();

        // Get consent info
        const { canRequestAds } = await AdsConsent.getConsentInfo();

        // Initialize Google Mobile Ads SDK if we can request ads
        if (canRequestAds && !isMobileAdsStartCalledRef.current) {
          isMobileAdsStartCalledRef.current = true;
          await mobileAds().initialize();
        }
      } catch (error) {
        console.error("Consent gathering failed:", error);

        // Still try to initialize ads with previous session consent
        try {
          const { canRequestAds } = await AdsConsent.getConsentInfo();
          if (canRequestAds && !isMobileAdsStartCalledRef.current) {
            isMobileAdsStartCalledRef.current = true;
            await mobileAds().initialize();
          }
        } catch (initError) {
          console.error("Failed to initialize ads:", initError);
        }
      }
    };

    initializeConsentAndAds();
  }, []);

  return <>{children}</>;
};
