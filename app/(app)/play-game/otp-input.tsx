import { forwardRef, useImperativeHandle } from "react";
import { Platform, TextInput, View, ViewStyle } from "react-native";
import { useOtpInput } from "./use-otp-input";
import { styles } from "./otp-input.styles";
import { VerticalStick } from "./vertical-stick";
import { OtpInputProps, OtpInputRef } from "./otp-input.types";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";
import { SizableText } from "tamagui";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import InputAccessoryViewiOS from "@modules/shared/components/input-accessory-view-details";

export const OtpInput = forwardRef<OtpInputRef, OtpInputProps>((props, ref) => {
  const {
    models: { text, inputRef, focusedInputIndex, hasCursor },
    actions: {
      clear,
      handlePress,
      handleTextChange,
      focus,
      handleFocus,
      handleBlur,
    },
    forms: { setTextWithRef },
  } = useOtpInput(props);
  const {
    disabled,
    numberOfDigits = 6,
    autoFocus = true,
    hideStick,
    focusColor = "#A4D0A4",
    focusStickBlinkingDuration,
    secureTextEntry = false,
    theme = {},
    textInputProps,
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
      : responsiveWidth / 1.5 ;

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
      // For non-English language, render a single TouchableScale with combined characters
      const otpString = text
        .split("")
        .map((char, index) => {
          if (index === 0) return alphabet; // Show alphabet on the first index
          return char && secureTextEntry ? "•" : char ?? "-"; // Render dots or characters
        })
        .join(""); // Combine all characters into one string

      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <TouchableScale
          key="single-touchable"
          onPress={handlePress}
          style={[generatePinCodeContainerStyle(true, otpString)]} // Adjust the width here
          testID="otp-input"
        >
          <SizableText
            size={numberOfDigits > 6 ? "$hmd" : "$hlg"}
            lineHeight={numberOfDigits > 6 ? 30 : 40}
            color={text ? "$primary" : "$blueGray.400"}
            fontWeight={"$bold900"}
          >
            {text[0] ? text[0] : alphabet}{" "}
            {/* Display the first character as alphabet */}
            {text
              .slice(1)
              .split("")
              .map((char, index) =>
                char && secureTextEntry ? "•" : char ?? "-"
              )
              .join("")}{" "}
            {/* Display remaining characters with secure text entry if necessary */}
          </SizableText>
        </TouchableScale>
      </View>
      );
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputsContainer, inputsContainerStyle]}>
        {renderOtpInputs()}
      </View>
      {/* <View style={[styles.inputsContainer, inputsContainerStyle]}>
        {Array(numberOfDigits)
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
          })}
      </View> */}
      <TextInput
        value={text}
        onChangeText={handleTextChange}
        maxLength={numberOfDigits}
        inputMode="text"
        textContentType="username"
        ref={inputRef}
        autoCapitalize="characters"
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        autoComplete={"username"}
        aria-disabled={disabled}
        editable={!disabled}
        testID="otp-input-hidden"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...textInputProps}
        style={[styles.hiddenInput, textInputProps?.style]}
        inputAccessoryViewID="inputAccessoryView"
      />
      {Platform.OS === "ios" && <InputAccessoryViewiOS title={"Done"} />}
    </View>
  );
});
