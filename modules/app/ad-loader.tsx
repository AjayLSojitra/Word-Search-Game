import React, { useEffect } from "react";
import { Animated, Easing } from "react-native";
import { DeviceType, deviceType } from "expo-device";
import { SizableText, YStack } from "tamagui";

interface AdLoaderProps {
  isVisible: boolean;
  message?: string;
}

export const AdLoader: React.FC<AdLoaderProps> = ({
  isVisible,
  message = "Preparing ad, please wait...",
}) => {
  const spinValue = React.useRef(new Animated.Value(0)).current;
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  useEffect(() => {
    if (isVisible) {
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      spinAnimation.start();

      return () => {
        spinAnimation.stop();
      };
    } else {
      spinValue.setValue(0);
    }
  }, [isVisible, spinValue]);

  if (!isVisible) return null;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <YStack
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor="rgba(0, 0, 0, 0.5)"
      justifyContent="center"
      alignItems="center"
      zIndex={9999}
    >
      <YStack
        bg="$white"
        borderRadius="$4"
        p="$6"
        alignItems="center"
        shadowColor="$black"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={4}
        elevation={5}
      >
        <Animated.View
          style={[
            {
              borderWidth: 3,
              borderColor: "#E5E7EB",
              borderTopColor: "#05958f",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              transform: [{ rotate: spin }],
              width: isPhoneDevice ? 40 : 50,
              height: isPhoneDevice ? 40 : 50,
            },
          ]}
        >
          <YStack
            width={6}
            height={6}
            borderRadius={3}
            backgroundColor="#05958f"
          />
        </Animated.View>

        <SizableText
          fontSize={isPhoneDevice ? "$sm" : "$md"}
          color="$colorText"
          ta="center"
          mt="$4"
        >
          {message}
        </SizableText>
      </YStack>
    </YStack>
  );
};
