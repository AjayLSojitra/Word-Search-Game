import React, { Suspense } from "react";
import { Spinner, YStack } from "tamagui";

function SuspenseLoader({
  children,
  size = "large",
  fallback,
  height,
}: {
  children: any;
  size?: "large" | "small";
  fallback?: JSX.Element;
  height?: number;
}) {
  return (
    <Suspense
      fallback={
        fallback ?? (
          <YStack
            flex={1}
            bg={"$blueGray.50"}
            justifyContent={"center"}
            alignItems={"center"}
            height={height}
          >
            <Spinner size={size} color={"$info.600"} />
          </YStack>
        )
      }
    >
      {children}
    </Suspense>
  );
}

export default SuspenseLoader;
