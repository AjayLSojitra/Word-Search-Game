import React from "react";
import { YStack } from "tamagui";
import lotties from "@assets/lotties/lotties";
import LottieWrapper from "../components/lottie-wrapper";

function VerbalFluencyGameAnimation({ size }: { readonly size: number }) {
  return (
    <YStack
      flex={1}
      bg={"$blueGray.50"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <LottieWrapper
        webProps={{
          options: {
            loop: true,
            autoplay: true,
            animationData: lotties.verbalFleuncyLoader,
          },
          height: size,
          width: size,
        }}
        width={size}
        height={size}
        source={lotties.verbalFleuncyLoader}
        loop={true}
      />
    </YStack>
  );
}

export default VerbalFluencyGameAnimation;
