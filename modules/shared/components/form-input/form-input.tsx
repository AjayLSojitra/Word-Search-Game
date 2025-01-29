import React from "react";
import { useController } from "react-hook-form";
import { Text } from "tamagui";
import BasicInput, { BasicInputProps } from "@design-system/components/input/basic-input";

export type INPUT_TYPES = "text" | "email" | "phone";

export type FormInputProps = {
  name: string;
  callingCodeName?: string;
  onCallingCodeChanged?: () => void;
  type: INPUT_TYPES;
  textInputProps?: BasicInputProps;
  label?: string;
  control: any;
  errorMessage?: string;
  testID?: string;
};

function FormInput(props: Readonly<FormInputProps>): any {
  const {
    name,
    control,
    type,
    textInputProps,
    label,
    testID,
  } = props;
  const { field, formState } = useController({
    name,
    control,
  });
  let errorMessage =
    props?.errorMessage ?? formState.errors?.[field.name]?.message;
  const isInvalid = errorMessage ? true : false;

  const keyboardType =
    type === "email"
      ? "email-address"
      : type === "phone"
        ? "number-pad"
        : "default";

  return (
    <>
      {label ? (
        <Text
          fontSize={"$hsm"}
          color={isInvalid ? "$red.500" : "$blueGray.700"}
          fontWeight={"$semibold"}
          mb={"$2"}
          fontFamily={"$body"}

        >
          {label}
        </Text>
      ) : (
        <></>
      )}
      <BasicInput
        testID={testID}
        ref={field.ref}
        value={field.value}
        keyboardType={keyboardType}
        borderWidth={0}
        hideShadow
        placeholderTextColor="$trueGray.400"
        backgroundColor={"$white"}
        autoCapitalize={type === "email" ? "none" : "sentences"}
        leftElement={textInputProps?.leftElement ?? <></>}
        {...textInputProps}
        onBlur={(e) => {
          textInputProps?.onBlur?.(e);
          field.onBlur();
        }}
        onChangeText={(value) => {
          textInputProps?.onChangeText?.(value);
          field.onChange(value);
        }}
      />
      {errorMessage ? (
        <Text m={"$2"} color={"$red.500"}>
          {errorMessage}
        </Text>
      ) : (
        <></>
      )}
    </>
  );
}

export default FormInput;
