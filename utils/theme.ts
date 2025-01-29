import { extendTheme } from "native-base";
import { LinearGradientProps } from "expo-linear-gradient";

export const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

const theme = extendTheme({
  components: {
    IconButton: {
      defaultProps: {
        _pressed: {
          bg: "blueGray.100",
        },
      },
    },
    Button: {
      defaultProps: {
        _pressed: {
          bg: "transparent",
        },
      },
    },
  },
  colors: {
    blueGray: {
      50: "#F6FAFD",
      100: "#E9F3F8",
      200: "#DAEAF1",
      300: "#CDDEE7",
      400: "#A5BCCE",
      500: "#7C9AB5",
      600: "#62758B",
      700: "#495A6E",
      800: "#344255",
      900: "#1E293B",
    },
    primary: {
      50: "#d9fcff",
      100: "#afeffe",
      200: "#81e4fa",
      300: "#52d8f6",
      400: "#26cdf2",
      500: "#0db4d9",
      600: "#008caa",
      700: "#00647a",
      800: "#003d4b",
      900: "#00161d",
    },
    error: {
      50: "#ffe5e5",
      100: "#fabbbb",
      200: "#f09090",
      300: "#e86464",
      400: "#e03838",
      500: "#c71f1f",
      600: "#9b1617",
      700: "#6f0e10",
      800: "#450607",
      900: "#1e0000",
    },
    google: {
      50: "#e2efff",
      100: "#b4d0ff",
      200: "#86b1f9",
      300: "#5692f5",
      400: "#2973f1",
      500: "#135ad8",
      600: "#0a46a9",
      700: "#033279",
      800: "#001e4b",
      900: "#000a1e",
    },
  },
  fontConfig: {
    Poppins: {
      300: {
        normal: "Poppins_300Light",
      },
      400: {
        normal: "Poppins_400Regular",
      },
      500: {
        normal: "Poppins_500Medium",
      },
      600: {
        normal: "Poppins_600SemiBold",
      },
      700: {
        normal: "Poppins_700Bold",
      },
      900: {
        normal: "Poppins_900Black",
      },
    },
  },
  fonts: {
    body: "Poppins",
    heading: "Poppins",
  },
  fontSizes: {
    "2xs": 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
    "6xl": 60,
    "7xl": 72,
    "8xl": 96,
    "9xl": 128,
  },
  space: {
    px: 1,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
    32: 128,
    40: 160,
    48: 192,
    56: 224,
    64: 256,
    72: 288,
    80: 320,
    96: 384,
  },
  shadows: {
    1: {
      shadowColor: "#323247",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.04,
      shadowRadius: 8,
    },
  },
});

export default theme;

export const COLORS = {
  primary: "#0CA9CC",
  primaryDark: "#0A8CA8",
  borderDark: "#AFCDDB",
  divider: "#E9F3F8",
  google: "#4285F4",
  targetProgressColor: "#4EBABA",
  targetProgressColorCGTT: "#37D5D5",
};

export const GRADIENTS: { [key: string]: LinearGradientProps } = {

  primary: {
    colors: ["#30B1CD", "#1C8CCB"],
    locations: [0, 1],
    start: { x: 0.4999999999999999, y: 0 },
    end: { x: 0.5000000000000001, y: 1 },
  },
  home: {
    colors: ["#1C526C", "#1B466C", "#153252"],
    locations: [-0, 0.51, 1],
    start: { x: 1, y: 0.49999999999999994 },
    end: { x: 0, y: 0.5 },
  },
  secondary: {
    colors: ["#F0F9FF", "#E0F2FE"],
    locations: [0, 1],
    start: { x: 0.4999999999999999, y: 0 },
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
  error: {
    colors: ["#F57F7F", "#E74747"],
    locations: [0, 1],
    start: { x: 0.4999999999999999, y: 0 },
    end: { x: 0.5000000000000001, y: 1 },
  },
  getStarted: {
    colors: [
      "rgba(71, 173, 77, 1)",
      "rgba(71, 173, 77, 0.9)",
      "rgba(71, 173, 77, 0)",
    ],
    locations: [0, 0.51, 1],
    start: { y: 1, x: 0.49999999999999994 },
    end: { y: 0, x: 0.5 },
  },
  loginBG: {
    colors: [
      "rgba(241, 241, 241, 0.05)",
      "rgba(227, 241, 233, 1)",
      "rgba(241, 241, 241, 0.05)",
    ],
    locations: [0, 0.51, 1],
    start: { y: 1, x: 0.49999999999999994 },
    end: { y: 0, x: 0.5 },
  },
  progress: {
    colors: ["#47AD4D", "#82BC41"],
    locations: [0, 1],
    start: { y: 0.4999999999999999, x: 0 },
    end: { y: 0.5000000000000001, x: 1 },
  },
  flavorScreen: {
    colors: [
      "rgba(241, 241, 241, 0.05)",
      "rgba(227, 241, 233, 1)",
      "rgba(241, 241, 241, 0.05)",
    ],
    locations: [0, 0.51, 1],
    start: { y: 1, x: 0.49999999999999994 },
    end: { y: 0, x: 0.5 },
  },

  productOverlay1: {
    colors: [
      "rgba(71, 173, 77, 0)",
      "rgba(71, 173, 77, 1)",
    ],
    locations: [0, 1],
    start: { x: 0.4999999999999999, y: 0 },
    end: { x: 0.5000000000000001, y: 1 },
  },
  productOverlay2: {
    colors: [
      "rgba(239, 185, 33, 0)",
      "rgba(227, 159, 36, 1)",
    ],
    locations: [0, 1],
    start: { x: 0.4999999999999999, y: 0 },
    end: { x: 0.5000000000000001, y: 1 },
  },
  productOverlay3: {
    colors: [
      "rgba(251, 140, 70, 0)",
      "rgba(251, 140, 70, 1)",
    ],
    locations: [0, 1],
    start: { x: 0.4999999999999999, y: 0 },
    end: { x: 0.5000000000000001, y: 1 },
  },
  productOverlay4: {
    colors: [
      "rgba(255, 92, 138, 0)",
      "rgba(255, 92, 138, 1)",
    ],
    locations: [0, 1],
    start: { x: 0.4999999999999999, y: 0 },
    end: { x: 0.5000000000000001, y: 1 },
  },
  informBG: {
    colors: [
      "rgba(71, 173, 77, 1)",
      "rgba(130, 188, 65, 1)",
    ],
    locations: [0, 1],
    start: { y: 0.4999999999999999, x: 0 },
    end: { y: 0.5000000000000001, x: 1 },
  },
  thankYouBG: {
    colors: [
      "rgba(71, 173, 77, 0.4)",
      "rgba(255, 255, 255, 1)",
      "rgba(255, 255, 255, 1)",
      "rgba(71, 173, 77, 0.4)",
    ],
    locations: [0, 0.25, 0.51, 1],
    start: { x: 1.099559695025369, y: 0.8029907502661655 },
    end: { x: -0.09955969502536888, y: 0.19700924973383444 },
  },
  transparent: {
    colors : ['rgba(255, 0, 0, 0.5)', 'rgba(0, 0, 255, 0.5)'],
    locations: [0, 1],
    start: { y: 0.4999999999999999, x: 0 },
    end: { y: 0.5000000000000001, x: 1 },
  }
};

export const RESPONSIVE_WIDTH = ["100%", "85%", "60%", "45%", "30%"];

export const convertToDP = (pixelValue: string) =>
  parseFloat(pixelValue.replace("px", ""));

export const HIT_SLOP = { top: 10, left: 10, bottom: 10, right: 10 };
