import { SizableText, XStack, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollHeader from "@design-system/components/navigation/scroll-header";
import { Linking, Switch, Image } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import images from "@assets/images/images";
import TouchableScale from "@design-system/components/shared/touchable-scale";
import DeviceInfo from "react-native-device-info";
import LocalStorage from "@utils/local-storage";
import { useFocusEffect, useRouter } from "expo-router";
import ResponsiveContent from "@modules/shared/responsive-content";
import AdmobBanner from "@modules/shared/components/ads/admob-banner";

import {
  canShowAdmobInteratitial,
  languages,
  rateMyApp,
  shareMyApp,
  staticDefaultLanguage,
  staticInterstitialAd,
  staticPrivacyPolicy,
  staticSupportEmail,
} from "@modules/shared/components/helpers";
import { LANGUAGE_KEY, SOUND_KEY } from "@modules/shared/components/constants";
import SelectDropdown from "react-native-select-dropdown";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import AdsNotifyDialog from "@modules/shared/components/confirmation-dialog/ads-notify-dialog";
import { DeviceType, deviceType } from "expo-device";
import useTriggeredEvent, {
  triggerEvent,
} from "@modules/shared/components/use-triggered-event";
import contents from "@assets/contents/contents";

function SettingsScreen() {
  const defaultLanguage = global?.defaultLanguage ?? staticDefaultLanguage;
  const [selectedLanguage, setSelectedLanguage] = useState<any>(
    parseInt(defaultLanguage)
  );

  const languageData =
    contents.settingScreenSelectedLanguage?.[
      global?.currentSelectedLanguage ?? "English"
    ];

  const [selectedLanguageRefreshKey, setSelectedLanguageRefreshKey] =
    useState(0);
  useTriggeredEvent("languageSelection", () => {
    setSelectedLanguageRefreshKey(selectedLanguageRefreshKey + 1);
  });

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedLanguageRefreshKey])
  );

  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isSoundEnabled = useRef(true);
  const [isSoundSwitchEnabled, setIsSoundSwitchEnabled] = useState(true);
  const toggleSound = () => (isSoundEnabled.current = !isSoundEnabled.current);
  const toggleSoundSwitch = () =>
    setIsSoundSwitchEnabled((previousState) => !previousState);

  const loadData = async () => {
    LocalStorage.getItemDefault(SOUND_KEY).then((val) => {
      isSoundEnabled.current = val == null || val === "Yes";
      setIsSoundSwitchEnabled(val == null || val === "Yes");
    });

    LocalStorage.getItemDefault(LANGUAGE_KEY).then((val) => {
      setSelectedLanguage(val ?? defaultLanguage); // Default to "English" if no language is set
    });
  };

  const privacyPolicyURL = global.privacy_policy ?? staticPrivacyPolicy;
  const supportEmail = global?.supportEmail ?? staticSupportEmail;

  const { isLoaded, isClosed, load, show, error } = useInterstitialAd(
    __DEV__
      ? TestIds.INTERSTITIAL_VIDEO
      : global?.interstitialAd ?? staticInterstitialAd
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (error) {
      setShowAdsConfirmationPopup(false);
    }
  }, [error]);

  useEffect(() => {
    if (isClosed) {
      load();
      // Action after the ad is closed
      setShowAdsConfirmationPopup(false);
    }
  }, [isClosed]);

  const [showAdsConfirmationPopup, setShowAdsConfirmationPopup] =
    useState(false);
  const showInterstitial = () => {
    setShowAdsConfirmationPopup(true);
    setTimeout(() => {
      show();
    }, 2000);
  };

  const isPhoneDevice = deviceType === DeviceType.PHONE;
  const iconSize = isPhoneDevice ? 24 : 36;

  return (
    <YStack flex={1} backgroundColor={"$primary"}>
      <ScrollHeader
        title={languageData.settings}
        backgroundColor={"$primary"}
      />

      <ResponsiveContent flex={1}>
        <YStack alignItems="center" justifyContent="center">
          <AdsNotifyDialog
            showDialog={showAdsConfirmationPopup}
            content={`Ad is loading...`}
          />
        </YStack>

        <YStack mx={isPhoneDevice ? "$4" : 0} mb={"$4"}>
          <TouchableScale
            onPress={() => {
              LocalStorage.setItemDefault(
                SOUND_KEY,
                isSoundEnabled.current ? "No" : "Yes",
                () => {
                  toggleSound();
                  toggleSoundSwitch();
                  if (isLoaded && canShowAdmobInteratitial()) {
                    showInterstitial();
                  }
                }
              );
            }}
          >
            <XStack alignItems="center" py={isPhoneDevice ? "$4" : "$6"}>
              <Image
                key={"soundOnWhite"}
                source={images.soundOnWhite}
                style={{
                  height: iconSize,
                  width: iconSize,
                }}
                alt={"soundOnWhite"}
              />
              <YStack w={isPhoneDevice ? "$2" : "$3"} />
              <SizableText
                fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
                lineHeight={isPhoneDevice ? 22 : 34}
                color={"$white"}
                fontWeight={"700"}
              >
                {languageData.sound}
              </SizableText>
              <YStack flex={1} />
              <Switch
                trackColor={{ false: "#595959", true: "#1c2e4a" }}
                thumbColor={isSoundSwitchEnabled ? "#ffffff" : "#B3B3B3"}
                ios_backgroundColor="#1c2e4a"
                onValueChange={() => {
                  LocalStorage.setItemDefault(
                    SOUND_KEY,
                    isSoundEnabled.current ? "No" : "Yes",
                    () => {
                      toggleSound();
                      toggleSoundSwitch();
                      if (isLoaded && canShowAdmobInteratitial()) {
                        showInterstitial();
                      }
                    }
                  );
                }}
                value={isSoundSwitchEnabled}
              />
            </XStack>
          </TouchableScale>

          <XStack alignItems="center" py={isPhoneDevice ? "$3" : "$5"}>
            <Image
              key={"language"}
              source={images.language}
              style={{
                height: iconSize,
                width: iconSize,
                tintColor: "#FFFFFF",
              }}
              alt={"language"}
            />
            <YStack w={isPhoneDevice ? "$2" : "$3"} />
            <SizableText
              fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
              lineHeight={isPhoneDevice ? 22 : 34}
              color={"$white"}
              fontWeight={"700"}
            >
              {languageData.language_selection}
            </SizableText>

            <YStack w={isPhoneDevice ? "$4" : "$6"} />
            <YStack
              flex={1}
              height={isPhoneDevice ? 34 : 51}
              backgroundColor={"black"}
              borderRadius={isPhoneDevice ? 8 : 12}
              alignItems="center"
              justifyContent="center"
            >
              <SelectDropdown
                data={languages} // Array of languages (objects with 'name')
                defaultValueByIndex={languages.findIndex(
                  (language) => language.name === selectedLanguage // Match selected language with state
                )}
                onSelect={(selectedItem, index) => {
                  // Store selected language in LocalStorage and update state
                  LocalStorage.setItemDefault(
                    LANGUAGE_KEY,
                    selectedItem.name,
                    () => {
                      const languageToSet = selectedItem.name;
                      setSelectedLanguage(languageToSet); // Update state
                      global.currentSelectedLanguage = languageToSet;
                      triggerEvent("languageSelection", languageToSet); // Pass the language as payload
                    }
                  );

                  if (isLoaded && canShowAdmobInteratitial()) {
                    showInterstitial();
                  }
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <XStack
                      mx={isPhoneDevice ? "$3" : "$5"}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <SizableText
                        flex={1}
                        fontSize={isPhoneDevice ? "$hxs" : "$hmd"}
                        lineHeight={isPhoneDevice ? 26 : 30}
                        color={"$white"}
                        fontWeight={"$medium"}
                        numberOfLines={1}
                      >
                        {(selectedItem && selectedItem.name) ||
                          "Select Language"}
                        {/* Display the language name */}
                      </SizableText>
                      <YStack w={"$3"} />
                      <Image
                        key={"dropdown"}
                        source={images.backArrow}
                        style={{
                          height: isPhoneDevice ? 14 : 21,
                          width: isPhoneDevice ? 14 : 21,
                          alignSelf: "center",
                          transform: [
                            { rotate: isOpened ? "90deg" : "-90deg" },
                          ],
                        }}
                        alt={"dropdown"}
                      />
                    </XStack>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <>
                      <XStack
                        p={isPhoneDevice ? "$3" : "$5"}
                        backgroundColor={isSelected ? "#F7418F" : "white"}
                        justifyContent="center"
                        alignItems="center"
                        alignSelf="center"
                      >
                        <SizableText
                          flex={1}
                          fontSize={isPhoneDevice ? "$md" : "$2xl"}
                          lineHeight={isPhoneDevice ? 22 : 34}
                          color={"$black"}
                          fontWeight={"$semibold"}
                          numberOfLines={1}
                          textAlign="center"
                        >
                          {item.name} {/* Display the language name */}
                        </SizableText>
                      </XStack>
                      <YStack h={index === 2 ? 0.5 : 0.5} bg={"black"} />
                    </>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 8,
                }}
              />
            </YStack>
          </XStack>

          <TouchableScale
            onPress={async () => {
              const supported = await Linking.canOpenURL(privacyPolicyURL);
              if (supported) {
                await Linking.openURL(privacyPolicyURL);
              }
            }}
          >
            <XStack alignItems="center" py={isPhoneDevice ? "$4" : "$6"}>
              <Image
                key={"privacyPolicy"}
                source={images.privacyPolicy}
                style={{ height: iconSize, width: iconSize }}
                alt={"privacyPolicy"}
              />
              <YStack w={isPhoneDevice ? "$2" : "$3"} />
              <SizableText
                fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
                lineHeight={isPhoneDevice ? 22 : 34}
                color={"$white"}
                fontWeight={"700"}
              >
                {languageData.privacy_policy}
              </SizableText>
            </XStack>
          </TouchableScale>

          <TouchableScale
            onPress={() => {
              shareMyApp();
            }}
          >
            <XStack alignItems="center" py={isPhoneDevice ? "$4" : "$6"}>
              <Image
                key={"share"}
                source={images.share}
                style={{ height: iconSize, width: iconSize }}
                alt={"share"}
              />
              <YStack w={isPhoneDevice ? "$2" : "$3"} />
              <SizableText
                fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
                lineHeight={isPhoneDevice ? 22 : 34}
                color={"$white"}
                fontWeight={"700"}
              >
                {languageData.share_game}
              </SizableText>
            </XStack>
          </TouchableScale>

          <TouchableScale
            onPress={() => {
              rateMyApp();
            }}
          >
            <XStack alignItems="center" py={isPhoneDevice ? "$4" : "$6"}>
              <Image
                key={"rating"}
                source={images.rating}
                style={{ height: iconSize, width: iconSize }}
                alt={"rating"}
              />
              <YStack w={isPhoneDevice ? "$2" : "$3"} />
              <SizableText
                fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
                lineHeight={isPhoneDevice ? 22 : 34}
                color={"$white"}
                fontWeight={"700"}
              >
                {languageData.rate_us}
              </SizableText>
            </XStack>
          </TouchableScale>

          <TouchableScale
            onPress={() => {
              Linking.openURL(`mailto:${supportEmail}`);
            }}
          >
            <XStack alignItems="center" py={isPhoneDevice ? "$4" : "$6"}>
              <Image
                key={"contactUs"}
                source={images.contactUs}
                style={{ height: iconSize, width: iconSize }}
                alt={"contactUs"}
              />
              <YStack w={isPhoneDevice ? "$2" : "$3"} />
              <SizableText
                fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
                lineHeight={isPhoneDevice ? 22 : 34}
                color={"$white"}
                fontWeight={"700"}
              >
                {languageData.contact_us}
              </SizableText>
              <SizableText
                fontSize={isPhoneDevice ? "$xs" : "$lg"}
                lineHeight={isPhoneDevice ? 18 : 26}
                color={"$white"}
                fontWeight={"$medium"}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {` (${supportEmail})`}
              </SizableText>
            </XStack>
          </TouchableScale>

          <TouchableScale
            onPress={() => {
              router.push("./feedback");
            }}
          >
            <XStack alignItems="center" py={isPhoneDevice ? "$4" : "$6"}>
              <Image
                key={"contactUs"}
                source={images.feedback}
                style={{ height: iconSize, width: iconSize }}
                alt={"contactUs"}
              />
              <YStack w={isPhoneDevice ? "$2" : "$3"} />
              <SizableText
                fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
                lineHeight={isPhoneDevice ? 22 : 34}
                color={"$white"}
                fontWeight={"700"}
              >
                {languageData.send_feedback}
              </SizableText>
            </XStack>
          </TouchableScale>
        </YStack>

        <YStack flex={1} />
        <SizableText
          m={"$4"}
          textAlign="center"
          fontSize={isPhoneDevice ? "$hsm" : "$2xl"}
          lineHeight={isPhoneDevice ? 22 : 34}
          color={"$black"}
          fontWeight={"700"}
        >
          {`Version: ${DeviceInfo.getBuildNumber()} (${DeviceInfo.getVersion()})`}
        </SizableText>
      </ResponsiveContent>
      {global?.showAdsFromFirebase === true && <AdmobBanner />}
      <YStack h={insets.bottom} />
    </YStack>
  );
}

export default SettingsScreen;
