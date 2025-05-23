import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Platform, View, ViewStyle } from "react-native";
import OtpInputProps, { OtpInputRef } from "./otp-input.types";
import { SizableText, YStack } from "tamagui";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import InputAccessoryViewiOS from "@modules/shared/components/input-accessory-view-details";
import CustomKeyboard from "@modules/shared/components/custom-keyboard/CustomKeyboard";
import contents from "@assets/contents/contents";
import styles from "./otp-input.styles";
import useOtpInput from "./use-otp-input";
import VerticalStick from "./vertical-stick";
import { DeviceType, deviceType } from "expo-device";
import ResponsiveContent from "@modules/shared/responsive-content";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";

const CategoryInput = forwardRef<OtpInputRef, OtpInputProps>((props, ref) => {
  const {
    models: { text, focusedInputIndex, hasCursor },
    actions: { clear, handlePress, handleTextChange, focus },
    forms: { setTextWithRef },
  } = useOtpInput(props);
  const {
    disabled,
    hideStick,
    focusColor = "#A4D0A4",
    focusStickBlinkingDuration,
    secureTextEntry = false,
    theme = {},
    item,
    currentCategoryItem,
    onFilled,
    redirectToNextScreenAfterAdmobInterstitial,
  } = props;
  const {
    containerStyle,
    inputsContainerStyle,
    pinCodeContainerStyle,
    focusStickStyle,
    focusedPinCodeContainerStyle,
    filledPinCodeContainerStyle,
    disabledPinCodeContainerStyle,
  } = theme;
  const responsiveWidth = useResponsiveWidth();
  const isPhoneDevice = deviceType === DeviceType.PHONE;
  useImperativeHandle(ref, () => ({
    clear,
    focus,
    setValue: setTextWithRef,
  }));
  const selectedLanguage = global?.currentSelectedLanguage ?? "English";
  const isEnglish = selectedLanguage === "English"; // Check for the language
  const languageData = contents.CurrentLanguageCategoriesItem[selectedLanguage];

  const selectedCategory = languageData[item];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(selectedCategory[0]);

  const widthStyle =
    selectedLanguage === "English"
      ? (responsiveWidth - 42) / currentWord.length - 2
      : responsiveWidth / 1.5;

  useEffect(() => {
    setCurrentWord(selectedCategory[currentWordIndex]);
  }, [currentWordIndex, selectedCategory]);
  const [categoryWordLength, setCategoryWordLength] = useState(
    currentWord.length
  );
  useEffect(() => {
    setCategoryWordLength(currentWord.length); // Pass the current word's length to the parent

    // Only proceed if the length of the text matches the categoryWordLength
    if (text.length === categoryWordLength) {
      // Check if the text matches the current word (case-insensitive)
      if (text.toUpperCase() === currentWord.toUpperCase()) {
        // Word typed correctly, move to the next word
        if (currentWordIndex < selectedCategory.length - 1) {
          setCurrentWordIndex((prevIndex) => prevIndex + 1);
        } else {
          redirectToNextScreenAfterAdmobInterstitial();
        }

        handleTextChange(""); // Clear the input field for the next word
      }
    }
  }, [
    text,
    currentWord,
    currentWordIndex,
    selectedCategory,
    handleTextChange,
    currentCategoryItem,
    categoryWordLength,
  ]);

  const generatePinCodeContainerStyle = (
    isFocusedInput: boolean,
    char: string
  ) => {
    const stylesArray = [
      {
        borderWidth: 0,
        borderRadius: 8,
        backgroundColor: "#1c2e4a",
        height: isPhoneDevice ? 60 : 90,
        width: widthStyle,
        justifyContent: "center",
        alignItems: "center",
      } as ViewStyle,
      pinCodeContainerStyle,
    ];
    if (focusColor && isFocusedInput) {
      stylesArray.push({ borderColor: focusColor });
    }

    if (focusedPinCodeContainerStyle && isFocusedInput) {
      stylesArray.push(focusedPinCodeContainerStyle);
    }

    if (filledPinCodeContainerStyle && Boolean(char)) {
      stylesArray.push(filledPinCodeContainerStyle);
    }

    if (disabledPinCodeContainerStyle && disabled) {
      stylesArray.push(disabledPinCodeContainerStyle);
    }

    return stylesArray;
  };
  const handleKeyPress = (key: string) => {
    let updatedText = text;
    if (key === "Backspace") {
      updatedText = updatedText.slice(0, -1); // Remove last character
    } else if (key === "Space") {
      updatedText += " "; // Add space
    } else {
      updatedText += key; // Add the typed key
    }
    if (updatedText.length === categoryWordLength) {
      onFilled?.(updatedText);
    }
    handleTextChange(updatedText); // Update the text in the OTP input
  };

  const getFontWidth = () => {
    const numberOfDigits = currentWord?.length ?? 0;
    if (isPhoneDevice) {
      return numberOfDigits > 6 ? "$hmd" : "$hlg";
    }

    return numberOfDigits > 6 ? "$hlg" : "$4xl";
  };

  const getFontLineHeight = () => {
    const numberOfDigits = currentWord?.length ?? 0;
    if (isPhoneDevice) {
      return numberOfDigits > 6 ? 30 : 40;
    }
    return numberOfDigits > 6 ? 40 : 48;
  };

  const renderOtpInputs = () => {
    if (isEnglish) {
      return (
        <>
          {/* YStack displaying currentWord above OTP inputs */}
          <YStack
            flexDirection="row"
            justifyContent="space-between"
            marginBottom={14}
          >
            {currentWord.split("").map((char, index) => {
              return (
                <View
                  key={index}
                  style={{
                    borderWidth: 0,
                    borderRadius: 8,
                    backgroundColor: "white",
                    height: 60,
                    width: widthStyle,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 14,
                  }}
                >
                  <SizableText
                    size={getFontWidth()}
                    lineHeight={getFontLineHeight()}
                    color={"#1c2e4a"}
                    fontWeight={"$bold900"}
                  >
                    {char.toUpperCase()}
                  </SizableText>
                </View>
              );
            })}
          </YStack>

          {/* OTP inputs for text entry */}
          <YStack
            flexDirection="row"
            justifyContent="space-between"
            marginBottom={14}
          >
            {Array(currentWord.length)
              .fill(0)
              .map((_, index) => {
                const char = text[index];
                const isFocusedInput =
                  index === focusedInputIndex &&
                  !disabled &&
                  Boolean(hasCursor);
                return (
                  <TouchableScale
                    key={`${char}-${index}`}
                    disabled={disabled}
                    onPress={handlePress}
                    style={generatePinCodeContainerStyle(isFocusedInput, char)}
                    testID="otp-input"
                  >
                    {isFocusedInput && !hideStick ? (
                      <VerticalStick
                        focusColor={focusColor}
                        style={focusStickStyle}
                        focusStickBlinkingDuration={focusStickBlinkingDuration}
                      />
                    ) : (
                      <SizableText
                        size={getFontWidth()}
                        lineHeight={getFontLineHeight()}
                        color={char ? "$primary" : "$blueGray.400"}
                        fontWeight={"$bold900"}
                      >
                        {char && secureTextEntry
                          ? "•"
                          : char ??
                            (index === 0 ? currentWord[0].toUpperCase() : "-")}
                      </SizableText>
                    )}
                  </TouchableScale>
                );
              })}
          </YStack>
        </>
      );
    } else {
      const otpString = text
        .split("")
        .map((char, index) => {
          if (index === 0) return currentWord[0].toUpperCase(); // Show alphabet on the first index
          return char && secureTextEntry ? "•" : char ?? "-"; // Render dots or characters
        })
        .join("");

      return (
        <>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <View
              style={{
                borderWidth: 0,
                borderRadius: 8,
                backgroundColor: "white",
                height: 60,
                width: widthStyle,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <SizableText
                size={getFontWidth()}
                lineHeight={getFontLineHeight()}
                color={"#1c2e4a"}
                fontWeight={"$bold900"}
              >
                {currentWord.toUpperCase()}
              </SizableText>
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableScale
              key="single-touchable"
              onPress={handlePress}
              style={[generatePinCodeContainerStyle(true, otpString)]} // Adjust the width here
              testID="otp-input"
            >
              <SizableText
                size={getFontWidth()}
                lineHeight={getFontLineHeight()}
                color={text ? "$primary" : "$blueGray.400"}
                fontWeight={"$bold900"}
              >
                {text[0] ? text[0] : currentWord[0].toUpperCase()}
                {text
                  .slice(1)
                  .split("")
                  .map((char, index) =>
                    char && secureTextEntry ? "•" : char ?? "-"
                  )
                  .join("")}
              </SizableText>
            </TouchableScale>
          </View>
        </>
      );
    }
  };

  return (
    <>
      <YStack>
        <ResponsiveContent>
          <View style={[styles.container, containerStyle]}>
            <View style={[styles.inputsContainer, inputsContainerStyle]}>
              {renderOtpInputs()}
            </View>
          </View>
        </ResponsiveContent>
        <YStack marginTop={isPhoneDevice ? 16 : 24}>
          <CustomKeyboard onKeyPress={handleKeyPress} />
        </YStack>
      </YStack>

      {Platform.OS === "ios" && <InputAccessoryViewiOS title={"Done"} />}
    </>
  );
});

export default CategoryInput;
