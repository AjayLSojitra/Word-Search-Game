import { SizableText, XStack, YStack } from "tamagui";
import { FlatList, Image, ListRenderItem } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import {
  useFocusEffect,
  useGlobalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import images from "@assets/images/images";
import { SHADOW } from "@design-system/utils/constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import sounds from "@assets/sounds/sounds";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import wordfiles from "@assets/dictionary/wordfile";
import { SpellInputs } from "../../../modals/spell-inputs.model";
import SpellInputCard from "./spell-input-card";
import LocalStorage from "@utils/local-storage";
import { HIT_SLOP } from "@utils/theme";
import ResponsiveContent from "@modules/shared/responsive-content";
import { OtpInput } from "./otp-input";
import { OtpInputRef } from "./otp-input.types";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import { staticInterstitialAd } from "@modules/shared/components/helpers";
import AdsNotifyDialog from "@modules/shared/components/confirmation-dialog/ads-notify-dialog";
import useKeyboardAnimatedHeight from "@modules/shared/hooks/use-keyboard-animated-height";
import contents from "@assets/contents/contents";

type RenderItem = ListRenderItem<SpellInputs>;

function PlayGameScreen() {
  const {
    alphabet = "",
    wordLength = "0",
    duration = "0",
    isForTraining = "No",
  }: {
    alphabet?: string;
    wordLength?: string;
    duration?: string;
    isForTraining?: string;
  } = useGlobalSearchParams();

  const languageData =
    contents.welcomeScreenSelectedLanguage?.[
      global?.currentSelectedLanguage ?? "English"
    ];
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollViewRef = useRef<any>(null);
  const currentLanguage = global?.currentSelectedLanguage ?? "English";
  const words = wordfiles[currentLanguage];

  const [spellItems, setSpellItems] = useState<SpellInputs[]>([]);
  const inputRef = useRef<OtpInputRef>(null);
  const [sound, setSound] = useState<Audio.Sound>();
  async function playTimerOverWarningCountdownSound() {
    if (isSoundEnabled.current) {
      const { sound } = await Audio.Sound.createAsync(
        sounds.timerOverWarningCountdown
      );
      setSound(sound);
      await sound.playAsync();
    }
  }

  async function playCorrectSound() {
    if (isSoundEnabled.current) {
      const { sound } = await Audio.Sound.createAsync(sounds.correct);
      setSound(sound);
      await sound.playAsync();
    }
  }

  async function playWrongSound() {
    if (isSoundEnabled.current) {
      const { sound } = await Audio.Sound.createAsync(sounds.wrong);
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

  const { isLoaded, isClosed, load, show, error, isShowing } =
    useInterstitialAd(
      __DEV__
        ? TestIds.INTERSTITIAL_VIDEO
        : global?.interstitialAd ?? staticInterstitialAd
    );
  const isInterstitialShowed = useRef<boolean>(false);

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

  const redirectToNextScreenAfterAdmobInterstitial = () => {
    if (isForTraining === "Yes") {
      router.replace(
        `./time-over?correctWord=${getCorrectSpellCount()}&&wrongWord=${getWrongSpellCount()}&&repeatWord=${getRepeatSpellCount()}`
      );
    } else {
      router.replace(
        `./score-card?correctWord=${getCorrectSpellCount()}&&wrongWord=${getWrongSpellCount()}&&repeatWord=${getRepeatSpellCount()}&&alphabet=${alphabet}&&wordLength=${wordLength}&&duration=${duration}`
      );
    }
  };

  const [timerCountdown, setTimerCountdown] = useState<number>(
    parseInt(duration ?? "0")
  );
  const [startTimerInterval, setStartTimerInterval] = useState<boolean>(true);
  const timerRef = useRef(timerCountdown);
  const intervalCompleted = useRef(false);
  const minDurationForHalfTime = 30;

  let timerId;
  useEffect(() => {
    timerId = setInterval(() => {
      if (
        parseInt(duration ?? "0") > minDurationForHalfTime &&
        timerRef.current === parseInt(duration ?? "0") / 2 &&
        !intervalCompleted.current
      ) {
        //Half Time Interval
        stopTimer();
        router.push(`./half-time?isForTraining=${isForTraining}`);
      } else {
        intervalCompleted.current = false;
        timerRef.current -= 1;

        if (timerRef.current === 4) {
          //Play countdown timer
          playTimerOverWarningCountdownSound();
        }
        if (timerRef.current < 0) {
          //Time is over
          clearInterval(timerId);

          //Show Interstitial Ad
          if (isLoaded && global?.showAds) {
            setShowAdsConfirmationPopup(true);
            setTimeout(() => {
              if (!isInterstitialShowed.current) {
                isInterstitialShowed.current = true;
                show();
              }
            }, 3000);
          } else {
            // No advert ready to show yet
            redirectToNextScreenAfterAdmobInterstitial();
          }
        } else {
          // setTimerCountdown(timerRef.current); //TODO
          stopTimer();
        }
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [startTimerInterval, intervalCompleted.current, timerRef.current]);

  const startTimer = () => {
    setStartTimerInterval(!startTimerInterval);
  };

  const stopTimer = () => {
    clearInterval(timerId);
  };

  const formattedValue = (value: number) => {
    return value > 9 ? value : `0` + value;
  };

  const remainSecForHalfTimeInterval = () => {
    return timerRef.current - parseInt(duration ?? "0") / 2;
  };

  const canShowHalfTimeIntervalWarning = () => {
    return (
      parseInt(duration ?? "0") > minDurationForHalfTime &&
      remainSecForHalfTimeInterval() >= 0 &&
      remainSecForHalfTimeInterval() <= 4
    );
  };

  //For Play Half Time Inerval Warning Sound
  useEffect(() => {
    if (
      parseInt(duration ?? "0") > minDurationForHalfTime &&
      timerRef.current - parseInt(duration ?? "0") / 2 === 4
    ) {
      playTimerOverWarningCountdownSound();
    }
  }, [timerRef.current, duration]);

  useEffect(() => {
    if (canShowHalfTimeIntervalWarning()) {
      playAnim();
    }
  }, [timerRef.current, duration]);

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(
    () => ({ transform: [{ scale: scale.value }] }),
    []
  );

  const playAnim = () => {
    scale.value = withTiming(0.96, { duration: 100 });

    setTimeout(() => {
      scale.value = withTiming(1, { duration: 50 });
    }, 250);
  };

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      intervalCompleted.current = true;
      startTimer();
      inputRef.current.focus();
    });

    return unsubscribe;
  }, [navigation]);

  const keyExtractor = useCallback(
    (item, index) => (item?.inputValue ?? "") + (index ?? 0),
    []
  );

  const renderItem: RenderItem = useCallback((item) => {
    return <SpellInputCard item={item?.item} />;
  }, []);

  const renderSeparator = useCallback(() => {
    return <></>;
  }, []);

  const renderEmptyState = useCallback(() => {
    return <></>;
  }, []);

  const check = (text: string) => {
    if (words.length === 0) {
      console.error("ERROR! Dictionaries are not loaded");
      return;
    }

    const regex = `/\/[^0-9a-zA-Z-_]\/g/`;
    const textArr = text
      .replace(regex, " ")
      .split(" ")
      .filter((item) => item);

    const outObj = {};

    for (let i = 0; i < textArr.length; i++) {
      const checked = checkWord(textArr[i]);
      const checkedList = Array.isArray(checked) ? checked : [checked];

      for (let j = 0; j < checkedList.length; j++) {
        if (checkedList[j] == null) {
          outObj[textArr[i]] = true;
        }
      }
    }

    return Object.keys(outObj);
  };

  const checkWord = (wordProp: string, recblock?: boolean) => {
    // Just go away, if the word is not literal
    if (wordProp == null || wordProp === "" || !isNaN(Number(wordProp))) {
      return;
    }

    // Way of reducing the load-time of dictionary
    // Post-escaping comments from files
    const word: string = wordProp.replace(/^#/, "");

    // If the word exists, returns true
    if (words.indexOf(word) >= 0 || words.indexOf(word.toLowerCase()) >= 0) {
      return true;
    }

    // Check for the presence of the add. chars
    const esymb = "-/'";

    // Checking parts of words
    for (let i = 0; i < esymb.length; i++) {
      if (recblock || word.indexOf(esymb[i]) === -1) {
        continue;
      }

      const retArray = word.split(esymb[i]).map((item: string, i: number) => {
        if (i === 0) {
          return checkWord(item, true);
        } else {
          const res = checkWord(item, true);
          return res || checkWord(esymb[i] + item, true);
        }
      });

      return retArray;
    }
  };

  const clearAllInputs = () => {
    inputRef.current.clear();
  };

  const getCorrectSpellCount = useCallback(() => {
    return (spellItems?.filter(({ status }) => status === "CORRECT") ?? [])
      .length;
  }, [spellItems]);

  const getWrongSpellCount = useCallback(() => {
    return (spellItems?.filter(({ status }) => status === "WRONG") ?? [])
      .length;
  }, [spellItems]);

  const getRepeatSpellCount = useCallback(() => {
    return (spellItems?.filter(({ status }) => status === "DUPLICATE") ?? [])
      .length;
  }, [spellItems]);

  const validateInputs = (inputValues: string) => {
    const inputSpell = inputValues;

    const isAnyEmptyInput = inputSpell.length !== parseInt(wordLength);
    if (!isAnyEmptyInput) {
      //Check for first alphabet (If wrong Red Color)
      const firstAlphabet = Array.from(inputSpell)[0];
      if (firstAlphabet != alphabet) {
        //First input value is start with wrong alphabet!
        playWrongSound();
        setSpellItems([
          { inputValue: inputSpell, status: "WRONG" },
          ...spellItems,
        ]);
        clearAllInputs();
        return;
      }

      // //check for correct spelling (If wrong Red color else if correct then Green Color)
      const spellCorrectionResult = check(inputSpell);
      if (spellCorrectionResult.length === 0) {
        //Check for Duplication (If found duplication Yellow color)
        if (spellItems.some((item) => item.inputValue === inputSpell)) {
          //Duplicate Spelling!
          playWrongSound();
          setSpellItems([
            { inputValue: inputSpell, status: "DUPLICATE" },
            ...spellItems,
          ]);
          clearAllInputs();
          return;
        }

        //Correct Spelling!
        playCorrectSound();
        setSpellItems([
          { inputValue: inputSpell, status: "CORRECT" },
          ...spellItems,
        ]);
        clearAllInputs();
        return;
      } else {
        //Wrong Spelling!
        playWrongSound();
        setSpellItems([
          { inputValue: inputSpell, status: "WRONG" },
          ...spellItems,
        ]);
        clearAllInputs();
        return;
      }
    }
  };

  const isSoundEnabled = useRef(true);
  const [isSoundSwitchEnabled, setIsSoundSwitchEnabled] = useState(true);
  const toggleSound = () => (isSoundEnabled.current = !isSoundEnabled.current);
  const toggleSoundSwitch = () =>
    setIsSoundSwitchEnabled((previousState) => !previousState);
  useFocusEffect(
    useCallback(() => {
      LocalStorage.getItemDefault("SOUND_KEY").then((val) => {
        isSoundEnabled.current = val == null || val === "Yes";
        setIsSoundSwitchEnabled(val == null || val === "Yes");
      });
    }, [])
  );

  const [showAdsConfirmationPopup, setShowAdsConfirmationPopup] =
    useState(false);

  const keyboardAnimatedHeight = useKeyboardAnimatedHeight();
  const keyboardAnimatedStyle = useAnimatedStyle(() => ({
    height: keyboardAnimatedHeight.value,
  }));

  return (
    <YStack flex={1} backgroundColor={"$primary"}>
      <ScrollHeader
        title={
          isForTraining === "Yes"
            ? languageData.train_your_mind
            : languageData.play_game
        }
        backgroundColor={"$primary"}
        rightElement={
          <XStack alignItems="center">
            {isForTraining === "Yes" && (
              <TouchableScale
                style={{ marginRight: 8 }}
                hitSlop={HIT_SLOP}
                onPress={() => {
                  stopTimer();
                  router.push("./help?isForTraining=Yes");
                }}
              >
                <YStack
                  alignItems="center"
                  justifyContent="center"
                  height={24}
                  width={24}
                >
                  <Image
                    key={"help"}
                    source={images.help}
                    style={{ height: 18, width: 18 }}
                    alt={"help"}
                  />
                </YStack>
              </TouchableScale>
            )}
            <TouchableScale
              hitSlop={HIT_SLOP}
              onPress={() => {
                LocalStorage.setItemDefault(
                  "SOUND_KEY",
                  isSoundEnabled.current ? "No" : "Yes",
                  () => {
                    toggleSound();
                    toggleSoundSwitch();
                  }
                );
              }}
            >
              <YStack
                alignItems="center"
                justifyContent="center"
                height={24}
                width={24}
              >
                <Image
                  key={"sound"}
                  source={
                    isSoundSwitchEnabled ? images.soundOnWhite : images.soundOff
                  }
                  style={{ height: 24, width: 24 }}
                  alt={"sound"}
                />
              </YStack>
            </TouchableScale>
          </XStack>
        }
      />

      <ResponsiveContent>
        <YStack alignItems="center" justifyContent="center">
          <AdsNotifyDialog
            showDialog={showAdsConfirmationPopup}
            content={`Ad is loading...`}
          />
        </YStack>

        <XStack justifyContent="center">
          <XStack
            {...SHADOW.basicCard}
            bg={"$white"}
            borderRadius={100}
            px={"$2"}
            py={"$1"}
            ml={"$4"}
            my={"$2"}
            alignItems="center"
            justifyContent="center"
          >
            <Image
              key={"timer"}
              source={images.timer}
              style={{ height: 18, width: 18 }}
              alt={"timer"}
            />
            <YStack w={"$2"} />
            <SizableText
              size={"$hsm"}
              color={timerCountdown < 5 ? "$red.600" : "$blueGray.500"}
              fontWeight={"$semibold"}
              textAlign="center"
            >
              {formattedValue(timerCountdown)}
              <SizableText
                size={"$hsm"}
                color={"$primary"}
                fontWeight={"$bold900"}
                textAlign="center"
              >
                {` / ${formattedValue(parseInt(duration))}`}
              </SizableText>
            </SizableText>
          </XStack>
          <YStack flex={1} />
          {canShowHalfTimeIntervalWarning() && (
            <XStack
              {...SHADOW.basicCard}
              bg={"$red.600"}
              borderRadius={100}
              px={"$2"}
              py={"$1"}
              my={"$2"}
              alignItems="center"
              justifyContent="center"
            >
              <Animated.View style={animatedStyle}>
                <SizableText
                  size={"$xs"}
                  color={"$white"}
                  fontWeight={"$semibold"}
                  textAlign="center"
                >
                  {remainSecForHalfTimeInterval() > 0
                    ? `Half Time in ${remainSecForHalfTimeInterval()}s`
                    : "It's Half Time "}
                </SizableText>
              </Animated.View>
            </XStack>
          )}
          {canShowHalfTimeIntervalWarning() && <YStack flex={1} />}
          <XStack
            {...SHADOW.basicCard}
            bg={"$white"}
            borderRadius={100}
            px={"$2"}
            py={"$1"}
            mr={"$4"}
            my={"$2"}
            alignItems="center"
            justifyContent="center"
          >
            <Image
              key={"correctWord"}
              source={images.correctWord}
              style={{ height: 18, width: 18 }}
              alt={"correctWord"}
            />
            <YStack w={"$2"} />
            <SizableText
              size={"$hsm"}
              color={"$blueGray.500"}
              fontWeight={"$semibold"}
              textAlign="center"
            >
              {`${formattedValue(getCorrectSpellCount())}`}
              <SizableText
                size={"$hsm"}
                color={"$primary"}
                fontWeight={"$bold900"}
                textAlign="center"
              >
                {` / ${formattedValue(spellItems?.length ?? 0)}`}
              </SizableText>
            </SizableText>
          </XStack>
        </XStack>
        <YStack h={"$3"} />
        {isForTraining === "Yes" && (
          <>
            <YStack h={"$4"} />
            <SizableText
              mx={"$4"}
              size={"$hxs"}
              color={"$white"}
              fontWeight={"$medium"}
              textAlign="center"
            >
              {languageData.train_yourself_to_write_as_many}
              {"  "}
              {wordLength}
              {languageData.letter_words_starting_with}
              {"  "}
              {`${alphabet}`}.
            </SizableText>
            <YStack h={"$4"} />
          </>
        )}
        <YStack height={150} marginTop={"$4"}>
          <FlatList
            scrollEnabled={true}
            ref={scrollViewRef}
            horizontal={false}
            keyboardShouldPersistTaps={"handled"}
            numColumns={1000}
            columnWrapperStyle={{ flexWrap: "wrap", flex: 1 }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={renderSeparator}
            ListEmptyComponent={renderEmptyState}
            data={spellItems}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </YStack>
      </ResponsiveContent>

      <ResponsiveContent flex={1} justifyContent="flex-end">
        <OtpInput
          ref={inputRef}
          numberOfDigits={parseInt(wordLength)}
          focusColor="black"
          hideStick
          onFilled={(text) => validateInputs(text)}
          alphabet={alphabet}
          autoFocus
        />
      </ResponsiveContent>
      <YStack alignItems="center">
        {!isShowing && (
          <>
            <AdmobBanner />
            <Animated.View style={keyboardAnimatedStyle} />
          </>
        )}
      </YStack>
      <YStack h={insets.bottom} />
    </YStack>
  );
}

export default PlayGameScreen;
