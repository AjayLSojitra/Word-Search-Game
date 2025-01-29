// import React from "react";
// import { SizableText, YStack, XStack } from "tamagui";
// import { GRADIENTS, HIT_SLOP } from "@utils/theme";
// import TouchableScale from "@design-system/components/shared/touchable-scale";
// import images from "@assets/images/images";
// import { Image } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// type InformToastProps = {
//   onClosePress?: () => void;
//   title: string;
// }

// function InformToast(props: Readonly<InformToastProps>) {
//   const { onClosePress, title } = props;

//   return (
//     <YStack height={51} marginHorizontal={"$4"}>
//       <LinearGradient
//         style={{ flex: 1, borderRadius: 12, justifyContent: "center" }}
//         {...GRADIENTS.informBG}
//       >
//         <XStack alignItems="center" marginHorizontal={"$4"}>
//           <SizableText
//             fontSize={"$xs"}
//             lineHeight={20}
//             color={"$white"}
//             fontWeight={"$semibold"}
//           >
//             {title}
//           </SizableText>
//           <YStack flex={1} />
//           <TouchableScale
//             hitSlop={HIT_SLOP}
//             onPress={onClosePress}
//             testID="close-press"
//           >
//             <Image
//               key={"closeWhite"}
//               source={images.closeWhite}
//               style={{ height: 24, width: 24 }}
//               alt={"closeWhite"}
//             />
//           </TouchableScale>
//         </XStack>
//       </LinearGradient>
//     </YStack>
//   );
// }

// export default InformToast;
