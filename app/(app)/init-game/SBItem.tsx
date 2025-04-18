import React from "react";
import Animated from "react-native-reanimated";
import SBTextItem from "./SBTextItem";

interface Props {
  index?: number;
  selectedIndex?: number;
  value: string;
  onPress: () => void;
}

const SBItem: React.FC<Props> = (props) => {
  const { index, selectedIndex, value, onPress, ...animatedViewProps } = props;

  return (
    <Animated.View style={{ flex: 1 }} {...animatedViewProps}>
      <SBTextItem
        index={index}
        value={value}
        selectedIndex={selectedIndex}
        onPress={onPress}
      />
    </Animated.View>
  );
};

export default SBItem;
