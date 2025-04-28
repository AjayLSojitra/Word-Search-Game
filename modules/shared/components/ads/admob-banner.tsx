import React from "react";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { staticBannerAd } from "@modules/shared/components/helpers";
import { YStack } from "tamagui";

function AdmobBanner() {
  return (
    <>
      {global?.showAds && (
        <YStack
          alignItems="center"
          bg={"$secondPrimaryColor"}
          borderTopWidth={1}
          borderBottomWidth={1}
          borderColor={"$secondPrimaryColor"}
          h={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        >
          <BannerAd
            unitId={
              __DEV__
                ? TestIds.ADAPTIVE_BANNER
                : global?.bannerAd ?? staticBannerAd
            }
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            // requestOptions={{
            //     networkExtras: {
            //         collapsible: 'bottom',
            //     },
            // }}
          />
        </YStack>
      )}
    </>
  );
}

export default AdmobBanner;
