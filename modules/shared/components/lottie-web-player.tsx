import React, { useLayoutEffect, useState } from "react";
import { LottieProps } from "react-lottie";
let LottieView: any = null;

function LottiePlayerWeb(props: Readonly<{
  webProps: LottieProps;
  onAnimationLoadeda?: () => void;
  onAnimationFinisha?: () => void;
}>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { webProps, onAnimationLoadeda, onAnimationFinisha } = props;

  useLayoutEffect(() => {
    (async () => {
      const module =
        require("react-lottie").default
      LottieView = module;
      setIsLoaded(true);
    })();
  }, []);

  return isLoaded ? (
    <LottieView
      eventListeners={[
        {
          eventName: 'complete',
          callback: onAnimationFinisha,
        },
        {
          eventName: "loaded_images",
          callback: onAnimationLoadeda
        }
      ]}
      {...webProps}
      options={{
        rendererSettings:
        {
          preserveAspectRatio: "xMidYMid slice",
          ...webProps.options.rendererSettings,
        },
        ...webProps.options,
      }}
    />
  ) : (
    <></>
  );
}

export default LottiePlayerWeb;
