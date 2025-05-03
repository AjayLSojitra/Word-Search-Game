import { SizableText, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { ScrollView } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import ResponsiveContent from "@modules/shared/responsive-content";
import { DeviceType, deviceType } from "expo-device";

function HelpScreen() {
  const { isForTraining = "No" }: { isForTraining?: string } =
    useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const isPhoneDevice = deviceType === DeviceType.PHONE;

  return (
    <YStack flex={1} backgroundColor={"$primary"}>
      <ScrollHeader
        title={`How To Play${isForTraining === "Yes" ? " (Training)" : ""}`}
        backgroundColor={"$primary"}
      />

      <ResponsiveContent flex={1}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <YStack
            mx={isPhoneDevice ? "$4" : 0}
            mt={isPhoneDevice ? "$4" : "$6"}
          >
            {isForTraining === "Yes" ? (
              <>
                <SizableText
                  fontSize={isPhoneDevice ? "$xs" : "$lg"}
                  lineHeight={isPhoneDevice ? 20 : 26}
                  fontWeight={"$normal"}
                  color={"$secondPrimaryColor"}
                >
                  {`When you choose to train your mind, a random character from the alphabet will be selected, and a random word length between 3 to 8 will also be chosen. You will see the randomly selected character displayed in the first input box.

Once a random word and word length are chosen, swiftly input words commencing with the selected letter. Remember, all words must start with the randomly selected character.

After typing a word, it undergoes automatic verification. Genuine words appear in green and contribute to your score, while invalid ones display in red and do not affect your score. Duplicate entries are highlighted in yellow and do not increase your score.`}
                </SizableText>
              </>
            ) : (
              <>
                <SizableText
                  fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                  lineHeight={isPhoneDevice ? 24 : 30}
                  fontWeight={"$bold700"}
                  color={"$secondPrimaryColor"}
                >
                  Level Selection : {`\n`}
                  <SizableText
                    fontSize={isPhoneDevice ? "$xs" : "$lg"}
                    lineHeight={isPhoneDevice ? 20 : 26}
                    fontWeight={"$normal"}
                    color={"$secondPrimaryColor"}
                  >
                    Choose your preferred difficulty level before starting the
                    game. Whether you're a beginner or an expert, there's a
                    level for everyone to enjoy.
                  </SizableText>
                </SizableText>

                <YStack h={isPhoneDevice ? "$4" : "$6"} />
                <SizableText
                  fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                  lineHeight={isPhoneDevice ? 24 : 30}
                  fontWeight={"$bold700"}
                  color={"$secondPrimaryColor"}
                >
                  Pick a Letter : {`\n`}
                  <SizableText
                    fontSize={isPhoneDevice ? "$xs" : "$lg"}
                    lineHeight={isPhoneDevice ? 20 : 26}
                    fontWeight={"$normal"}
                    color={"$secondPrimaryColor"}
                  >
                    Swipe through the alphabet to select your desired letter or
                    option for the ‘Pick Random' button. Keep in mind that some
                    letters present more challenges than others.
                  </SizableText>
                </SizableText>

                <YStack h={isPhoneDevice ? "$4" : "$6"} />
                <SizableText
                  fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                  lineHeight={isPhoneDevice ? 24 : 30}
                  fontWeight={"$bold700"}
                  color={"$secondPrimaryColor"}
                >
                  Setting Game Parameters : {`\n`}
                  <SizableText
                    fontSize={isPhoneDevice ? "$xs" : "$lg"}
                    lineHeight={isPhoneDevice ? 20 : 26}
                    fontWeight={"$normal"}
                    color={"$secondPrimaryColor"}
                  >
                    Pick your time duration and pick word length before
                    initiating the game.
                  </SizableText>
                </SizableText>

                <YStack h={isPhoneDevice ? "$4" : "$6"} />
                <SizableText
                  fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                  lineHeight={isPhoneDevice ? 24 : 30}
                  fontWeight={"$bold700"}
                  color={"$secondPrimaryColor"}
                >
                  Gameplay : {`\n`}
                  <SizableText
                    fontSize={isPhoneDevice ? "$xs" : "$lg"}
                    lineHeight={isPhoneDevice ? 20 : 26}
                    fontWeight={"$normal"}
                    color={"$secondPrimaryColor"}
                  >
                    Swiftly input words commencing with the chosen letter.
                    Remember, all words must match the length selected in the
                    previous screen.
                  </SizableText>
                </SizableText>

                <YStack h={isPhoneDevice ? "$4" : "$6"} />
                <SizableText
                  fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                  lineHeight={isPhoneDevice ? 24 : 30}
                  fontWeight={"$bold700"}
                  color={"$secondPrimaryColor"}
                >
                  Word Validation : {`\n`}
                  <SizableText
                    fontSize={isPhoneDevice ? "$xs" : "$lg"}
                    lineHeight={isPhoneDevice ? 20 : 26}
                    fontWeight={"$normal"}
                    color={"$secondPrimaryColor"}
                  >
                    Once a word is typed, it undergoes automatic verification.
                    Genuine words appear in green and contribute to your score,
                    while invalid ones display in red and do not affect your
                    score. Duplicate entries are highlighted in yellow and do
                    not increase your score.
                  </SizableText>
                </SizableText>

                <YStack h={isPhoneDevice ? "$4" : "$6"} />
                <SizableText
                  fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                  lineHeight={isPhoneDevice ? 24 : 30}
                  fontWeight={"$bold700"}
                  color={"$secondPrimaryColor"}
                >
                  End of Game : {`\n`}
                  <SizableText
                    fontSize={isPhoneDevice ? "$xs" : "$lg"}
                    lineHeight={isPhoneDevice ? 20 : 26}
                    fontWeight={"$normal"}
                    color={"$secondPrimaryColor"}
                  >
                    Upon completion of the game, your score will be revealed,
                    allowing you to assess your performance. You can share your
                    score with others to challenge them. To improve your score
                    or explore different letters, tap 'Play Again.'
                  </SizableText>
                </SizableText>

                <YStack h={isPhoneDevice ? "$4" : "$6"} />
                <SizableText
                  fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                  lineHeight={isPhoneDevice ? 24 : 30}
                  fontWeight={"$bold700"}
                  color={"$secondPrimaryColor"}
                >
                  Cross-Device Compatibility : {`\n`}
                  <SizableText
                    fontSize={isPhoneDevice ? "$xs" : "$lg"}
                    lineHeight={isPhoneDevice ? 20 : 26}
                    fontWeight={"$normal"}
                    color={"$secondPrimaryColor"}
                  >
                    Experience seamless gameplay across all your Android and iOS
                    devices, including smartphones and tablets. Enjoy
                    uninterrupted gaming anytime, anywhere, even when you are
                    offline.'
                  </SizableText>
                </SizableText>
                <YStack h={isPhoneDevice ? "$4" : "$6"} />
                <YStack h={insets.bottom} />
              </>
            )}
          </YStack>
        </ScrollView>
      </ResponsiveContent>
    </YStack>
  );
}

export default HelpScreen;
