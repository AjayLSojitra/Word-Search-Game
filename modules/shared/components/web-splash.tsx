import React from "react";
import { Image, Platform } from "react-native";
import { YStack } from "tamagui";

function WebSplash() {
  return (
    Platform.OS === "web" && (
      <YStack flex={1} alignItems="center">
        <Image
          key={"splash"}
          source={require("../../../assets/splash.png")}
          style={{ height: "100%", width: "100%", backgroundColor: "#F6FAFD" }}
          resizeMode={"contain"}
          alt={"splash"}
        />
      </YStack>
    )
  );
}

export default WebSplash;
