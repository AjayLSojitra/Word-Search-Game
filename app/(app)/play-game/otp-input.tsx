import { forwardRef, useImperativeHandle } from "react";
import { Platform, View, ViewStyle } from "react-native";
import OtpInputProps, { OtpInputRef } from "./otp-input.types";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";
import { SizableText, YStack } from "tamagui";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import InputAccessoryViewiOS from "@modules/shared/components/input-accessory-view-details";
import CustomKeyboard from "@modules/shared/components/custom-keyboard/CustomKeyboard";
import ResponsiveContent from "@modules/shared/responsive-content";
import styles from "./otp-input.styles";
import useOtpInput from "./use-otp-input";
import VerticalStick from "./vertical-stick";

const OtpInput = forwardRef<OtpInputRef, OtpInputProps>((props, ref) => {
  const {
    models: { text, focusedInputIndex, hasCursor },
    actions: { clear, handlePress, handleTextChange, focus },
    forms: { setTextWithRef },
  } = useOtpInput(props);
  const {
    disabled,
    numberOfDigits = 6,
    hideStick,
    focusColor = "#A4D0A4",
    focusStickBlinkingDuration,
    secureTextEntry = false,
    theme = {},
    alphabet,
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
  useImperativeHandle(ref, () => ({ clear, focus, setValue: setTextWithRef }));
  const selectedLanguage = global?.currentSelectedLanguage ?? "English";
  const widthStyle =
    selectedLanguage === "English"
      ? (responsiveWidth - 42) / numberOfDigits - 2
      : responsiveWidth / 1.5;
  const generatePinCodeContainerStyle = (
    isFocusedInput: boolean,
    char: string
  ) => {
    const stylesArray = [
      {
        borderWidth: 0,
        borderRadius: 8,
        backgroundColor: "#1c2e4a",
        height: 60,
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
    handleTextChange(updatedText); // Update the text in the OTP input
  };
  const renderOtpInputs = () => {
    const isEnglish = selectedLanguage === "English"; // Check for the language

    // If the language is "English", we show individual digits in one touchable scale
    if (isEnglish) {
      return Array(numberOfDigits)
        .fill(0)
        .map((_, index) => {
          const char = text[index];
          const isFocusedInput =
            index === focusedInputIndex && !disabled && Boolean(hasCursor);
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
                  size={numberOfDigits > 6 ? "$hmd" : "$hlg"}
                  lineHeight={numberOfDigits > 6 ? 30 : 40}
                  color={char ? "$primary" : "$blueGray.400"}
                  fontWeight={"$bold900"}
                >
                  {char && secureTextEntry
                    ? "•"
                    : char ?? (index === 0 ? alphabet : "-")}
                </SizableText>
              )}
            </TouchableScale>
          );
        });
    } else {
      const otpString = text
        .split("")
        .map((char, index) => {
          if (index === 0) return alphabet; // Show alphabet on the first index
          return char && secureTextEntry ? "•" : char ?? "-"; // Render dots or characters
        })
        .join("");

      return (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <TouchableScale
            key="single-touchable"
            onPress={handlePress}
            style={[generatePinCodeContainerStyle(true, otpString)]} // Adjust the width here
            testID="otp-input"
          >
            <SizableText
              size={numberOfDigits > 6 ? "$hmd" : "$hlg"}
              lineHeight={numberOfDigits > 6 ? 30 : 42}
              color={text ? "$primary" : "$blueGray.400"}
              fontWeight={"$bold900"}
            >
              {text[0] ? text[0] : alphabet}
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
      );
    }
  };

  return (
    <>
      <ResponsiveContent>
        <View style={[styles.container, containerStyle]}>
          <View style={[styles.otpinputsContainer, inputsContainerStyle]}>
            {renderOtpInputs()}
          </View>
        </View>
        <YStack marginTop={16}>
          <CustomKeyboard onKeyPress={handleKeyPress} />
        </YStack>
      </ResponsiveContent>

      {Platform.OS === "ios" && <InputAccessoryViewiOS title={"Done"} />}
    </>
  );
});

export default OtpInput;
