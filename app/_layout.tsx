import {
  Stack,
  useNavigation,
  usePathname,
  useGlobalSearchParams,
} from "expo-router";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RecoilRoot } from "recoil";
import { AnalyticsProvider, useAnalytics } from "@modules/analytics/analytics";
import theme, { config } from "@utils/theme";
import WebSplash from "../modules/shared/components/web-splash";
import React, { useEffect, useState } from "react";
import ConfirmationDialog from "@modules/shared/components/confirmation-dialog/confirmation-dialog";
import { useDefaultFonts } from "@modules/shared/hooks/use-fonts-preloader";
import { TamaguiProvider, Theme } from "tamagui";
import themeConfig from "./../tamagui.config";
import VersionRestrictionProvider from "@modules/app/version-restriction-provider";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import { toastConfig } from "../utils/toast-handler";
import AdmobProvider from "@modules/app/admob-provider";
import OneSignalProvider from "@modules/app/onesignal-provider";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

function FontLoader(props) {
  let [fontsLoaded] = useDefaultFonts();
  if (!fontsLoaded) {
    return <WebSplash />;
  }

  return <>{props.children}</>;
}

function PageTracking() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const analytics = useAnalytics();
  analytics?.page(pathname, params);
  return <></>;
}

function RoutingInstrumentation() {
  const [isInstrumentationInitialized, setIsInstrumentationInitialized] =
    useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    if (Platform.OS !== "web") {
      if (!navigation || isInstrumentationInitialized) return;
      // routingInstrumentation?.registerNavigationContainer(navigation);
      setIsInstrumentationInitialized(true);
    }
  }, [navigation]);

  return <></>;
}

export default function Layout() {
  useEffect(() => {
    (async () => {
      setTimeout(async () => {
        const { status } = await requestTrackingPermissionsAsync();
        if (status === "granted") {
          //Yay! I have user permission to track data
        }
      }, 1000);
    })();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={themeConfig}>
        <Theme name={"light"}>
          <NativeBaseProvider theme={theme} config={config}>
            <RecoilRoot>
              <FontLoader>
                <OneSignalProvider>
                  {(checkPassed, fallback) => {
                    return checkPassed ? (
                      <AdmobProvider>
                        {(checkPassed, fallback) => {
                          return checkPassed ? (
                            <VersionRestrictionProvider>
                              {(checkPassed, fallback) => {
                                return checkPassed ? (
                                  <AnalyticsProvider>
                                    <>
                                      <PageTracking />
                                      <RoutingInstrumentation />
                                      {/* Do not wrap anything else within AuthProvider or risk having a weird login issue */}
                                      <Stack
                                        screenOptions={{
                                          headerShown: false,
                                          gestureEnabled: false,
                                          animation: "ios_from_right",
                                        }}
                                      />
                                      <ConfirmationDialog />
                                    </>
                                  </AnalyticsProvider>
                                ) : (
                                  fallback
                                );
                              }}
                            </VersionRestrictionProvider>
                          ) : (
                            fallback
                          );
                        }}
                      </AdmobProvider>
                    ) : (
                      fallback
                    );
                  }}
                </OneSignalProvider>
              </FontLoader>
              <Toast config={toastConfig} />
            </RecoilRoot>
          </NativeBaseProvider>
        </Theme>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
