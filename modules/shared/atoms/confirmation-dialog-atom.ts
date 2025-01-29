import { PrimaryButtonProps } from "@design-system/components/buttons/primary-button";
import { atom, useRecoilState } from "recoil";

type Button = PrimaryButtonProps & { buttonType: "Primary" | "Secondary" };

export type ConfirmationDialogProps = {
  title: string;
  titleFontSize?: "$hsm";
  icon?: JSX.Element;
  description?: string;
  descriptionFontSize?: "$sm";
  shortDescription?: string;
  shortDescriptionFontSize?: "$xs";
  buttons: Button[];
  visible: boolean;
  close?: boolean;
  checkbox?: boolean;
};

const confirmationDialogState = atom<ConfirmationDialogProps>({
  key: "confirmationDialogState",
  default: {
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
});

const useConfirmationDialogState = () =>
  useRecoilState(confirmationDialogState);

export const useConfirmationDialog = () => {
  const [confirmationDialogState, setConfirmationDialogState] =
    useConfirmationDialogState();

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
      setConfirmationDialogState((prevValues) => ({
        ...prevValues,
        visible: false,
      }));
    },
  };
};
