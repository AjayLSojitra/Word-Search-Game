import React from "react";
import { YStack } from "tamagui";
import { useRouter } from "expo-router";
import { InteractionManager } from "react-native";
import ErrorPlaceholder from "../modules/shared/error-paceholder";

function RouteNotFoundScreen() {
  const router = useRouter();

  return (
    <YStack flex={1} bg={"$blueGray.50"} testID="route-not-found-screen">
      <ErrorPlaceholder
        title="Something went wrong"
        description="Sorry for the inconvenience, please try again"
        buttonTitle="Return Home"
        onPress={() => {
          InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
              try {
                router.replace("/");
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
        }}
      />
    </YStack>
  );
}

export default RouteNotFoundScreen;
