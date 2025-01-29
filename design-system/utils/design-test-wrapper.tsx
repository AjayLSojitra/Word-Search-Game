import React from "react";
import { TamaguiProvider, Theme } from "tamagui";
import themeConfig from "../../tamagui.config";

jest.mock("native-base", () => ({
  useToken: () => "#000000",
  extendTheme: () => ({}),
  useDisclose: () => ({
    open: false,
    onOpen: () => {},
    onClose: () => {},
  }),
}));

function DesignTestWrapper({ children }) {
  return (
    <TamaguiProvider config={themeConfig}>
      <Theme name="light">{children}</Theme>
    </TamaguiProvider>
  );
}

export default DesignTestWrapper;
