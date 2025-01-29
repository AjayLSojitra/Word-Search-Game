import React, { useRef } from "react";
import { XStack } from "tamagui";
import lotties from "@assets/lotties/lotties";
import LottieView from "lottie-react-native";

type VerbalFluencyGameMainLoaderProps = {
  size?: number,
  my?: string | 0
}

function VerbalFluencyGameMainLoader(props: Readonly<VerbalFluencyGameMainLoaderProps>) {
  const { size = 48, my = "$10" } = props;
  const animation = useRef(null);

  return (
    <XStack
      alignContent="center"
      justifyContent="center"
      my={my}
    >
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: size,
          height: size,
        }}
        source={lotties.verbalFleuncyLoader}
      />
    </XStack>
  );
}

export default VerbalFluencyGameMainLoader;
