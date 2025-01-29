import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import PrimaryButton from "@design-system/components/buttons/primary-button";
import DesignTestWrapper from "@design-system/utils/design-test-wrapper";

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: () => <></>,
}));

test("PrimaryButton renders correctly", async () => {
  const mockOnPress = jest.fn();

  render(
    <DesignTestWrapper>
      <PrimaryButton>Continue</PrimaryButton>
    </DesignTestWrapper>
  );

  const buttonTitle = await screen.findByText("Continue");
  expect(buttonTitle).toBeTruthy();
});

test("PrimaryButton calls onPress when pressed", () => {
  const mockOnPress = jest.fn();

  const { getByTestId } = render(
    <DesignTestWrapper>
      <PrimaryButton onPress={mockOnPress} testID="primary-button">
        Continue
      </PrimaryButton>
    </DesignTestWrapper>
  );

  fireEvent.press(getByTestId("primary-button"));
  expect(mockOnPress).toHaveBeenCalled();
});

test("PrimaryButton does not call onPress when disabled", () => {
  const mockOnPress = jest.fn();

  const { getByTestId } = render(
    <DesignTestWrapper>
      <PrimaryButton
        onPress={mockOnPress}
        disabled={true}
        testID="primary-button"
      >
        Continue
      </PrimaryButton>
    </DesignTestWrapper>
  );

  fireEvent.press(getByTestId("primary-button"));
  expect(mockOnPress).not.toHaveBeenCalled();
});
