import { useMemo } from "react";
import { useNavigation, useRouter } from "expo-router";

function useGoBack(): (fallbackLink?: string) => void {
  const navigation = useNavigation();
  const router = useRouter();
  const defaultFallbackLink = useMemo(() => "/", []);

  return (fallbackLink?: string) => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.replace(fallbackLink ?? defaultFallbackLink);
    }
  };
}

export default useGoBack;
