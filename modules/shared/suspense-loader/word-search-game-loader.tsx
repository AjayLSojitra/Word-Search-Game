import React, { Suspense } from "react";
import ErrorBoundary from "../components/error-boundary";
import WordSearchGameAnimation from "./word-search-game-animation";

function WordSearchGameLoader({
  children,
  size = 86,
  fallback,
}: Readonly<{
  children: any;
  size?: number;
  fallback?: JSX.Element;
}>) {
  return (
    <Suspense fallback={fallback ?? <WordSearchGameAnimation size={size} />}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
  );
}

export default WordSearchGameLoader;
