import React, { useEffect, useState } from "react";
import { OneSignal } from 'react-native-onesignal';
import Constants from "expo-constants";

function OneSignalProvider(props: {
  children: (checkPassed: boolean, fallback: JSX.Element) => any;
}) {
  const [checkPassed, setCheckPassed] = useState(true);

  useEffect(() => {
    OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);
    setCheckPassed(true)
  }, []);

  return props.children(
    checkPassed,
    <></>
  );
}

export default OneSignalProvider;
