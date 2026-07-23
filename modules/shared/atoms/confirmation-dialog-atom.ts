import { PrimaryButtonProps } from "@design-system/components/buttons/primary-button";
import { create } from "zustand";
import { ReactElement } from "react";

type Button = PrimaryButtonProps & { buttonType: "Primary" | "Secondary" };

export type ConfirmationDialogProps = {
  title: string;
  titleFontSize?: "$hsm";
  icon?: ReactElement;
  description?: string;
  descriptionFontSize?: "$sm";
  shortDescription?: string;
  shortDescriptionFontSize?: "$xs";
  buttons: Button[];
  visible: boolean;
  close?: boolean;
  checkbox?: boolean;
};

interface ConfirmationDialogStore {
  confirmationDialogState: ConfirmationDialogProps;
  setConfirmationDialogState: (state: ConfirmationDialogProps) => void;
}

const useConfirmationDialogStore = create<ConfirmationDialogStore>((set) => ({
  confirmationDialogState: {
    icon: undefined,
    title: "",
    titleFontSize: "$hsm",
    description: "",
    descriptionFontSize: "$sm",
    shortDescription: "",
    shortDescriptionFontSize: "$xs",
    buttons: [],
    visible: false,
    close: false,
    checkbox: false,
  },
  setConfirmationDialogState: (state) =>
    set({ confirmationDialogState: state }),
}));

export const useConfirmationDialog = () => {
  const { confirmationDialogState, setConfirmationDialogState } =
    useConfirmationDialogStore();

  return {
    confirmationDialogState,
    isOpen: confirmationDialogState.visible,
    open: (params: Omit<ConfirmationDialogProps, "visible">) => {
      setConfirmationDialogState({
        ...params,
        visible: true,
      });
    },
    close: () => {
      setConfirmationDialogState({
        ...confirmationDialogState,
        visible: false,
      });
    },
  };
};
