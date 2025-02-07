import {
  Label,
  RadioGroup,
  SizableText,
  SizeTokens,
  XStack,
  YStack,
} from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import BasicButton from "@design-system/components/buttons/basic-button";
import ResponsiveContent from "@modules/shared/responsive-content";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "@modules/shared/components/form-input/form-input";
import { showErrorToast, showNormalToast } from "@utils/toast-handler";
import DeviceInfo from "react-native-device-info";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { AppManifest } from "../../../app-manifest";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";
import { HIT_SLOP } from "@utils/theme";
import { Image, ImageProps, Platform } from "react-native";
import images from "@assets/images/images";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import { router } from "expo-router";
import useKeyboardAnimatedHeight from "@modules/shared/hooks/use-keyboard-animated-height";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import InputAccessoryViewiOS from "@modules/shared/components/input-accessory-view-details";
import { DeviceType, deviceType } from "expo-device";
import contents from "@assets/contents/contents";

function AddContentsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedFeedbackType, setSelectedFeedbackType] = useState<
    "GENERAL" | "FEATURES_SUGGESTIONS" | "TECHNICAL_HELP" | ""
  >("GENERAL");
  const [selectedFeedbackRating, setSelectedFeedbackRating] =
    useState<number>(-1);
  const uniqueDeviceId = DeviceInfo.getUniqueIdSync();
  const responsiveWidth = useResponsiveWidth();
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  const languageData =
    contents.feedbackScreenSelectedLanguage?.[
      global?.currentSelectedLanguage ?? "English"
    ];

  const feedbackTypes = [
    { title: languageData.general_feedback },
    { title: languageData.features_suggestions },
    { title: languageData.technical_help },
  ];

  //For Firestore
  const firebaseConfig = AppManifest.extra.firebaseWeb;
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const { control, watch } = useForm({
    defaultValues: { feedback: "" },
  });

  const keyboardAnimatedHeight = useKeyboardAnimatedHeight();
  const keyboardAnimatedStyle = useAnimatedStyle(() => ({
    height: keyboardAnimatedHeight.value,
  }));

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader
        title={languageData.feedback_support}
        backgroundColor={"$primary"}
      />
      <ResponsiveContent flex={1}>
        <YStack h={isPhoneDevice ? "$4" : "$6"} />
        <SizableText
          fontSize={isPhoneDevice ? "$md" : "$2xl"}
          lineHeight={isPhoneDevice ? 22 : 34}
          color={"$secondPrimaryColor"}
          fontWeight={"$semibold"}
          textAlign="center"
        >
          {languageData.your_review}
        </SizableText>
        <YStack h={"$8"} />
        <RadioGroup
          defaultValue={selectedFeedbackType}
          native={true}
          onValueChange={(value) => {
            switch (value) {
              case "GENERAL":
                setSelectedFeedbackType("GENERAL");
                break;

              case "FEATURES_SUGGESTIONS":
                setSelectedFeedbackType("FEATURES_SUGGESTIONS");
                break;

              case "TECHNICAL_HELP":
                setSelectedFeedbackType("TECHNICAL_HELP");
                break;
            }
          }}
        >
          <YStack alignItems="center">
            <RadioGroupItemWithLabel
              isSelected={selectedFeedbackType === "GENERAL"}
              width={responsiveWidth - 40}
              size={isPhoneDevice ? "$5" : "$9"}
              value={"GENERAL"}
              label={feedbackTypes[0].title}
              isPhoneDevice={isPhoneDevice}
            />
            <YStack h={isPhoneDevice ? "$5" : "$9"} />
            <RadioGroupItemWithLabel
              isSelected={selectedFeedbackType === "FEATURES_SUGGESTIONS"}
              width={responsiveWidth - 40}
              size={isPhoneDevice ? "$5" : "$9"}
              value={"FEATURES_SUGGESTIONS"}
              label={feedbackTypes[1].title}
              isPhoneDevice={isPhoneDevice}
            />
            <YStack h={isPhoneDevice ? "$5" : "$9"} />
            <RadioGroupItemWithLabel
              isSelected={selectedFeedbackType === "TECHNICAL_HELP"}
              width={responsiveWidth - 40}
              size={isPhoneDevice ? "$5" : "$9"}
              value={"TECHNICAL_HELP"}
              label={feedbackTypes[2].title}
              isPhoneDevice={isPhoneDevice}
            />
          </YStack>
        </RadioGroup>
        <YStack h={isPhoneDevice ? "$5" : "$9"} />
        <YStack mx={"$4"}>
          <FormInput
            name="feedback"
            control={control}
            type={"text"}
            textInputProps={{
              placeholder: languageData.your_feedback,
              focusable: true,
              autoFocus: false,
              fontSize: isPhoneDevice ? "$hxs" : "$xl",
              autoCapitalize: "sentences",
              hideShadow: false,
              numberOfLines: 5,
              maxLength: 250,
              multiline: true,
              textAlign: "left",
              textAlignVertical: "top",
            }}
            testID="feedback-input"
          />
        </YStack>
        <YStack h={isPhoneDevice ? "$5" : "$9"} />
        <XStack mx={"$4"} justifyContent="center" alignItems="center">
          <RatingItem
            onPress={() => {
              setSelectedFeedbackRating(1);
            }}
            image={images.mood1}
            selectedFeedbackRating={selectedFeedbackRating}
            index={1}
            selectedColor="#ef4444"
            isPhoneDevice={isPhoneDevice}
          />
          <YStack flex={1} />
          <RatingItem
            onPress={() => {
              setSelectedFeedbackRating(2);
            }}
            image={images.mood2}
            selectedFeedbackRating={selectedFeedbackRating}
            index={2}
            selectedColor="#f97316"
            isPhoneDevice={isPhoneDevice}
          />
          <YStack flex={1} />
          <RatingItem
            onPress={() => {
              setSelectedFeedbackRating(3);
            }}
            image={images.mood3}
            selectedFeedbackRating={selectedFeedbackRating}
            index={3}
            selectedColor="#eab308"
            isPhoneDevice={isPhoneDevice}
          />
          <YStack flex={1} />
          <RatingItem
            onPress={() => {
              setSelectedFeedbackRating(4);
            }}
            image={images.mood4}
            selectedFeedbackRating={selectedFeedbackRating}
            index={4}
            selectedColor="#3b82f6"
            isPhoneDevice={isPhoneDevice}
          />
          <YStack flex={1} />
          <RatingItem
            onPress={() => {
              setSelectedFeedbackRating(5);
            }}
            image={images.mood5}
            selectedFeedbackRating={selectedFeedbackRating}
            index={5}
            selectedColor="#22c55e"
            isPhoneDevice={isPhoneDevice}
          />
        </XStack>
        <YStack h={isPhoneDevice ? "$3" : "$5"} />
        <YStack flex={1} />
        <YStack mx={"$4"} mb={"$5"}>
          <BasicButton
            height={isPhoneDevice ? 48 : 72}
            disabledLinearGradientProps={{ colors: ["#a1a1aa", "#a1a1aa"] }}
            linearGradientProps={{ colors: ["#1c2e4a", "#1c2e4a"] }}
            onPress={async () => {
              const feedback = watch("feedback") ?? "";
              if (feedback.length > 0) {
                if (selectedFeedbackRating > 0) {
                  try {
                    addDoc(collection(db, "feedback"), {
                      "device-id": uniqueDeviceId,
                      feedback: feedback,
                      "feedback-rating": selectedFeedbackRating,
                      "feedback-type": selectedFeedbackType.toString(),
                    });

                    showNormalToast(languageData.thank_you_for_feedback);
                    try {
                      if (router.canGoBack()) {
                        router.back();
                      } else {
                        router.replace("/");
                      }
                    } catch {}
                  } catch (err) {
                    alert(err);
                  }
                } else {
                  showErrorToast(languageData.please_choose_feedback_rating);
                }
              } else {
                showErrorToast(languageData.please_write_your_feedback);
              }
            }}
          >
            <SizableText
              fontSize={isPhoneDevice ? "$md" : "$2xl"}
              color={"$white"}
              fontWeight={"$bold700"}
              textAlign="center"
              lineHeight={isPhoneDevice ? 24 : 34}
            >
              {languageData.send_feedback}
            </SizableText>
          </BasicButton>
        </YStack>
      </ResponsiveContent>
      <YStack alignItems="center">
        <AdmobBanner />
        <Animated.View style={keyboardAnimatedStyle} />
      </YStack>
      <YStack h={insets.bottom} />
      {Platform.OS === "ios" && <InputAccessoryViewiOS title={"Done"} />}
    </YStack>
  );
}

export default AddContentsScreen;

export function RadioGroupItemWithLabel(
  props: Readonly<{
    size: SizeTokens;
    value: string;
    label: string;
    width: number;
    isSelected: boolean;
    isPhoneDevice: boolean;
  }>
) {
  const id = `radiogroup-${props.value}`;
  return (
    <XStack width={props.width} alignItems="center">
      <RadioGroup.Item
        borderColor={props.isSelected ? "$secondPrimaryColor" : "$black"}
        value={props.value}
        id={id}
        hitSlop={HIT_SLOP}
        size={props.isPhoneDevice ? "$11" : "$16"}
      >
        <RadioGroup.Indicator backgroundColor={"$secondPrimaryColor"} />
      </RadioGroup.Item>
      <YStack w={props.isPhoneDevice ? "$4" : "$6"} />
      <Label
        size={props.size}
        fontWeight={"$semibold"}
        htmlFor={id}
        lineHeight={"$4"}
      >
        {props.label}
      </Label>
    </XStack>
  );
}

export function RatingItem(
  props: Readonly<{
    onPress: () => void;
    index: number;
    selectedFeedbackRating: number;
    selectedColor: string;
    image: Readonly<ImageProps>;
    isPhoneDevice: boolean;
  }>
) {
  const {
    onPress,
    selectedFeedbackRating,
    image,
    index,
    selectedColor,
    isPhoneDevice,
  } = props;
  const iconSize = isPhoneDevice ? 32 : 44;
  return (
    <YStack
      borderColor={selectedFeedbackRating === index ? "$white" : selectedColor}
      borderWidth={selectedFeedbackRating === index ? 2 : 1}
      bg={selectedFeedbackRating === index ? selectedColor : "$black"}
      borderRadius={8}
      p={isPhoneDevice ? "$2" : "$3"}
    >
      <TouchableScale onPress={onPress}>
        <Image
          key={`mood-${index}`}
          source={image}
          style={{
            height: iconSize,
            width: iconSize,
            resizeMode: "center",
            tintColor: "#ffffff",
          }}
          alt={`mood-${index}`}
        />
      </TouchableScale>
    </YStack>
  );
}
