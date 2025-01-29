import { SizableText, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { ScrollView } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import ResponsiveContent from "@modules/shared/responsive-content";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";

function HelpScreen() {
  const { isForTraining = "No" }: { isForTraining?: string } = useGlobalSearchParams();
  const insets = useSafeAreaInsets();

  return (
    <YStack flex={1} backgroundColor={"$primary"}>
      <ScrollHeader
        title={`How To Play${isForTraining === "Yes" ? " (Training)" : ""}`}
        backgroundColor={"$primary"}
      />

      <ResponsiveContent flex={1}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <YStack mx={"$4"} mb={"$4"}>

            {isForTraining === "Yes" ? (
              <>
                <SizableText
                  fontSize={"$hxs"}
                  fontWeight={"$medium"}
                  color={"$white"}
                >
                  {`When you choose to train your mind, a random character from the alphabet will be selected, and a random word length between 3 to 8 will also be chosen. You will see the randomly selected character displayed in the first input box.

Once a random word and word length are chosen, swiftly input words commencing with the selected letter. Remember, all words must start with the randomly selected character.

After typing a word, it undergoes automatic verification. Genuine words appear in green and contribute to your score, while invalid ones display in red and do not affect your score. Duplicate entries are highlighted in yellow and do not increase your score.`}
                </SizableText>
              </>
            ) : (
              <>
                <SizableText
                  fontSize={"$hxs"}
                  fontWeight={"$bold900"}
                  color={"$white"}
                >
                  Level Selection : {` `}<SizableText
                    fontSize={"$xs"}
                    fontWeight={"$normal"}
                    color={"$white"}>Choose your preferred difficulty level before starting the game. Whether you're a beginner or an expert, there's a level for everyone to enjoy.</SizableText>
                </SizableText>

                <YStack h={"$3"} />
                <SizableText
                  fontSize={"$hxs"}
                  fontWeight={"$bold900"}
                  color={"$white"}
                >
                  Pick a Letter : {` `}<SizableText
                    fontSize={"$xs"}
                    fontWeight={"$normal"}
                    color={"$white"}>Swipe through the alphabet to select your desired letter or option for the ‘Pick Random' button. Keep in mind that some letters present more challenges than others.</SizableText>
                </SizableText>

                <YStack h={"$3"} />
                <SizableText
                  fontSize={"$hxs"}
                  fontWeight={"$bold900"}
                  color={"$white"}
                >
                  Setting Game Parameters : {` `}<SizableText
                    fontSize={"$xs"}
                    fontWeight={"$normal"}
                    color={"$white"}>Pick your time duration and pick word length before initiating the game.</SizableText>
                </SizableText>

                <YStack h={"$3"} />
                <SizableText
                  fontSize={"$hxs"}
                  fontWeight={"$bold900"}
                  color={"$white"}
                >
                  Gameplay : {` `}<SizableText
                    fontSize={"$xs"}
                    fontWeight={"$normal"}
                    color={"$white"}>Following a 3-second countdown, swiftly input words commencing with the chosen letter. Remember, all words must match the length selected in the previous screen.</SizableText>
                </SizableText>

                <YStack h={"$3"} />
                <SizableText
                  fontSize={"$hxs"}
                  fontWeight={"$bold900"}
                  color={"$white"}
                >
                  Word Validation : {` `}<SizableText
                    fontSize={"$xs"}
                    fontWeight={"$normal"}
                    color={"$white"}>Once a word is typed, it undergoes automatic verification. Genuine words appear in green and contribute to your score, while invalid ones display in red and do not affect your score. Duplicate entries are highlighted in yellow and do not increase your score.</SizableText>
                </SizableText>

                <YStack h={"$3"} />
                <SizableText
                  fontSize={"$hxs"}
                  fontWeight={"$bold900"}
                  color={"$white"}
                >
                  End of Game : {` `}<SizableText
                    fontSize={"$xs"}
                    fontWeight={"$normal"}
                    color={"$white"}>Upon completion of the game, your score will be revealed, allowing you to assess your performance. You can share your score with others to challenge them. To improve your score or explore different letters, tap 'Play Again.'</SizableText>
                </SizableText>

                <YStack h={"$3"} />
                <SizableText
                  fontSize={"$hxs"}
                  fontWeight={"$bold900"}
                  color={"$white"}
                >
                  Cross-Device Compatibility : {` `}<SizableText
                    fontSize={"$xs"}
                    fontWeight={"$normal"}
                    color={"$white"}>Experience seamless gameplay across all your Android and iOS devices, including smartphones and tablets. Enjoy uninterrupted gaming anytime, anywhere, even when you are offline.'</SizableText>
                </SizableText>
              </>
            )}
          </YStack>
        </ScrollView>
      </ResponsiveContent>
      <YStack h={"$2"} />
      <AdmobBanner />
      <YStack h={insets.bottom} />
    </YStack>
  )
}

export default HelpScreen;