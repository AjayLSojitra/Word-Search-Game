import React, { useEffect, useState } from "react";
import mobileAds from 'react-native-google-mobile-ads';

function AdmobProvider(props: {
  children: (checkPassed: boolean, fallback: JSX.Element) => any;
}) {
  const [checkPassed, setCheckPassed] = useState(true);

  useEffect(() => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        setCheckPassed(true)
      }).catch(error => setCheckPassed(true));
    ;
  }, []);

  return props.children(
    checkPassed,
    <></>
  );
}

export default AdmobProvider;
