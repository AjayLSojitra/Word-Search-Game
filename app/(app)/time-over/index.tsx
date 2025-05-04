import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { useGlobalSearchParams, useRouter } from "expo-router";
import BasicButton from "@design-system/components/buttons/basic-button";
import { Image } from "react-native";
import images from "@assets/images/images";
import ResponsiveContent from "@modules/shared/responsive-content";
import contents from "@assets/contents/contents";
import { DeviceType, deviceType } from "expo-device";

function TimeOverScreen() {
  const {
    correctWord = "0",
    wrongWord = "0",
    repeatWord = "0",
  }: {
    correctWord?: string;
    wrongWord?: string;
    repeatWord?: string;
  } = useGlobalSearchParams();
  const languageData =
    contents.timeOverScreenSelectedLanguage?.[
      global?.currentSelectedLanguage ?? "English"
    ];
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  const formattedValue = (value: number) => {
    return value > 9 ? value : `0` + value;
  };

  return (
    <YStack flex={1} bg={"$primary"}>
      <ScrollHeader title="" backgroundColor={"$primary"} back={false} />

      <ResponsiveContent flex={1}>
        <SizableText
          fontSize={isPhoneDevice ? "$6xl" : "$8xl"}
          lineHeight={isPhoneDevice ? 80 : 110}
          color={"$secondPrimaryColor"}
          fontWeight={"700"}
          textAlign="center"
          rotateX={"-30deg"}
          rotateY={"30deg"}
          textShadowOffset={{ width: 0, height: 7 }}
          textShadowColor={"$primary"}
          textShadowRadius={8}
        >
          {languageData.time_over}
        </SizableText>

        <YStack alignItems="center">
          <YStack h={isPhoneDevice ? "$8" : "$12"} />
          <Image
            key={"timeOver"}
            source={images.timeOver}
            style={{
              height: isPhoneDevice ? 150 : 225,
              width: isPhoneDevice ? 150 : 225,
            }}
            alt={"timeOver"}
          />

          <YStack h={isPhoneDevice ? "$12" : "$18"} />
          <XStack alignItems="center">
            <YStack>
              <SizableText
                fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                lineHeight={isPhoneDevice ? 24 : 34}
                color={"$secondPrimaryColor"}
                fontWeight={"$semibold"}
                textAlign="center"
              >
                {languageData.correct_word}
              </SizableText>

              <SizableText
                fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
                lineHeight={isPhoneDevice ? 22 : 34}
                color={"$white"}
                fontWeight={"$bold700"}
                textAlign="center"
              >
                {formattedValue(parseInt(correctWord))}
              </SizableText>
            </YStack>
          </XStack>
          <YStack h={isPhoneDevice ? "$2" : "$3"} />
          <XStack alignItems="center" mx={isPhoneDevice ? "$4" : 0}>
            <YStack>
              <SizableText
                fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                lineHeight={isPhoneDevice ? 24 : 34}
                color={"$secondPrimaryColor"}
                fontWeight={"$semibold"}
                textAlign="center"
              >
                {languageData.wrong_word}
              </SizableText>

              <SizableText
                fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
                lineHeight={isPhoneDevice ? 22 : 34}
                color={"$red.600"}
                fontWeight={"$bold700"}
                textAlign="center"
              >
                {formattedValue(parseInt(wrongWord))}
              </SizableText>
            </YStack>
            <YStack flex={1} />
            <YStack>
              <SizableText
                fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                lineHeight={isPhoneDevice ? 24 : 34}
                color={"$secondPrimaryColor"}
                fontWeight={"$semibold"}
                textAlign="center"
              >
                {languageData.repeat_word}
              </SizableText>

              <SizableText
                fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
                lineHeight={isPhoneDevice ? 22 : 34}
                color={"$yellow.600"}
                fontWeight={"$bold700"}
                textAlign="center"
              >
                {formattedValue(parseInt(repeatWord))}
              </SizableText>
            </YStack>
          </XStack>
        </YStack>
        <YStack flex={1} />
        <YStack mx={isPhoneDevice ? "$4" : 0} mb={isPhoneDevice ? "$4" : "$6"}>
          <BasicButton
            height={isPhoneDevice ? 46 : 69}
            linearGradientProps={{ colors: ["#ffffff", "#ffffff"] }}
            onPress={() => {
              router.back();
            }}
          >
            <XStack alignItems="center" justifyContent="center">
              <Image
                key={"home"}
                source={images.home}
                style={{
                  height: isPhoneDevice ? 18 : 27,
                  width: isPhoneDevice ? 18 : 27,
                }}
                alt={"home"}
              />
              <YStack w={isPhoneDevice ? "$2" : "$3"} />
              <SizableText
                fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                lineHeight={isPhoneDevice ? 24 : 34}
                color={"$secondPrimaryColor"}
                fontWeight={"700"}
                textAlign="center"
                textTransform="uppercase"
              >
                {languageData.go_to_home}
              </SizableText>
            </XStack>
          </BasicButton>
        </YStack>
      </ResponsiveContent>
      <YStack h={insets.bottom} />
    </YStack>
  );
}

export default TimeOverScreen;
