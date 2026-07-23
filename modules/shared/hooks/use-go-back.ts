import { useMemo } from "react";
import { useNavigation, useRouter } from "expo-router";
import { InteractionManager } from "react-native";

function useGoBack(): (fallbackLink?: string) => void {
  const navigation = useNavigation();
  const router = useRouter();
  const defaultFallbackLink = useMemo(() => "/", []);

  return (fallbackLink?: string) => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        try {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            router.replace((fallbackLink ?? defaultFallbackLink) as any);
          }
        } catch (error) {
          console.warn("Navigation error:", error);
          try {
            router.replace((fallbackLink ?? defaultFallbackLink) as any);
          } catch (fallbackError) {
            if (router.canGoBack()) {
              router.back();
            }
          }
        }
      }, 100);
    });
  };
}

export default useGoBack;
