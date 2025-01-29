import { useEffect } from "react";
import { Keyboard, Platform, useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SMALL_DEVICE_HEIGHT_THRESHOLD = 667;

function useKeyboardAnimatedHeight() {
    const height = useSharedValue(0);
    const { height: screenHeight } = useWindowDimensions();
    const extraiOSPadding = screenHeight > SMALL_DEVICE_HEIGHT_THRESHOLD ? 0 : 20;
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const keyboardWillShowListener = Keyboard.addListener(
            "keyboardWillShow",
            (e) => {
                if (Platform.OS === "ios") {
                    height.value = e.endCoordinates.height- insets.bottom;
                }
            }
        );
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            (e) => {
                if (Platform.OS === "android") {
                    // height.value = e.endCoordinates.height; Because for now we don't need this.
                    height.value = 0;
                }
            }
        );
        const keyboardWillHideListener = Keyboard.addListener(
            "keyboardWillHide",
            (e) => {
                height.value = 0;
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            (e) => {
                height.value = 0;
            }
        );

        return () => {
            keyboardWillShowListener.remove();
            keyboardDidShowListener.remove();
            keyboardWillHideListener.remove();
            keyboardDidHideListener.remove();
            height.value = 0;
        };
    }, []);

    return height;
}

export default useKeyboardAnimatedHeight;