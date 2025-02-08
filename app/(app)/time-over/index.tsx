import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { useGlobalSearchParams, useRouter } from "expo-router";
import BasicButton from "@design-system/components/buttons/basic-button";
import { Image } from "react-native";
import images from "@assets/images/images";
import ResponsiveContent from "@modules/shared/responsive-content";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import { BannerAdSize } from "react-native-google-mobile-ads";
import contents from "@assets/contents/contents";

function TimeOverScreen() {
  const {
    correctWord = "0",
    wrongWord = "0",
    repeatWord = "0",
  }:
    {
      correctWord?: string
      wrongWord?: string
      repeatWord?: string
    }
    = useGlobalSearchParams();
    const languageData =
    contents.timeOverScreenSelectedLanguage?.[
      global?.currentSelectedLanguage ?? "English"
    ];
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const formattedValue = (value: number) => {
    return value > 9 ? value : `0` + value;
  }

  return (
    <YStack flex={1} bg={"$black"}>
      <ScrollHeader
        title=""
        backgroundColor={"$black"}
        back={false}
      />

      <ResponsiveContent flex={1}>
        <SizableText
          fontSize={"$6xl"}
          color={"$white"}
          fontWeight={"700"}
          textAlign="center"
          rotateX={"-30deg"}
          rotateY={"30deg"}
          lineHeight={80}
          textShadowOffset={{ width: 0, height: 7 }}
          textShadowColor={"$primary"}
          textShadowRadius={8}
        >
          {languageData.time_over}
        </SizableText>

        <YStack alignItems="center">
          <YStack h={"$8"} />
          <Image
            key={"timeOver"}
            source={images.timeOver}
            style={{ height: 150, width: 150 }}
            alt={"timeOver"}
          />

          <YStack h={"$12"} />
          <XStack alignItems="center">
            <YStack>
              <SizableText
                fontSize={"$hxs"}
                color={"$white"}
                fontWeight={"$normal"}
                textAlign="center"
              >
                {languageData.correct_word}
              </SizableText>

              <SizableText
                fontSize={"$hsm"}
                color={"$primary"}
                fontWeight={"$bold700"}
                textAlign="center"
              >
                {formattedValue(parseInt(correctWord))}
              </SizableText>
            </YStack>
          </XStack>
          <YStack h={"$2"} />
          <XStack alignItems="center" mx={"$4"}>
            <YStack>
              <SizableText
                fontSize={"$hxs"}
                color={"$white"}
                fontWeight={"$normal"}
                textAlign="center"
              >
                {languageData.wrong_word}
              </SizableText>

              <SizableText
                fontSize={"$hsm"}
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
                fontSize={"$hxs"}
                color={"$white"}
                fontWeight={"$normal"}
                textAlign="center"
              >
                {languageData.repeat_word}
              </SizableText>

              <SizableText
                fontSize={"$hsm"}
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
        <YStack mx={"$4"} mb={"$4"}>
          <BasicButton
            height={46}
            linearGradientProps={{ colors: ["#ffffff", "#ffffff"] }}
            onPress={() => {
              router.back()
            }}
          >
            <XStack alignItems="center" justifyContent="center">
              <Image
                key={"home"}
                source={images.home}
                style={{ height: 18, width: 18 }}
                alt={"home"}
              />
              <YStack w={"$2"} />
              <SizableText
                mb={-5}
                fontSize={"$hxs"}
                color={"$black"}
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
      <AdmobBanner bannerSize={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
      <YStack h={insets.bottom} />
    </YStack>
  )
}

export default TimeOverScreen;