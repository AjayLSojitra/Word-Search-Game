import { ColorValue, TextInputProps, TextStyle, ViewStyle } from "react-native";

interface OtpInputProps {
  numberOfDigits?: number;
  autoFocus?: boolean;
  focusColor?: ColorValue;
  onTextChange?: (text: string) => void;
  onFilled?: (text: string) => void;
  hideStick?: boolean;
  focusStickBlinkingDuration?: number;
  secureTextEntry?: boolean;
  theme?: Theme;
  disabled?: boolean;
  textInputProps?: TextInputProps;
  alphabet: string;
  item: string;
  currentCategoryItem?: any;
  redirectToNextScreenAfterAdmobInterstitial?: any;
}

export default OtpInputProps;

export interface OtpInputRef {
  clear: () => void;
  focus: () => void;
  setValue: (value: string) => void;
}

export interface Theme {
  containerStyle?: ViewStyle;
  inputsContainerStyle?: ViewStyle;
  pinCodeContainerStyle?: ViewStyle;
  filledPinCodeContainerStyle?: ViewStyle;
  pinCodeTextStyle?: TextStyle;
  focusStickStyle?: ViewStyle;
  focusedPinCodeContainerStyle?: ViewStyle;
  disabledPinCodeContainerStyle?: ViewStyle;
}
