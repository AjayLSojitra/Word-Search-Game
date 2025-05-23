import { useRef, useState } from "react";
import { Keyboard, TextInput } from "react-native";
import OtpInputProps from "./otp-input.types";

const useOtpInput = ({
  onTextChange,
  onFilled,
  numberOfDigits = 6,
  disabled,
  autoFocus = true,
}: OtpInputProps) => {
  const [text, setText] = useState("");
  const [hasCursor, setHasCursor] = useState(autoFocus);
  const inputRef = useRef<TextInput>(null);
  const focusedInputIndex = text.length;

  const handlePress = () => {
    // To fix bug when keyboard is not popping up after being dismissed
    if (!Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    inputRef.current?.focus();
  };

  const handleTextChange = (value: string) => {
    if (disabled) return;

    const re = /^[A-ZÑÁÀÂÉÊÍÓÔÚÇÄÖÜßА-Яअ-ऺऀ-ॿ\u4e00-\u9fffا-ےÃ]+$/;
    if (re.test(value) || value.length <= 0) {
      setText(value);
      onTextChange?.(value);
      if (value.length === numberOfDigits) {
        onFilled?.(value);
      }
    }
  };

  const setTextWithRef = (value: string) => {
    const normalizedValue =
      value.length > numberOfDigits ? value.slice(0, numberOfDigits) : value;
    handleTextChange(normalizedValue);
  };

  const clear = () => {
    setText("");
  };

  const focus = () => {
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setHasCursor(true);
  };

  const handleBlur = () => {
    setHasCursor(false);
  };

  return {
    models: { text, inputRef, focusedInputIndex, hasCursor },
    actions: {
      handlePress,
      handleTextChange,
      clear,
      focus,
      handleFocus,
      handleBlur,
    },
    forms: { setText, setTextWithRef },
  };
};

export default useOtpInput;
