import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { Platform, View, ViewStyle } from "react-native";
import { useOtpInput } from "./use-otp-input";
import { styles } from "./otp-input.styles";
import { OtpInputProps, OtpInputRef } from "./otp-input.types";
import { SizableText, YStack } from "tamagui";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import InputAccessoryViewiOS from "@modules/shared/components/input-accessory-view-details";
import CustomKeyboard from "@modules/shared/components/custom-keyboard/CustomKeyboard";
import ResponsiveContent from "@modules/shared/responsive-content";
import contents from "@assets/contents/contents";

export const CategoryInput = forwardRef<OtpInputRef, OtpInputProps>(
  (props, ref) => {
    const {
      models: { text},
      actions: { clear, handlePress, handleTextChange, focus },
      forms: { setTextWithRef },
    } = useOtpInput(props);
    const {
      disabled,
      focusColor = "#A4D0A4",
      theme = {},
      item,
      onFilled
    } = props;
    const {
      containerStyle,
      inputsContainerStyle,
      pinCodeContainerStyle,
      focusedPinCodeContainerStyle,
      filledPinCodeContainerStyle,
      disabledPinCodeContainerStyle,
    } = theme;

    useImperativeHandle(ref, () => ({
      clear,
      focus,
      setValue: setTextWithRef,
    }));

    const languageData = contents.englishCategoriesItem;
    const selectedCategory = languageData[item];

    // console.log("Selected Category Data:", selectedCategory);
    // console.log("item :", item);

    // State to track the current word to be typed
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState(selectedCategory[0] || "");
    // console.log("currentWord :", currentWord);

    // Effect to update the current word when text changes
    useEffect(() => {
      if (text.length === currentWord.length) {
        // If the word is completely typed, move to the next word
        if (currentWordIndex < selectedCategory.length - 1) {
          setCurrentWordIndex((prevIndex) => prevIndex + 1);
          setCurrentWord(selectedCategory[currentWordIndex + 1]);
          handleTextChange(""); // Reset the OTP input for the new word
        }
      }
    }, [
      text,
      currentWord,
      currentWordIndex,
      selectedCategory,
      handleTextChange,
    ]);

    useEffect(() => {
      if (onFilled) {
        onFilled(text); // Send the current text to the parent when updated
      }
    }, [text, onFilled]);


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
      return (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <TouchableScale
            key="single-touchable"
            disabled={disabled}
            onPress={handlePress}
            style={generatePinCodeContainerStyle(true, text)} // Apply your style here
            testID="otp-input"
          >
            <SizableText
              size={"$hmd"}
              lineHeight={40}
              color={text ? "$primary" : "$blueGray.400"}
              fontWeight={"$bold900"}
              paddingHorizontal={40}
            >
              {text}
            </SizableText>
          </TouchableScale>
        </View>
      );
    };
    return (
      <>
        <ResponsiveContent>
          <YStack alignItems="center">
            <SizableText
              size="$lg"
              lineHeight={40}
              color="#1c2e4a"
              fontWeight="$bold900"
              marginBottom={30}
              paddingHorizontal={20}
              backgroundColor={"white"}
              borderRadius={50}
            >
              {currentWord}
            </SizableText>
          </YStack>
          <View style={[styles.container, containerStyle]}>
            <View style={[styles.inputsContainer, inputsContainerStyle]}>
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
  }
);
