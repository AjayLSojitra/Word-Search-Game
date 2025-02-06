import { YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import lotties from "@assets/lotties/lotties";
import { useCallback, useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import sounds from "@assets/sounds/sounds";
import { useWindowDimensions } from "react-native";
import LottieWrapper from "@modules/shared/components/lottie-wrapper";
import { useFocusEffect, useGlobalSearchParams, useRouter } from "expo-router";
import LocalStorage from "@utils/local-storage";

function CountDownScreen() {
  const {
    alphabet = "",
    wordLength = "0",
    duration = "0",
  }: {
    alphabet?: string;
    wordLength?: string;
    duration?: string;
  } = useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const [sound, setSound] = useState<Audio.Sound>();
  const { height, width } = useWindowDimensions();
  const router = useRouter();
  const isSoundEnabled = useRef(true);
  useFocusEffect(
    useCallback(() => {
      LocalStorage.getItemDefault("SOUND_KEY").then((val) => {
        isSoundEnabled.current = val == null || val === "Yes";
      });
    }, [])
  );

  async function playSound() {
    if (isSoundEnabled.current) {
      const { sound } = await Audio.Sound.createAsync(sounds.countdown);
      setSound(sound);
      await sound.playAsync();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    setTimeout(() => {
      playSound();
    });
  }, []);

  return (
    <YStack flex={1} backgroundColor={"$black"} justifyContent="center">
      <LottieWrapper
        webProps={{
          options: {
            loop: false,
            autoplay: true,
            animationData: lotties.countdown1,
          },
          height: width,
          width: height,
        }}
        width={width}
        height={height}
        source={lotties.countdown1}
        loop={false}
        onAnimationLoadeda={() => {}}
        onAnimationFinisha={() => {
          router.replace(
            `./play-game?alphabet=${alphabet}&&wordLength=${wordLength}&&duration=${duration}`
          );
        }}
      />
      <YStack h={insets.bottom} />
    </YStack>
  );
}

export default CountDownScreen;
