import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { SizableText } from "tamagui";
import BasicButton from "@design-system/components/buttons/basic-button";
import { GRADIENTS } from "@design-system/utils/constants";
import DesignTestWrapper from "@design-system/utils/design-test-wrapper";

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: () => <></>,
}));

test("renders correctly", async () => {
  const TestRender = () => {
    return (
      <BasicButton linearGradientProps={GRADIENTS.primary}>
        <SizableText fontSize={"$sm"}>Continue</SizableText>
      </BasicButton>
    );
  };

  render(
    <DesignTestWrapper>
      <TestRender />
    </DesignTestWrapper>
  );

  const buttonTitle = await screen.findByText("Continue");
  expect(buttonTitle).toBeTruthy();
});

test("calls onPress when pressed", () => {
  const mockOnPress = jest.fn();

  const { getByTestId } = render(
    <DesignTestWrapper>
      <BasicButton testID="test-button" onPress={mockOnPress}>
        <SizableText fontSize={"$sm"}>Continue</SizableText>
      </BasicButton>
    </DesignTestWrapper>
  );

  fireEvent.press(getByTestId("test-button"));
  expect(mockOnPress).toHaveBeenCalled();
});

test("does not call onPress when disabled", () => {
  const mockOnPress = jest.fn();

  const { getByTestId } = render(
    <DesignTestWrapper>
      <BasicButton testID="test-button" onPress={mockOnPress} disabled={true}>
        <SizableText fontSize={"$sm"}>Continue</SizableText>
      </BasicButton>
    </DesignTestWrapper>
  );

  fireEvent.press(getByTestId("test-button"));
  expect(mockOnPress).not.toHaveBeenCalled();
});
