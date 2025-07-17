import { useLayoutEffect, useState } from "react";
import DeviceInfo from "react-native-device-info";
import Purchases, { CustomerInfo } from "react-native-purchases";
import RevenueCatUI from "react-native-purchases-ui";

export const presentPaywall = () => {
  RevenueCatUI.presentPaywall();
};

export const checkSubscriptionStatus = async (uniqueDeviceId: string) => {
  try {
    const { customerInfo } = await Purchases.logIn(uniqueDeviceId);
    if (customerInfo.activeSubscriptions.length === 0) {
      // handle first time subscription
      return false;
    } else {
      if (!(customerInfo.latestExpirationDate > new Date().toISOString())) {
        // handle subscribe again
        return false;
      } else {
        // subscribed flow
        return true;
      }
    }
  } catch (e) {
    // handle error
    return false;
  }
};

function useSubscriptionData() {
  const uniqueDeviceId = DeviceInfo.getUniqueIdSync();
  const [premium, setPremium] = useState(true);

  console.log("global?.showAdsFromFirebase: ", global?.showAdsFromFirebase)

  useLayoutEffect(() => {
    const onCustomerInfoUpdated = (customerInfo: CustomerInfo) => {
      const hasPremium =
        typeof customerInfo.entitlements.active["Premium"] !== "undefined";
      setPremium(hasPremium || global?.showAdsFromFirebase === false);
      global.showAds = global?.showAdsFromFirebase && hasPremium === false;
      return hasPremium;
    };

    (async () => {
      const initialCustomerInfo = await Purchases.getCustomerInfo();
      const hasPremium = onCustomerInfoUpdated(initialCustomerInfo);
      try {
        const status = await checkSubscriptionStatus(uniqueDeviceId);
        if (status !== hasPremium) {
          setPremium(status || global?.showAdsFromFirebase === false);
          global.showAds = global?.showAdsFromFirebase && status === false;
        }
      } catch (error) {
        console.error(error);
      }
    })();

    Purchases.addCustomerInfoUpdateListener(onCustomerInfoUpdated);

    return () => {
      Purchases.removeCustomerInfoUpdateListener(onCustomerInfoUpdated);
    };
  }, []);

  return {
    premium,
    refresh: async () => {
      const status = await checkSubscriptionStatus(uniqueDeviceId);
      setPremium(status || global?.showAdsFromFirebase === false);
      global.showAds = global?.showAdsFromFirebase && status === false;
    },
  };
}

export default useSubscriptionData;
