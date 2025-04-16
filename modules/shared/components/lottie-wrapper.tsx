import React from "react";
import { LottieProps } from "react-lottie";
import LottieAppPlayer from "./lottie-app-player";

function LottieWrapper(
  props: Readonly<{
    webProps: LottieProps;
    source: string;
    height: number;
    width: number;
    loop: boolean;
    onAnimationLoadeda?: () => void;
    onAnimationFinisha?: () => void;
  }>
) {
  const {
    source,
    height,
    width,
    loop,
    onAnimationLoadeda,
    onAnimationFinisha,
  } = props;

  return (
    <LottieAppPlayer
      onAnimationLoadeda={onAnimationLoadeda}
      onAnimationFinisha={onAnimationFinisha}
      loop={loop}
      source={source}
      height={height}
      width={width}
    />
  );
}

export default LottieWrapper;
