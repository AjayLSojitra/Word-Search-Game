import React, { Suspense } from "react";
import ErrorBoundary from "../components/error-boundary";
import VerbalFluencyGameAnimation from "./verbal-fleuncy-game-animation";

function OnloopLoader({
  children,
  size = 86,
  fallback,
}: {
  children: any;
  size?: number;
  fallback?: JSX.Element;
}) {
  return (
    <Suspense fallback={fallback ?? <VerbalFluencyGameAnimation size={size} />}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
  );
}

export default OnloopLoader;