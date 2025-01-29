import React, { useEffect } from "react";
import { XStack } from "tamagui";
import AlphabetCell, { AlphabetInput } from "./alphabet-cell";
import {
  Control,
  FieldArrayWithId,
  UseFormSetFocus,
  UseFormWatch,
} from "react-hook-form";

function AlphabetsInput({
  control,
  watch,
  setFocus,
  fields,
  update,
  alphabet,
  validateInputs,
}: Readonly<{
  fields: FieldArrayWithId<
    {
      alphabets: AlphabetInput[];
    },
    "alphabets",
    "id"
  >[];
  update: any;
  alphabet: string;
  control: Control<
    {
      alphabets: AlphabetInput[];
    },
    any
  >;
  setFocus: UseFormSetFocus<{
    alphabets: AlphabetInput[];
  }>;
  watch: UseFormWatch<{
    alphabets: AlphabetInput[];
  }>;

  validateInputs: (inputValue: string) => void;
}>) {

  useEffect(() => {
    setTimeout(() => {
      setFocus(`alphabets.${0}`);
    }, 500);
  }, [])

  return (
    <XStack alignItems="center" justifyContent="center">
      {fields.map((item, index) => (
        <AlphabetCell
          control={control}
          key={item?.id ?? ""}
          inputValue={item?.inputValue ?? ""}
          updateAlphabet={(updatedAlphabet: AlphabetInput) => {
            update(index, updatedAlphabet);
          }}
          onSubmitEditing={(isForAdd: boolean, inputValue: string) => {
            if (isForAdd) {
              if (index === (fields.length - 1)) {
                setFocus(`alphabets.${0}`);
              } else {
                setFocus(`alphabets.${index + 1}`);
              }
            } else {
              if (index < (fields.length - 1)) {
                const currentAlphabets = watch("alphabets");
                if (index > 0 && currentAlphabets[index + 1].inputValue.length === 0) {
                  setFocus(`alphabets.${index - 1}`);
                }
              } else {
                setFocus(`alphabets.${index - 1}`);
              }
            }

            if ((index === (fields.length - 1) && inputValue != "") || inputValue === null) {
              validateInputs(inputValue)
            }
          }}
          index={index}
          totalWordLength={fields.length}
          alphabet={alphabet}
        />))}
    </XStack>
  );
}

export default AlphabetsInput;
