import React from "react";
import LottieView from "lottie-react-native";


function LottieAppPlayer(props: Readonly<{
  source: string;
  height: number;
  width: number;
  loop: boolean;
  onAnimationLoadeda?: () => void;
  onAnimationFinisha?: () => void;
}>) {
  const { source, height, width, loop, onAnimationLoadeda, onAnimationFinisha } = props;

  return (
    <LottieView
      onAnimationLoaded={() => {
        if (onAnimationLoadeda) {
          onAnimationLoadeda()
        }
      }}
      onAnimationFinish={() => {
        if (onAnimationFinisha) {
          onAnimationFinisha()
        }
      }}
      autoPlay={true}
      loop={loop}
      style={{
        width: width,
        height: height,
      }}
      source={source}
      hardwareAccelerationAndroid
    />
  )
}

export default LottieAppPlayer;
