import React, { useState } from "react";
import { Keyboard, Platform } from "react-native";
import { XStack, YStack } from "tamagui";
import { SHADOW } from "@design-system/utils/constants";
import { Control, Controller } from "react-hook-form";
import BasicInput from "@design-system/components/input/basic-input";
import InputAccessoryViewiOS from "@modules/shared/components/input-accessory-view-details";
import useResponsiveWidth from "@modules/shared/hooks/useResponsiveWidth";

export type AlphabetInput = {
  inputValue: string;
};

type AlphabetCellProps = {
  inputValue: string;
  updateAlphabet: (alphabet: AlphabetInput) => void;
  onSubmitEditing: (isForAdd: boolean, inputValue: string) => void;
  control: Control<
    {
      alphabets: AlphabetInput[];
    },
    any
  >;
  index: number;
  totalWordLength: number;
  alphabet: string;
};

function AlphabetCell(props: Readonly<AlphabetCellProps>) {
  const {
    inputValue,
    updateAlphabet,
    onSubmitEditing,
    control,
    index,
    totalWordLength,
    alphabet,
  } = props;
  const defaultTempAlphabetInput = { editingIndex: -1, inputValue: "" };
  const [tempAlphabetInput, setTempAlphabetInput] = useState(
    defaultTempAlphabetInput
  );
  const responsiveWidth = useResponsiveWidth();

  return (
    <YStack testID="alphabet-cell">
      <XStack
        width={(responsiveWidth - 42) / totalWordLength}
        borderRadius={8}
        bg={"$black"}
        p={"$2"}
        mx={"$1"}
        {...SHADOW.basicCard}
      >
        <YStack testID={`alphabets.${index}`} flex={1}>
          <Controller
            control={control}
            name={`alphabets.${index}`}
            render={({ field }) => (
              <BasicInput
                ref={field.ref}
                value={
                  tempAlphabetInput.editingIndex === index
                    ? tempAlphabetInput.inputValue
                    : field.value.inputValue
                }
                onFocus={() =>
                  setTempAlphabetInput({
                    editingIndex: index,
                    inputValue: field.value.inputValue,
                  })
                }
                onBlur={() => {
                  updateAlphabet({
                    inputValue: tempAlphabetInput.inputValue,
                  });
                  setTempAlphabetInput(defaultTempAlphabetInput);
                }}
                blurOnSubmit={false}
                onChangeText={
                  (text) => {
                    const re = /^[A-Za-z]+$/;
                    if (re.test(text) || text.length <= 0) {
                      setTempAlphabetInput({ inputValue: text, editingIndex: index })
                      onSubmitEditing(text.length > 0, text)
                    }
                  }
                }
                backgroundColor={"$black"}
                textAlign="center"
                hideShadow
                maxLength={1}
                fontSize={totalWordLength > 6 ? "$hmd" : "$hlg"}
                fontFamily={"$body"}
                fontWeight={"$bold900"}
                color={"$primary"}
                placeholderTextColor={"$blueGray.400"}
                placeholder={index === 0 ? alphabet : "-"}
                p={0}
                onSubmitEditing={() => {
                  onSubmitEditing(true, null)
                  Keyboard.dismiss()
                }}
                borderRadius={0}
                borderWidth={0}
                borderColor={"$black"}
                outlineColor={"$colorTransparent"}
                focusStyle={{
                  borderWidth: 0,
                  outlineColor: "$colorTransparent",
                  borderColor: "$black",
                  borderRadius: 0
                }}
                focusable={true}
                inputMode="text"
                autoCapitalize="characters"
                inputAccessoryViewID="inputAccessoryView"
              />
            )}
          />

          {Platform.OS === "ios" && <InputAccessoryViewiOS title={"Done"} />}
        </YStack>
      </XStack>
    </YStack>
  );
}

export default AlphabetCell;
