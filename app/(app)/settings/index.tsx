import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { Linking, Platform, ScrollView, Share, Switch } from "react-native";
import { useCallback, useRef, useState } from "react";
import { Image } from "react-native";
import images from "@assets/images/images";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import DeviceInfo from 'react-native-device-info';
import LocalStorage from "@utils/local-storage";
import { useFocusEffect } from "expo-router";
import ResponsiveContent from "@modules/shared/responsive-content";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";
import { APPLE_STORE_ID, appStoreLink, staticPrivacyPolicy } from "@modules/shared/components/helpers";

function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const isSoundEnabled = useRef(true);
  const [isSoundSwitchEnabled, setIsSoundSwitchEnabled] = useState(true);
  const toggleSound = () => isSoundEnabled.current = !isSoundEnabled.current;
  const toggleSoundSwitch = () => setIsSoundSwitchEnabled(previousState => !previousState);

  const privacyPolicyURL = global.privacy_policy ?? staticPrivacyPolicy
  const supportEmail = "info.as2infotech@gmail.com"
  const packageName = DeviceInfo.getBundleId()

  useFocusEffect(
    useCallback(() => {
      LocalStorage.getItemDefault("SOUND_KEY").then(
        (val) => {
          isSoundEnabled.current = val == null || val === "Yes";
          setIsSoundSwitchEnabled(val == null || val === "Yes")
        }
      );
    }, [])
  );

  return (
    <YStack flex={1} backgroundColor={"$primary"}>
      <ScrollHeader
        title={`Settings`}
        backgroundColor={"$primary"}
      />

      <ResponsiveContent flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack mx={"$4"} mb={"$4"}>

            <TouchableScale onPress={() => {
              LocalStorage.setItemDefault("SOUND_KEY", isSoundEnabled.current ? "No" : "Yes", () => {
                toggleSound()
                toggleSoundSwitch()
              })
            }}>
              <XStack alignItems="center" py={"$4"}>
                <Image
                  key={"soundOnWhite"}
                  source={images.soundOnWhite}
                  style={{ height: 24, width: 24 }}
                  alt={"soundOnWhite"}
                />
                <YStack w={"$2"} />
                <SizableText
                  fontSize={"$hsm"}
                  color={"$white"}
                  fontWeight={"700"}
                >
                  Sound
                </SizableText>
                <YStack flex={1} />
                <Switch
                  trackColor={{ false: '#595959', true: '#000000' }}
                  thumbColor={isSoundSwitchEnabled ? '#ffffff' : '#B3B3B3'}
                  ios_backgroundColor="#000000"
                  onValueChange={() => {
                    LocalStorage.setItemDefault("SOUND_KEY", isSoundEnabled.current ? "No" : "Yes", () => {
                      toggleSound()
                      toggleSoundSwitch()
                    })
                  }}
                  value={isSoundSwitchEnabled}
                />
              </XStack>
            </TouchableScale>

            <TouchableScale onPress={async () => {
              const supported = await Linking.canOpenURL(privacyPolicyURL);
              if (supported) {
                await Linking.openURL(privacyPolicyURL);
              }
            }}>
              <XStack alignItems="center" py={"$4"}>
                <Image
                  key={"privacyPolicy"}
                  source={images.privacyPolicy}
                  style={{ height: 24, width: 24 }}
                  alt={"privacyPolicy"}
                />
                <YStack w={"$2"} />
                <SizableText
                  fontSize={"$hsm"}
                  color={"$white"}
                  fontWeight={"700"}
                >
                  Privacy Policy
                </SizableText>
              </XStack>
            </TouchableScale>

            <TouchableScale onPress={() => {
              try {
                Share.share({
                  message:
                    `I recommend trying out this application: Spelling Checker & Verbal Fluency Game available on the Google Play Store and App Store. This app focuses on improving spelling skills and verbal fluency. Give it a try and see how it can enhance your language abilities! 
                  \nGoogle Play Store link: https://play.google.com/store/apps/details?id=${packageName}
                  \nApp Store link: ${appStoreLink}`,
                });
              } catch (e) {
                console.log(e);
              }
            }}>
              <XStack alignItems="center" py={"$4"}>
                <Image
                  key={"share"}
                  source={images.share}
                  style={{ height: 24, width: 24 }}
                  alt={"share"}
                />
                <YStack w={"$2"} />
                <SizableText
                  fontSize={"$hsm"}
                  color={"$white"}
                  fontWeight={"700"}
                >
                  Share Game
                </SizableText>
              </XStack>
            </TouchableScale>

            <TouchableScale onPress={() => {
              if (Platform.OS === "android") {
                //To open the Google Play Store
                Linking.openURL(`market://details?id=${packageName}`).catch(err =>
                  console.log(err)
                );
              } else if (Platform.OS === 'ios') {
                //To open the Apple App Store
                Linking.openURL(
                  `itms-apps://itunes.apple.com.app/${APPLE_STORE_ID}`
                ).catch(err => console.log(err));
              }
            }}>
              <XStack alignItems="center" py={"$4"}>
                <Image
                  key={"rating"}
                  source={images.rating}
                  style={{ height: 24, width: 24 }}
                  alt={"rating"}
                />
                <YStack w={"$2"} />
                <SizableText
                  fontSize={"$hsm"}
                  color={"$white"}
                  fontWeight={"700"}
                >
                  Rate Us
                </SizableText>
              </XStack>
            </TouchableScale>

            <TouchableScale onPress={() => {
              Linking.openURL(`mailto:${supportEmail}`)
            }}>
              <XStack alignItems="center" py={"$4"}>
                <Image
                  key={"contactUs"}
                  source={images.contactUs}
                  style={{ height: 24, width: 24 }}
                  alt={"contactUs"}
                />
                <YStack w={"$2"} />
                <SizableText
                  fontSize={"$hsm"}
                  color={"$white"}
                  fontWeight={"700"}
                >
                  Contact Us<SizableText
                    fontSize={"$xs"}
                    color={"$white"}
                    fontWeight={"$medium"}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {` (${supportEmail})`}
                  </SizableText>
                </SizableText>
              </XStack>
            </TouchableScale>
          </YStack>
        </ScrollView>

        <YStack flex={1} />
        <SizableText
          m={"$4"}
          textAlign="center"
          fontSize={"$hsm"}
          color={"$black"}
          fontWeight={"700"}
        >
          {`Version: ${DeviceInfo.getBuildNumber()} (${DeviceInfo.getVersion()})`}
        </SizableText>
      </ResponsiveContent>
      <AdmobBanner />
      <YStack h={insets.bottom} />
    </YStack>
  )
}

export default SettingsScreen;