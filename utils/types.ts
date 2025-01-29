import { ColorType } from "native-base/lib/typescript/components/types";
import { SvgProps } from "react-native-svg";

export type SvgNBProps = Omit<SvgProps, "fill"> & { fill?: ColorType }