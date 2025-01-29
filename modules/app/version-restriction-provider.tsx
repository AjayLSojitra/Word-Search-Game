import React, { useEffect, useState } from "react";
import * as Application from "expo-application";
import { Linking, Platform } from "react-native";
import AppUpdaterPlaceholder from "./app-updater-placeholder";
import DeviceInfo from "react-native-device-info";
import { appStoreLink } from "@modules/shared/components/helpers";

function VersionRestrictionProvider(props: {
  children: (checkPassed: boolean, fallback: JSX.Element) => any;
}) {
  const [checkPassed, setCheckPassed] = useState(true);
  const version = parseInt(
    (Application.nativeApplicationVersion ?? "0").replaceAll(".", "")
  );
  const versionRestrictionFeatureFlag = true;
  const packageName = DeviceInfo.getBundleId()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCheckPassed(versionRestrictionFeatureFlag);
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
  }, [versionRestrictionFeatureFlag, version]);

  return props.children(
    Platform.OS !== "web" ? checkPassed : true,
    <AppUpdaterPlaceholder
      title={"Update to continue"}
      description="We have launched new features and fixes based on your feedback to make the experience better."
      onPress={() => {
        if (Platform.OS === "ios") {
          const link = appStoreLink;
          Linking.canOpenURL(link).then((supported) => {
            supported && Linking.openURL(link);
          });
        } else if (Platform.OS === "android") {
          const link =
            `https://play.google.com/store/apps/details?id=${packageName}`;
          Linking.canOpenURL(link).then((supported) => {
            supported && Linking.openURL(link);
          });
        }
      }}
    />
  );
}

export default VersionRestrictionProvider;
