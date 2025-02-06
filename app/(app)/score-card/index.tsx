import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { useFocusEffect, useGlobalSearchParams, useRouter } from "expo-router";
import { Image } from "react-native";
import images from "@assets/images/images";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";
import { Audio } from 'expo-av';
import sounds from "@assets/sounds/sounds";
import { useCallback, useEffect, useRef, useState } from "react";
import * as Sharing from 'expo-sharing';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { SHADOW } from "@design-system/utils/constants";
import BasicButton from "@design-system/components/buttons/basic-button";
import LocalStorage from "@utils/local-storage";
import ResponsiveContent from "@modules/shared/responsive-content";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import { BannerAdSize } from "react-native-google-mobile-ads";

function ScoreCardScreen() {
  const {
    correctWord = "0",
    wrongWord = "0",
    repeatWord = "0",
    alphabet = "",
    wordLength = "0",
    duration = "0",
  }:
    {
      correctWord?: string
      wrongWord?: string
      repeatWord?: string
      alphabet?: string,
      wordLength?: string,
      duration?: string,
    }
    = useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const responsiveWidth = useResponsiveWidth();
  const [sound, setSound] = useState<Audio.Sound>();
  const ref = useRef();
  const isSoundEnabled = useRef(true);
  useFocusEffect(
    useCallback(() => {
      LocalStorage.getItemDefault("SOUND_KEY").then(
        (val) => {
          isSoundEnabled.current = val == null || val === "Yes";
          if (val == null || val === "Yes") {
            playSound()
          }
        }
      );
    }, [])
  );

  const shareImage = async () => {
    try {
      const uri = await captureRef(ref, {
        format: 'png',
        quality: 0.7,
      });
      if (Sharing.isAvailableAsync) {
        Sharing.shareAsync(uri, { dialogTitle: "Word Search Game" })
      }
    } catch (e) {
      console.log(e);
    }
  };

  const formattedValue = (value: number) => {
    return value > 9 ? value : `0` + value;
  }

  async function playSound() {
    if (isSoundEnabled.current) {
      const { sound } = await Audio.Sound.createAsync(sounds.gaveOver);
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

  return (
    <YStack flex={1} backgroundColor={"$black"}>
      <ScrollHeader
        title=""
        backgroundColor={"$black"}
        back={false}
      />

      <ResponsiveContent flex={1}>
        <ViewShot ref={ref}>
          <YStack bg={"$primary"} pb={"$5"}>
            <SizableText
              fontSize={"$6xl"}
              color={"$white"}
              fontWeight={"700"}
              textAlign="center"
              rotateX={"-30deg"}
              rotateY={"30deg"}
              lineHeight={80}
              textShadowOffset={{ width: 0, height: 5 }}
              textShadowColor={"$black"}
              textShadowRadius={6}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {`Ready to take on the challenge?`}
            </SizableText>
            <YStack mx={"$6"} px={"$6"} py={"$4"} alignItems="center" bg={"$white"} borderRadius={8} {...SHADOW.basicCard}>
              <SizableText
                fontSize={"$hxs"}
                color={"$black"}
                fontWeight={"$bold700"}
                textAlign="center"
                textTransform="uppercase"
              >
                {`${new Date().toDateString()}  ${new Date().toLocaleTimeString()}`}
              </SizableText>
              <YStack h={"$4"} />
              <YStack borderRadius={8} p={"$1"} backgroundColor={"$primary"} {...SHADOW.basicCard}>
                <Image
                  key={"appIcon"}
                  source={images.icon}
                  style={{ height: 90, width: 90 }}
                  alt={"appIcon"}
                />
              </YStack>
              <YStack h={"$4"} />
              <YStack bg={"$black"} borderRadius={100} px={10} pt={5}>
                <SizableText
                  fontSize={"$2xl"}
                  color={"$primary"}
                  fontWeight={"$bold700"}
                  textAlign="center"
                  lineHeight={30}
                >
                  {`${formattedValue(parseInt(correctWord))} /`} <SizableText
                    fontSize={"$2xl"}
                    color={"$white"}
                    fontWeight={"$bold700"}
                    textAlign="center"
                    lineHeight={30}
                  >
                    {`${formattedValue(parseInt(correctWord) + parseInt(wrongWord) + parseInt(repeatWord))}`}
                  </SizableText>
                </SizableText>
              </YStack>
              <YStack h={"$3"} />
              <SizableText
                fontSize={"$2xl"}
                color={"$black"}
                fontWeight={"$bold700"}
                textAlign="center"
                lineHeight={30}
                textTransform="uppercase"
              >
                {`Correct Words `}
              </SizableText>
              <YStack h={"$3"} />
              <SizableText
                fontSize={"$hxs"}
                color={"$primary"}
                fontWeight={"$bold700"}
                textAlign="center"
              >
                {`Congratulations on completing the challenge of ${wordLength}-letter words starting with ${alphabet} in ${duration} seconds!`}
              </SizableText>
            </YStack>
            <YStack h={"$3"} />
            <SizableText
              fontSize={"$hxs"}
              color={"$black"}
              fontWeight={"$bold700"}
              textAlign="center"
            >
              {`Email: info.as2infotech@gmail.com`}
            </SizableText>
          </YStack>
        </ViewShot>

        <YStack top={0} left={0} right={0} bottom={0} bg={"$black"} zIndex={1} position="absolute">
          <SizableText
            fontSize={"$6xl"}
            color={"$white"}
            fontWeight={"700"}
            textAlign="center"
            rotateX={"-30deg"}
            rotateY={"30deg"}
            lineHeight={80}
            textShadowOffset={{ width: 0, height: 7 }}
            textShadowColor={"$primary"}
            textShadowRadius={8}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {`Game Over`}
          </SizableText>

          <YStack alignItems="center">
            <YStack h={"$8"} />
            <Image
              key={"gameOver"}
              source={images.gameOver}
              style={{ height: 100, width: 100 }}
              alt={"gameOver"}
            />

            <YStack h={"$8"} />
            <XStack alignItems="center">
              <YStack alignItems="center">
                <SizableText
                  fontSize={"$2xl"}
                  color={"$white"}
                  fontWeight={"$bold700"}
                  textAlign="center"
                  lineHeight={30}
                >
                  {`Your Score`}
                </SizableText>
                <YStack h={"$1"} />
                <YStack bg={"$white"} borderRadius={100} px={10} pt={5}>
                  <SizableText
                    fontSize={"$2xl"}
                    color={"$primary"}
                    fontWeight={"$bold700"}
                    textAlign="center"
                    lineHeight={30}
                  >
                    {formattedValue(parseInt(correctWord))}
                  </SizableText>
                </YStack>
              </YStack>
            </XStack>
            <YStack h={"$8"} />
            <XStack justifyContent="center">
              <BasicButton
                width={(responsiveWidth / 3)}
                height={40}
                linearGradientProps={{ colors: ["#05958f", "#05958f"] }}
                onPress={() => {
                  shareImage()
                }}
              >
                <XStack alignItems="center" justifyContent="center">
                  <Image
                    key={"share"}
                    source={images.share}
                    style={{ height: 18, width: 18 }}
                    alt={"share"}
                  />
                  <YStack w={"$2"} />
                  <SizableText
                    mb={-5}
                    fontSize={"$hxs"}
                    color={"$white"}
                    fontWeight={"700"}
                    textAlign="center"
                    textTransform="uppercase"
                  >
                    {`Share`}
                  </SizableText>
                </XStack>
              </BasicButton>
            </XStack>
          </YStack>

          <YStack flex={1} />

          <YStack mx={"$4"} mb={"$4"}>
            <XStack alignItems="center">
              <BasicButton
                width={(responsiveWidth / 2) - 24}
                height={46}
                linearGradientProps={{ colors: ["#ffffff", "#ffffff"] }}
                onPress={() => {
                  router.dismissAll()
                }}
              >
                <XStack alignItems="center" justifyContent="center">
                  <Image
                    key={"home"}
                    source={images.home}
                    style={{ height: 18, width: 18 }}
                    alt={"home"}
                  />
                  <YStack w={"$2"} />
                  <SizableText
                    mb={-5}
                    fontSize={"$hxs"}
                    color={"$black"}
                    fontWeight={"700"}
                    textAlign="center"
                    textTransform="uppercase"
                  >
                    {`Go To Home`}
                  </SizableText>
                </XStack>
              </BasicButton>
              <YStack w={"$4"} />
              <BasicButton
                width={(responsiveWidth / 2) - 24}
                height={46}
                linearGradientProps={{ colors: ["#ffffff", "#ffffff"] }}
                onPress={() => {
                  router.back()
                }}
              >
                <XStack alignItems="center" justifyContent="center">
                  <Image
                    key={"playAgain"}
                    source={images.playAgain}
                    style={{ height: 18, width: 18 }}
                    alt={"playAgain"}
                  />
                  <YStack w={"$2"} />
                  <SizableText
                    mb={-5}
                    fontSize={"$hxs"}
                    color={"$black"}
                    fontWeight={"700"}
                    textAlign="center"
                    textTransform="uppercase"
                  >
                    {`Play Again`}
                  </SizableText>
                </XStack>
              </BasicButton>
            </XStack>
          </YStack>
        </YStack>
      </ResponsiveContent>
      <AdmobBanner bannerSize={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
      <YStack h={insets.bottom} />
    </YStack>
  )
}

export default ScoreCardScreen;