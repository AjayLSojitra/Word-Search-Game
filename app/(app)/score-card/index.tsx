import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { useFocusEffect, useGlobalSearchParams, useRouter } from "expo-router";
import { Image } from "react-native";
import images from "@assets/images/images";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";
import { Audio } from "expo-av";
import sounds from "@assets/sounds/sounds";
import { useCallback, useEffect, useRef, useState } from "react";
import * as Sharing from "expo-sharing";
import ViewShot, { captureRef } from "react-native-view-shot";
import { SHADOW } from "@design-system/utils/constants";
import BasicButton from "@design-system/components/buttons/basic-button";
import LocalStorage from "@utils/local-storage";
import ResponsiveContent from "@modules/shared/responsive-content";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import contents from "@assets/contents/contents";
import { deviceType, DeviceType } from "expo-device";
import { staticSupportEmail } from "@modules/shared/components/helpers";

function ScoreCardScreen() {
  const {
    correctWord = "0",
    wrongWord = "0",
    repeatWord = "0",
    alphabet = "",
    wordLength = "0",
    duration = "0",
  }: {
    correctWord?: string;
    wrongWord?: string;
    repeatWord?: string;
    alphabet?: string;
    wordLength?: string;
    duration?: string;
  } = useGlobalSearchParams();
  const languageData =
    contents.scoreCardScreenSelectedLanguage?.[
      global?.currentSelectedLanguage ?? "English"
    ];
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isPhoneDevice = deviceType === DeviceType.PHONE;
  const responsiveWidth = useResponsiveWidth();
  const [sound, setSound] = useState<Audio.Sound>();
  const ref = useRef();
  const isSoundEnabled = useRef(true);
  useFocusEffect(
    useCallback(() => {
      LocalStorage.getItemDefault("SOUND_KEY").then((val) => {
        isSoundEnabled.current = val == null || val === "Yes";
        if (val == null || val === "Yes") {
          playSound();
        }
      });
    }, [])
  );

  const shareImage = async () => {
    try {
      const uri = await captureRef(ref, {
        format: "png",
        quality: 0.7,
      });
      if (Sharing.isAvailableAsync) {
        Sharing.shareAsync(uri, { dialogTitle: "Word Search Game" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const formattedValue = (value: number) => {
    return value > 9 ? value : `0` + value;
  };

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
    <YStack flex={1} backgroundColor={"$primary"}>
      <ScrollHeader title="" backgroundColor={"$primary"} back={false} />

      <ResponsiveContent flex={1}>
        <ViewShot ref={ref}>
          <YStack bg={"$primary"} pb={isPhoneDevice ? "$5" : "$7"}>
            <SizableText
              fontSize={isPhoneDevice ? "$6xl" : "$8xl"}
              lineHeight={isPhoneDevice ? 80 : 110}
              color={"$white"}
              fontWeight={"$bold700"}
              textAlign="center"
              rotateX={"-30deg"}
              rotateY={"30deg"}
              textShadowOffset={{ width: 0, height: 5 }}
              textShadowColor={"$secondPrimaryColor"}
              textShadowRadius={6}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {languageData.ready_to_take_on_the_challenge}
            </SizableText>
            <YStack
              mx={isPhoneDevice ? "$6" : 0}
              px={isPhoneDevice ? "$6" : "$9"}
              py={isPhoneDevice ? "$4" : "$6"}
              alignItems="center"
              bg={"$white"}
              borderRadius={8}
              {...SHADOW.basicCard}
            >
              <SizableText
                fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                lineHeight={isPhoneDevice ? 24 : 34}
                color={"$secondPrimaryColor"}
                fontWeight={"$bold700"}
                textAlign="center"
                textTransform="uppercase"
              >
                {`${new Date().toDateString()}  ${new Date().toLocaleTimeString()}`}
              </SizableText>
              <YStack h={isPhoneDevice ? "$4" : "$6"} />
              <YStack
                borderRadius={8}
                p={isPhoneDevice ? "$1" : "$1.5"}
                backgroundColor={"$primary"}
                {...SHADOW.basicCard}
              >
                <Image
                  key={"appIcon"}
                  source={images.icon}
                  style={{
                    height: isPhoneDevice ? 90 : 135,
                    width: isPhoneDevice ? 90 : 135,
                  }}
                  alt={"appIcon"}
                />
              </YStack>
              <YStack h={isPhoneDevice ? "$4" : "$6"} />
              <YStack
                bg={"$secondPrimaryColor"}
                borderRadius={100}
                px={isPhoneDevice ? 10 : 15}
                pt={isPhoneDevice ? 5 : 7}
              >
                <SizableText
                  fontSize={isPhoneDevice ? "$2xl" : "$4xl"}
                  lineHeight={isPhoneDevice ? 32 : 44}
                  color={"$primary"}
                  fontWeight={"$bold700"}
                  textAlign="center"
                >
                  {`${formattedValue(parseInt(correctWord))} /`}{" "}
                  <SizableText
                    fontSize={isPhoneDevice ? "$2xl" : "$4xl"}
                    lineHeight={isPhoneDevice ? 32 : 44}
                    color={"$white"}
                    fontWeight={"$bold700"}
                    textAlign="center"
                  >
                    {`${formattedValue(
                      parseInt(correctWord) +
                        parseInt(wrongWord) +
                        parseInt(repeatWord)
                    )}`}
                  </SizableText>
                </SizableText>
              </YStack>
              <YStack h={isPhoneDevice ? "$3" : "$5"} />
              <SizableText
                fontSize={isPhoneDevice ? "$2xl" : "$4xl"}
                lineHeight={isPhoneDevice ? 32 : 44}
                color={"$secondPrimaryColor"}
                fontWeight={"$bold700"}
                textAlign="center"
                textTransform="uppercase"
              >
                {languageData.correct_words}
              </SizableText>
              <YStack h={isPhoneDevice ? "$3" : "$5"} />
              <YStack>
                {alphabet ? (
                  <>
                    <SizableText
                      fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                      lineHeight={isPhoneDevice ? 24 : 34}
                      color={"$primary"}
                      fontWeight={"$bold700"}
                      textAlign="center"
                    >
                      {languageData.congratulations}{" "}
                      <SizableText
                        fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                        lineHeight={isPhoneDevice ? 24 : 34}
                        color={"$primary"}
                        fontWeight={"$bold700"}
                        textAlign="center"
                      >
                        {" "}
                        {wordLength}{" "}
                      </SizableText>
                      <SizableText
                        fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                        lineHeight={isPhoneDevice ? 24 : 34}
                        color={"$primary"}
                        fontWeight={"$bold700"}
                        textAlign="center"
                      >
                        {languageData.letter_words_starting_with}
                      </SizableText>
                      <SizableText
                        fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                        lineHeight={isPhoneDevice ? 24 : 34}
                        color={"$primary"}
                        fontWeight={"$bold700"}
                        textAlign="center"
                      >
                        {" "}
                        {alphabet}{" "}
                      </SizableText>
                      <SizableText
                        fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                        lineHeight={isPhoneDevice ? 24 : 34}
                        color={"$primary"}
                        fontWeight={"$bold700"}
                        textAlign="center"
                      >
                        {languageData.in}
                      </SizableText>
                      <SizableText
                        fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                        lineHeight={isPhoneDevice ? 24 : 34}
                        color={"$primary"}
                        fontWeight={"$bold700"}
                        textAlign="center"
                      >
                        {" "}
                        {duration}{" "}
                      </SizableText>
                      <SizableText
                        fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                        lineHeight={isPhoneDevice ? 24 : 34}
                        color={"$primary"}
                        fontWeight={"$bold700"}
                        textAlign="center"
                      >
                        {languageData.seconds}
                      </SizableText>
                    </SizableText>
                  </>
                ) : (
                  <SizableText
                    fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                    lineHeight={isPhoneDevice ? 24 : 34}
                    color={"$primary"}
                    fontWeight={"$bold700"}
                    textAlign="center"
                  >
                    {languageData.congratulations}{" "}
                    <SizableText
                      fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                      lineHeight={isPhoneDevice ? 24 : 34}
                      color={"$primary"}
                      fontWeight={"$bold700"}
                      textAlign="center"
                    >
                      {languageData.the_categorys_all_words}
                    </SizableText>
                  </SizableText>
                )}
              </YStack>
            </YStack>
            <YStack h={isPhoneDevice ? "$3" : "$5"} />
            <SizableText
              fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
              lineHeight={isPhoneDevice ? 24 : 34}
              color={"$secondPrimaryColor"}
              fontWeight={"$bold700"}
              textAlign="center"
            >
              {`Email: ${global?.supportEmail ?? staticSupportEmail}`}
            </SizableText>
          </YStack>
        </ViewShot>

        <YStack
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"$primary"}
          zIndex={1}
          position="absolute"
        >
          <SizableText
            fontSize={isPhoneDevice ? "$6xl" : "$8xl"}
            lineHeight={isPhoneDevice ? 80 : 110}
            color={"$secondPrimaryColor"}
            fontWeight={"700"}
            textAlign="center"
            rotateX={"-30deg"}
            rotateY={"30deg"}
            textShadowOffset={{ width: 0, height: 7 }}
            textShadowColor={"$primary"}
            textShadowRadius={8}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {languageData.game_over}
          </SizableText>

          <YStack alignItems="center">
            <YStack h={isPhoneDevice ? "$8" : "$12"} />
            <Image
              key={"gameOver"}
              source={images.gameOver}
              style={{
                height: isPhoneDevice ? 100 : 150,
                width: isPhoneDevice ? 100 : 150,
                tintColor: "#1c2e4a",
              }}
              alt={"gameOver"}
            />

            <YStack h={isPhoneDevice ? "$8" : "$12"} />
            <XStack alignItems="center">
              <YStack alignItems="center">
                <SizableText
                  fontSize={isPhoneDevice ? "$2xl" : "$4xl"}
                  lineHeight={isPhoneDevice ? 32 : 44}
                  color={"$secondPrimaryColor"}
                  fontWeight={"$bold700"}
                  textAlign="center"
                >
                  {languageData.your_score}
                </SizableText>
                <YStack h={isPhoneDevice ? "$1" : "$1.5"} />
                <YStack
                  bg={"$secondPrimaryColor"}
                  borderRadius={100}
                  px={10}
                  pt={5}
                >
                  <SizableText
                    fontSize={isPhoneDevice ? "$2xl" : "$4xl"}
                    lineHeight={isPhoneDevice ? 32 : 44}
                    color={"$primary"}
                    fontWeight={"$bold700"}
                    textAlign="center"
                  >
                    {formattedValue(parseInt(correctWord))}
                  </SizableText>
                </YStack>
              </YStack>
            </XStack>
            <YStack h={isPhoneDevice ? "$8" : "$12"} />
            <XStack justifyContent="center">
              <BasicButton
                width={responsiveWidth / 2.5}
                height={isPhoneDevice ? 40 : 60}
                linearGradientProps={{ colors: ["#1c2e4a", "#1c2e4a"] }}
                onPress={() => {
                  shareImage();
                }}
              >
                <XStack alignItems="center" justifyContent="center">
                  <Image
                    key={"share"}
                    source={images.share}
                    style={{
                      height: isPhoneDevice ? 18 : 27,
                      width: isPhoneDevice ? 18 : 27,
                    }}
                    alt={"share"}
                  />
                  <YStack w={isPhoneDevice ? "$2" : "$3"} />
                  <SizableText
                    fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                    lineHeight={isPhoneDevice ? 24 : 34}
                    color={"$white"}
                    fontWeight={"700"}
                    textAlign="center"
                  >
                    {languageData.share}
                  </SizableText>
                </XStack>
              </BasicButton>
            </XStack>
          </YStack>

          <YStack flex={1} />

          <YStack
            mx={isPhoneDevice ? "$4" : 0}
            mb={isPhoneDevice ? "$4" : "$6"}
          >
            <XStack alignItems="center">
              <BasicButton
                width={responsiveWidth / 2 - 24}
                height={isPhoneDevice ? 46 : 69}
                linearGradientProps={{ colors: ["#ffffff", "#ffffff"] }}
                onPress={() => {
                  router.dismissAll();
                }}
              >
                <XStack alignItems="center" justifyContent="center">
                  <Image
                    key={"home"}
                    source={images.home}
                    style={{
                      height: isPhoneDevice ? 18 : 27,
                      width: isPhoneDevice ? 18 : 27,
                    }}
                    alt={"home"}
                  />
                  <YStack w={isPhoneDevice ? "$2" : "$3"} />
                  <SizableText
                    fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                    lineHeight={isPhoneDevice ? 24 : 34}
                    color={"$secondPrimaryColor"}
                    fontWeight={"700"}
                    textAlign="center"
                  >
                    {languageData.go_to_home}
                  </SizableText>
                </XStack>
              </BasicButton>
              <YStack w={isPhoneDevice ? "$4" : "$6"} />
              <BasicButton
                width={responsiveWidth / 2 - 24}
                height={isPhoneDevice ? 46 : 69}
                linearGradientProps={{ colors: ["#ffffff", "#ffffff"] }}
                onPress={() => {
                  router.back();
                }}
              >
                <XStack alignItems="center" justifyContent="center">
                  <Image
                    key={"playAgain"}
                    source={images.playAgain}
                    style={{
                      height: isPhoneDevice ? 18 : 27,
                      width: isPhoneDevice ? 18 : 27,
                    }}
                    alt={"playAgain"}
                  />
                  <YStack w={isPhoneDevice ? "$2" : "$3"} />
                  <SizableText
                    fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                    lineHeight={isPhoneDevice ? 24 : 34}
                    color={"$secondPrimaryColor"}
                    fontWeight={"700"}
                    textAlign="center"
                  >
                    {languageData.play_again}
                  </SizableText>
                </XStack>
              </BasicButton>
            </XStack>
          </YStack>
        </YStack>
      </ResponsiveContent>
      <AdmobBanner />
      <YStack h={insets.bottom} />
    </YStack>
  );
}

export default ScoreCardScreen;
