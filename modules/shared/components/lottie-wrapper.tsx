import React from "react";
import { LottieProps } from "react-lottie";
import { Platform } from "react-native";
import LottieAppPlayer from "./lottie-app-player";
import LottieWebPlayer from "./lottie-web-player";


function LottieWrapper(props: Readonly<{
  webProps: LottieProps;
  source: string;
  height: number;
  width: number;
  loop: boolean;
  onAnimationLoadeda?: () => void;
  onAnimationFinisha?: () => void;
}>) {
  const { webProps, source, height, width, loop, onAnimationLoadeda, onAnimationFinisha } = props;

  return (
    <>
      {Platform.OS === "web" ? (
        <LottieWebPlayer
          webProps={webProps}
          onAnimationLoadeda={onAnimationLoadeda}
          onAnimationFinisha={onAnimationFinisha}
        />
      ) : (
        <LottieAppPlayer
          onAnimationLoadeda={onAnimationLoadeda}
          onAnimationFinisha={onAnimationFinisha}
          loop={loop}
          source={source}
          height={height}
          width={width}
        />
      )}
    </>
  )
}

export default LottieWrapper;
