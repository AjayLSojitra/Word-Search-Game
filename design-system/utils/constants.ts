import { Platform } from "react-native";

export const SHADOW = {
  basicCard:
    Platform.OS === "android"
      ? { elevationAndroid: 5 }
      : {
          shadowColor: "rgba(0, 0, 0, 0.08)",
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 8,
        },
  clarity:
    Platform.OS === "android"
      ? { elevationAndroid: 10 }
      : {
          shadowColor: "rgba(0, 0, 0, 0.32)",
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 16,
        },
  button:
    Platform.OS === "android"
      ? { elevationAndroid: 5 }
      : {
          shadowColor: "rgba(0, 0, 0, 0.16)",
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 8,
        },
  input:
    Platform.OS === "android"
      ? { elevationAndroid: 5 }
      : {
          shadowColor: "rgba(0, 0, 0, 0.08)",
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 8,
        },
};

export const GRADIENTS = {
  aiEnhancer: {
    colors: ["#F2AF59", "#EC7189"],
    start: { x: 0.4999999999999999, y: 0 },
    locations: [0, 1],
    end: { x: 0.5000000000000001, y: 1 },
  },
  clarityToast: {
    colors: ["#1C526C", "#1B466C", "#153252"],
    end: { x: 0, y: 0.5 },
    locations: [-0, 0.51, 1],
    start: { x: 1, y: 0.49999999999999994 },
  },
  improves: {
    colors: ["#ED8D54", "#ED8D54"],
    locations: [0, 1],
    start: { x: 0, y: 1 },
    end: { x: 0, y: 1 },
  },
  celebrates: {
    colors: ["#FBCC66", "#FBCC66"],
    locations: [0, 1],
    start: { x: 0, y: 1 },
    end: { x: 0, y: 1 },
  },
  home: {
    colors: ["#1C526C", "#1B466C", "#153252"],
    locations: [-0, 0.51, 1],
    start: { x: 1, y: 0.49999999999999994 },
    end: { x: 0, y: 0.5 },
  },
  primary: {
    colors: ["#30B1CD", "#1C8CCB"],
    locations: [0, 1],
    start: { x: 0.4999999999999999, y: 0 },
    end: { x: 0.5000000000000001, y: 1 },
  },
  primaryPressed: {
    colors: ["#1F93AF", "#1580AE"],
    start: { x: 0.4999999999999999, y: 0 },
    locations: [0, 1],
    end: { x: 0.5000000000000001, y: 1 },
  },
  primaryDisabled: {
    colors: ["#A5BCCE", "#A5BCCE"],
    start: { x: 0, y: 0 },
    locations: [0, 1],
    end: { x: 1, y: 1 },
  },
  secondary: {
    colors: ["#F0F9FF", "#E0F2FE"],
    locations: [0, 1],
    start: { x: 0.4999999999999999, y: 0 },
    end: { x: 0.5000000000000001, y: 1 },
  },
  secondaryPressed: {
    colors: ["#CFEAFB", "#DDF1FB"],
    start: { x: 0.4999999999999999, y: 0 },
    locations: [0, 1],
    end: { x: 0.5000000000000001, y: 1 },
  },
  secondaryDisabled: {
    colors: ["#E0F2FE", "#F0F9FF"],
    start: { x: 0.4999999999999999, y: 0 },
    locations: [0, 1],
    end: { x: 0.5000000000000001, y: 1 },
  },
  tertiary: {
    colors: ["#7C9AB5", "#62758B"],
    start: { x: 0.4999999999999999, y: 0 },
    locations: [0, 1],
    end: { x: 0.5000000000000001, y: 1 },
  },
  tertiaryPressed: {
    colors: ["#6F8DA9", "#53657B"],
    start: { x: 0.4999999999999999, y: 0 },
    locations: [0, 1],
    end: { x: 0.5000000000000001, y: 1 },
  },
  tertiaryDisabled: {
    colors: ["#7C9AB5", "#62758B"],
    start: { x: 0.4999999999999999, y: 0 },
    locations: [0, 1],
    end: { x: 0.5000000000000001, y: 1 },
  },
  dark: {
    colors: ["#7C9AB5", "#62758B"],
    locations: [0, 1],
    start: { x: 0.4999999999999999, y: 0 },
    end: { x: 0.5000000000000001, y: 1 },
  },
  grey: {
    colors: ["#F6FAFD", "#E9F3F8"],
    locations: [0, 1],
    start: { x: 0.4999999999999999, y: 0 },
    end: { x: 0.5000000000000001, y: 1 },
  },
  background: {
    colors: [
      "rgba(81, 90, 215, 0.08)",
      "rgba(50, 146, 215, 0.08)",
      "rgba(12, 169, 204, 0.08)",
      "rgba(12, 179, 184, 0.08)",
      "rgba(50, 245, 152, 0.08)",
    ],
    locations: [0, 0.14, 0.45, 0.76, 1],
    start: { x: 1.099559695025369, y: 0.8029907502661655 },
    end: { x: -0.09955969502536888, y: 0.19700924973383444 },
  },
  danger: {
    colors: ["#E74747", "#F57F7F"],
    locations: [0, 1],
    start: { x: 0.5000000000000001, y: 1 },
    end: { x: 0.4999999999999999, y: 0 },
  },
  dangerPressed: {
    colors: ["#E26A6A", "#CF3333"],
    locations: [0, 1],
    start: { x: 0.4999999999999999, y: 0 },
    end: { x: 0.5000000000000001, y: 1 },
  },
};
