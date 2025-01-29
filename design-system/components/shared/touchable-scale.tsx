import React, { RefAttributes, useState } from "react";
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type childrenAsFunction = (
  state: PressableStateCallbackType & { hovered: boolean }
) => JSX.Element;

function TouchableScale(
  props: Omit<PressableProps & RefAttributes<View>, "children"> & {
    children: JSX.Element | childrenAsFunction;
  }
) {
  const [hover, setHover] = useState(false);
  const { children } = props;
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(
    () => ({ transform: [{ scale: scale.value }] }),
    []
  );

  return (
    <Pressable
      {...props}
      hitSlop={props.hitSlop ?? { top: 8, left: 8, bottom: 8, right: 8 }}
      onHoverIn={() => {
        setHover(true);
      }}
      onHoverOut={() => {
        setHover(false);
      }}
    >
      {({ pressed }: PressableStateCallbackType) => {
        if (pressed) {
          scale.value = withTiming(0.96, { duration: 100 });
        } else if (scale.value != 1) {
          scale.value = withTiming(1, { duration: 50 });
        }

        return (
          <Animated.View style={animatedStyle}>
            {typeof children === "function"
              ? children({ pressed, hovered: hover })
              : children}
          </Animated.View>
        );
      }}
    </Pressable>
  );
}

export default TouchableScale;
