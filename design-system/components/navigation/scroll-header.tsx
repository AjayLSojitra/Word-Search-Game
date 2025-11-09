import React, { useCallback } from "react";
import { OpaqueColorValue, InteractionManager } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ColorTokens, YStack } from "tamagui";
import HeaderBar, { HeaderBarProps } from "./header-bar";
import { useRouter } from "expo-router";
import DeviceInfo from "react-native-device-info";

export type ScrollHeaderProps = HeaderBarProps & {
  backgroundColor?: ColorTokens | OpaqueColorValue | string;
};

function ScrollHeader(props: ScrollHeaderProps) {
  const { backgroundColor = "$white", ...headerBarProps } = props;
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  const router = useRouter();

  const goBack = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        try {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/");
          }
        } catch (error) {
          console.warn("Navigation error:", error);
          try {
            router.replace("/");
          } catch (fallbackError) {
            if (router.canGoBack()) {
              router.back();
            }
          }
        }
      }, 100);
    });
  }, []);

  return (
    <YStack minHeight={DeviceInfo.hasNotch() ? 100 : 64} bg={backgroundColor}>
      <YStack height={statusBarHeight} />
      <YStack p={"$3"}>
        <HeaderBar {...headerBarProps} goBack={goBack} />
      </YStack>
    </YStack>
  );
}

export default ScrollHeader;
