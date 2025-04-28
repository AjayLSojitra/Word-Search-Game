import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback, useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import sounds from "@assets/sounds/sounds";
import images from "@assets/images/images";
import {
  Image,
  Platform,
  TransformsStyle,
  StyleSheet,
  ScrollView,
} from "react-native";
import ResponsiveContent from "@modules/shared/components/responsive-content";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import Carousel from "react-native-reanimated-carousel";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { withAnchorPoint } from "@utils/anchor-point";
import * as Haptics from "expo-haptics";
import { BlurView as _BlurView } from "expo-blur";
import BasicButton from "@design-system/components/buttons/basic-button";
import {
  router,
  useFocusEffect,
  useGlobalSearchParams,
  useNavigation,
} from "expo-router";
import { alphabets } from "@utils/helper";
import LocalStorage from "@utils/local-storage";
import { isTablet } from "react-native-device-info";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import {
  canShowAdmobInteratitial,
  staticInterstitialAd,
} from "@modules/shared/components/helpers";
import contents from "@assets/contents/contents";
import { DeviceType, deviceType } from "expo-device";
import SBItem from "./SBItem";
import parallaxLayout from "./parallax";
import AdsNotifyDialog from "@modules/shared/components/confirmation-dialog/ads-notify-dialog";

const BlurView = Animated.createAnimatedComponent(_BlurView);

function InitGameScreen() {
  const currentAlphabets = alphabets();
  const languageData =
    contents.initGameScreenSelectedLanguage?.[
      global?.currentSelectedLanguage ?? "English"
    ];
  const { level = undefined }: { level?: string } = useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const [sound, setSound] = useState<Audio.Sound>();
  const [selectedAlphabetIndex, setSelectedAlphabetIndex] = useState<number>(0);
  const [selectedDurationIndex, setSelectedDurationIndex] = useState<number>(0);
  const [selectedWordLengthIndex, setSelectedWordLengthIndex] =
    useState<number>(0);
  const responsiveWidth = useResponsiveWidth();
  const PAGE_WIDTH = responsiveWidth / 5;
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 0.6,
  } as const;
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  const previousProgress = useRef(0);
  const alphabetCarouselRef = useRef(null);
  const durationCarouselRef = useRef(null);
  const wordLengthCarouselRef = useRef(null);
  const easyDuration = ["30", "60", "90"];
  const hardDuration = ["120", "150", "180"];
  const easyWordLengths = ["3", "4", "5"];
  const hardWordLengths = ["6", "7", "8"];
  const durations = level === "EASY" ? easyDuration : hardDuration;
  const wordLengths = level === "EASY" ? easyWordLengths : hardWordLengths;

  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    __DEV__
      ? TestIds.INTERSTITIAL_VIDEO
      : global?.interstitialAd ?? staticInterstitialAd
  );
  const redirectTo = useRef<"PLAY-GAME" | "IGNORE">();

  const [showAdsConfirmationPopup, setShowAdsConfirmationPopup] =
    useState(false);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (error) {
      setShowAdsConfirmationPopup(false);
    }
  }, [error]);

  useEffect(() => {
    if (isClosed) {
      load();

      // Action after the ad is closed
      setShowAdsConfirmationPopup(false);
      redirectToNextScreenAfterAdmobInterstitial();
    }
  }, [isClosed]);

  const showInterstitial = () => {
    setShowAdsConfirmationPopup(true);
    setTimeout(() => {
      show();
    }, 2000);
  };

  const redirectToNextScreenAfterAdmobInterstitial = () => {
    if (redirectTo.current === "PLAY-GAME") {
      router.push(
        `./play-game?alphabet=${currentAlphabets[selectedAlphabetIndex]}&&wordLength=${wordLengths[selectedWordLengthIndex]}&&duration=${durations[selectedDurationIndex]}`
      );
    }
  };

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
      const { sound } = await Audio.Sound.createAsync(sounds.optionChange);
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

  const generateRandomNumber = () => {
    const min = 0;
    const max = 25;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    alphabetCarouselRef.current.scrollTo({
      index: randomNumber,
      animated: true,
    });
    setTimeout(() => {
      setSelectedAlphabetIndex(randomNumber);
    }, 750);
  };

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      generateRandomNumber();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <YStack flex={1} backgroundColor={"$primary"}>
      <ScrollHeader
        title={languageData.word_search_game}
        backgroundColor={"$primary"}
        rightElement={
          <TouchableScale
            onPress={() => {
              router.push("./help");
            }}
          >
            <YStack
              alignItems="center"
              justifyContent="center"
              height={24}
              width={24}
              p={4}
            >
              <Image
                key={"help"}
                source={images.help}
                style={{ height: 18, width: 18, tintColor: "#1c2e4a" }}
                alt={"help"}
              />
            </YStack>
          </TouchableScale>
        }
      />

      <ResponsiveContent flex={1}>
        <YStack alignItems="center" justifyContent="center">
          <AdsNotifyDialog
            showDialog={showAdsConfirmationPopup}
            content={`Ad is loading...`}
          />
        </YStack>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <YStack alignItems="center">
            <Carousel
              ref={alphabetCarouselRef}
              {...baseOptions}
              loop
              style={{
                height: isTablet() ? 150 : 100,
                width: responsiveWidth,
                justifyContent: "center",
                alignItems: "center",
              }}
              snapEnabled={true}
              pagingEnabled={false}
              onProgressChange={(
                offsetProgress: number,
                absouluteProgress: number
              ) => {
                if (
                  absouluteProgress - previousProgress.current >= 1 ||
                  previousProgress.current - absouluteProgress >= 1
                ) {
                  previousProgress.current = absouluteProgress;
                  if (Platform.OS !== "web") {
                    Haptics.selectionAsync();
                  }
                  // playSound()
                }
              }}
              onSnapToItem={(index) => {
                setSelectedAlphabetIndex(index);
                playSound();
              }}
              autoPlay={false}
              autoPlayInterval={150}
              scrollAnimationDuration={500}
              customAnimation={(value: number) => {
                "worklet";
                const size = PAGE_WIDTH;
                const scale = interpolate(
                  value,
                  [-2, -1, 0, 1, 2],
                  [1.7, 1.2, 1, 1.2, 1.7],
                  Extrapolation.CLAMP
                );

                const translate = interpolate(
                  value,
                  [-2, -1, 0, 1, 2],
                  [-size * 1.45, -size * 0.9, 0, size * 0.9, size * 1.45]
                );

                const transform = {
                  transform: [
                    { scale },
                    {
                      translateX: translate,
                    },
                    { perspective: 150 },
                    {
                      rotateY: `${interpolate(
                        value,
                        [-1, 0, 1],
                        [30, 0, -30],
                        Extrapolation.CLAMP
                      )}deg`,
                    },
                  ],
                };

                return {
                  ...withAnchorPoint(
                    transform as unknown as TransformsStyle,
                    { x: 0.5, y: 0.5 },
                    {
                      width: baseOptions.width,
                      height: baseOptions.height,
                    }
                  ),
                };
              }}
              modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
              }}
              data={currentAlphabets}
              renderItem={({ index }) => (
                <SBItem
                  index={index}
                  value={currentAlphabets[index]}
                  selectedIndex={selectedAlphabetIndex}
                  onPress={() => {
                    setSelectedAlphabetIndex(index);
                    alphabetCarouselRef.current.scrollTo({
                      index: index,
                      animated: true,
                    });
                    redirectTo.current = "IGNORE";
                  }}
                />
              )}
            />

            <TouchableScale
              onPress={() => {
                generateRandomNumber();
                redirectTo.current = "IGNORE";
                if (isLoaded && canShowAdmobInteratitial()) {
                  showInterstitial();
                }
              }}
            >
              <XStack
                alignSelf="center"
                justifyContent="center"
                bg={"#1c2e4a"}
                borderRadius={100}
                alignContent="center"
                px={"$3"}
                py={"$1"}
              >
                <Image
                  key={"random"}
                  source={images.random}
                  style={{ height: 14, width: 14, alignSelf: "center" }}
                  alt={"random"}
                />
                <YStack w={"$2"} />
                <SizableText
                  pt={2}
                  fontSize={"$xs"}
                  fontWeight={"$semibold"}
                  color={"$white"}
                  textAlign="center"
                >
                  {languageData.pick_random}
                </SizableText>
              </XStack>
            </TouchableScale>

            <YStack h={"$8"} />
            <SizableText
              fontSize={"$xl"}
              fontWeight={"$semibold"}
              color={"$white"}
              textAlign="center"
              lineHeight={30}
            >
              {languageData.pick_duration}
            </SizableText>
            <Carousel
              ref={durationCarouselRef}
              loop
              autoPlay={false}
              snapEnabled={true}
              pagingEnabled={false}
              style={{
                width: responsiveWidth / 1.5,
                height: 140,
                marginTop: -25,
                justifyContent: "center",
                alignItems: "center",
              }}
              defaultIndex={0}
              width={responsiveWidth / 3.5}
              data={durations}
              renderItem={({ item, index, animationValue }) => {
                return (
                  <CustomItem
                    key={index}
                    value={item}
                    label={languageData.seconds}
                    animationValue={animationValue}
                    onPress={() => {
                      durationCarouselRef.current.scrollTo({
                        index: index,
                        animated: true,
                      });
                    }}
                  />
                );
              }}
              onSnapToItem={(index) => {
                setSelectedDurationIndex(index);
                redirectTo.current = "IGNORE";
              }}
              onProgressChange={(
                offsetProgress: number,
                absouluteProgress: number
              ) => {
                if (
                  absouluteProgress - previousProgress.current >= 1 ||
                  previousProgress.current - absouluteProgress >= 1
                ) {
                  previousProgress.current = absouluteProgress;
                  if (Platform.OS !== "web") {
                    Haptics.selectionAsync();
                  }
                }
              }}
              customAnimation={
                parallaxLayout(
                  {
                    size: responsiveWidth / (level === "EASY" ? 3.5 : 3.2),
                    vertical: false,
                  },
                  {
                    parallaxScrollingScale: 1,
                    parallaxAdjacentItemScale: 0.5,
                    parallaxScrollingOffset: 40,
                  }
                ) as any
              }
              scrollAnimationDuration={500}
              modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
              }}
            />

            <SizableText
              fontSize={"$xl"}
              fontWeight={"$semibold"}
              color={"$white"}
              textAlign="center"
              lineHeight={30}
            >
              {languageData.pick_length}
            </SizableText>
            <Carousel
              ref={wordLengthCarouselRef}
              loop
              autoPlay={false}
              snapEnabled={true}
              pagingEnabled={false}
              defaultIndex={0}
              style={{
                width: responsiveWidth / 1.5,
                height: 140,
                marginTop: -25,
                justifyContent: "center",
                alignItems: "center",
              }}
              width={responsiveWidth / 3.5}
              data={wordLengths}
              renderItem={({ item, index, animationValue }) => {
                return (
                  <CustomItem
                    key={index}
                    value={item}
                    label={languageData.letters}
                    animationValue={animationValue}
                    onPress={() => {
                      wordLengthCarouselRef.current.scrollTo({
                        index: index,
                        animated: true,
                      });
                    }}
                  />
                );
              }}
              onSnapToItem={(index) => {
                setSelectedWordLengthIndex(index);
                redirectTo.current = "IGNORE";
              }}
              onProgressChange={(
                offsetProgress: number,
                absouluteProgress: number
              ) => {
                if (
                  absouluteProgress - previousProgress.current >= 1 ||
                  previousProgress.current - absouluteProgress >= 1
                ) {
                  previousProgress.current = absouluteProgress;
                  if (Platform.OS !== "web") {
                    Haptics.selectionAsync();
                  }
                }
              }}
              customAnimation={
                parallaxLayout(
                  {
                    size: responsiveWidth / 3.5,
                    vertical: false,
                  },
                  {
                    parallaxScrollingScale: 1,
                    parallaxAdjacentItemScale: 0.5,
                    parallaxScrollingOffset: 40,
                  }
                ) as any
              }
              scrollAnimationDuration={500}
              modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
              }}
            />

            <SizableText
              mx={"$4"}
              mb={"$4"}
              fontSize={"$sm"}
              fontWeight={"$semibold"}
              color={"$white"}
              textAlign="center"
            >
              {languageData.challenge_yourself}{" "}
              {wordLengths[selectedWordLengthIndex]}
              {languageData.letter_words_starting_with}{" "}
              {currentAlphabets[selectedAlphabetIndex]} {languageData.in}{" "}
              {durations[selectedDurationIndex]} {languageData.seconds}
            </SizableText>
          </YStack>
        </ScrollView>

        <YStack mx={"$4"}>
          <BasicButton
            height={56}
            linearGradientProps={{ colors: ["#1c2e4a", "#1c2e4a"] }}
            onPress={() => {
              redirectTo.current = "PLAY-GAME";
              if (isLoaded && canShowAdmobInteratitial()) {
                showInterstitial();
              } else {
                // No advert ready to show yet
                redirectToNextScreenAfterAdmobInterstitial();
              }
            }}
          >
            <YStack width={responsiveWidth - 60}>
              <Image
                key={"letsPlayPrimary"}
                source={images.letsPlayPrimary}
                style={{
                  height: isPhoneDevice ? 22 : 33,
                  width: isPhoneDevice ? 22 : 33,
                  tintColor: "white",
                  zIndex: 1,
                  position: "absolute",
                  left: isPhoneDevice ? 18 : 28,
                }}
                alt={"letsPlayPrimary"}
              />
              <SizableText
                fontSize={isPhoneDevice ? "$hsm" : "$hmd"}
                lineHeight={isPhoneDevice ? 30 : 40}
                color={"$white"}
                fontWeight={"700"}
                textAlign="center"
              >
                {languageData.lets_play}
              </SizableText>
            </YStack>
          </BasicButton>
          <YStack h={"$4"} />
        </YStack>
      </ResponsiveContent>
      <YStack h={insets.bottom} />
    </YStack>
  );
}

interface ItemProps {
  value: string;
  label: string;
  animationValue: SharedValue<number>;
  onPress: () => void;
}
const CustomItem: React.FC<ItemProps> = ({
  value,
  label,
  onPress,
  animationValue,
}) => {
  const maskStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animationValue.value, [-1, 0, 1], [1, 0, 1]);

    return {
      opacity,
    };
  }, [animationValue]);

  return (
    <YStack
      onPress={onPress}
      flex={1}
      borderRadius={10}
      overflow={"hidden"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <YStack justifyContent="center" alignItems="center" alignSelf="center">
        <SizableText
          fontSize={"$5xl"}
          fontWeight={"$semibold"}
          color={"$white"}
          textAlign="center"
          lineHeight={55}
        >
          {value}
        </SizableText>

        <SizableText
          mt={-10}
          fontSize={"$xs"}
          fontWeight={"$semibold"}
          color={"$white"}
          textAlign="center"
        >
          {label}
        </SizableText>
      </YStack>
      <BlurView
        intensity={Platform.OS === "android" ? 50 : 10}
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, maskStyle]}
      />
    </YStack>
  );
};

export default InitGameScreen;
