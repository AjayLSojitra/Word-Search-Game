Word Search Game

Initial project setup

Error when build iOS: "Cocoapods is not available, make sure it's installed and in your PATH" Run command in Terminal : npx react-native init HelloRN

For SDK Add path in: open /.zshrc for iOS/Android(MacOS) export GEM_HOME=/.gems export PATH="$HOME/.gems/bin:$PATH" export PATH="$HOME/.fastlane/bin:$PATH" export ANDROID_HOME=$HOME/Library/Android/sdk export PATH="/usr/local/bin:$PATH"

For SDK (Ubuntu): export ANDROID_HOME=$HOME/Android/Sdk export PATH=$PATH:$ANDROID_HOME/emulator export PATH=$PATH:$ANDROID_HOME/platform-tools

Github (For clone my repo in other machines): Example: git clone https://AjayLSojitra:GithubAccessToken@github.com/AjayLSojitra/verb-forms-chinese.git

Add in app.json in expo-build-properties //https://docs.expo.dev/versions/latest/sdk/build-properties/ "ios": { "deploymentTarget": "14.0" }

Set SDK Path For Android "production": { "env": { "APP_VARIANT": "production", "ANDROID_SDK_ROOT": "/Users/drunkenducks/Library/Android/sdk" } }

// Basic commands

    npm start --reset-cache
    npx npm-check-updates -u

To configure the default Java version, use the following command: sudo update-alternatives --config java sudo nano $HOME/.bashrc

https://itsfoss.com/set-java-home-ubuntu/ https://vitux.com/how-to-setup-java_home-path-in-ubuntu/

For check about package update: npx npm-check-updates -u eas credentials vi ~/.bashrc

first start your expo app (-c for clear cache) npx expo start -c then press s (for switch to expo go)

now you can press a (for run android emulator) alternative:

you can use --go for start with expo go npx expo start --go

iOS

    GoogleService-Info.beta.plist
    GoogleService-Info.dev.plist
    GoogleService-Info.prod.plist
    GoogleService-Info.storybook.plist
    GoogleService-Info.test.plist

Android

    google-services.beta.json
    google-services.dev.json
    google-services.prod.json
    google-services.storybook.json
    google-services.test.json

import { LogBox } from 'react-native'; LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message LogBox.ignoreAllLogs();//Ignore all log notifications

Expo

    npm install --global eas-cli && eas init --id fa07782f-fbe0-44fc-b31c-c9246cd248f7

    For Adsense Image compaign
        Landscape (1.91:1): 1200 × 628 (min required: 600 × 314, max file size: 5120KB)
        Square: 1200 × 1200 (min required: 200 × 200, max file size: 5120KB)
        Portrait: 1200 × 1500 (min required: 320 × 400, max file size: 5120KB)

For Anonymous firebase authentication follow below steps:

  ✔  Enabled Anonymous provider in Authentication section.
  ✔  Firebase rules will be: allow read, write: if request.auth.uid != null;

Onesignal:

    Key ID: J66963JNRV

iOS assets related

    https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications
    https://developer.apple.com/help/app-store-connect/reference/app-preview-specifications
    Replace Audio from Video: https://www.onlineconverter.com/add-audio-to-video
    Change FPS: https://videobolt.net/simple-video-tools/fps
    Resize video: https://www.adobe.com/in/express/feature/video/resize
    Youtube video size for standard upload - 1920-1080

For screenshot resize:

    https://imageresizer.com/

For make image portion blur:

    https://www.canva.com/features/photo-blur/

For mockup creation:

    image: device=83% iPad/Tablet=70%
    subtitle bottom: device=7 iPad/Tablet=7
    title top: device=10 iPad/Tablet=10
    https://studio.app-mockup.com/

For get previous screen name:

    const navigation = useNavigation(); useEffect(() => { const unsubscribe = navigation.addListener('focus', () => { //Do something when this screen is resumed! const routes = navigation.getState()?.routes; const prevRoute = routes[routes.length - 2]; console.log("prevRoute: ", prevRoute) });

    return unsubscribe; }, [navigation]);

For Firestore: https://docs.expo.dev/guides/using-firebase/ https://firebase.google.com/docs/firestore/quickstart https://stackoverflow.com/questions/59944658/which-react-hook-to-use-with-firestore-onsnapshot

Firebase Appcheck: debug-token: EDCD9028-CA44-4E4E-8AD1-B077F81B6706

To make data entries to direct firestore DB. useEffect(() => { addVerbExamples(); }, []);

//For Firestore const firebaseConfig = AppManifest.extra.firebaseWeb; const app = initializeApp(firebaseConfig); const db = getFirestore(app);

const addVerbExamples = async () => { const verbExamplesJson = contents.prepositions; for (let v = 0; v < verbExamplesJson.length; v++) { const item = verbExamplesJson[v]; await addDoc(collection(db, "prepositions"), { description: item?.description ?? "", example: item?.example ?? "", slug: item?.slug ?? "", title: item?.title ?? "", }); } };

To make build: Local for test without server:

    eas build --profile beta --platform android --local Production build(.aab)

    eas build --platform android

    Command for submit to EAS after production build got created: eas submit --platform ios

    TODO items for this project:

    TODO: Need before publish app:
        Replace production mode with development for Onesignal in app.json file.
        Change the version number according to previous version platform wise in App.json and package.json. For android change versionCode also.

    Current Versions Details:
        Android: 2.0.0
        Android versionCode: 2
        iOS: 2.0.0

    In Future (Second Phase):
        Enable code tampering.
        Enable Security check.

    Common things we need for any app.
      ✔  App name.
      ✔  Package name.
        Firebase integration.
        Admob integration.
        Onesignal integration.
        Privacy Policy.
        App description.
        After app live, change the hashkey.
        Create a app video in iOS and upload in iOS.
      ✔  Enable Anonymous firebase authentication from Authentication section.
      ✔  Firebase rules will be: allow read, write: if request.auth.uid != null;
        Assets
            App icon
            Launcher Icon
            Adaptive Icon
            Android Banner
            Campaign Banner
            Screenshots
            App Video (Youtube)

    After Upload actions
        In Android add new SHA-1 and SHA-256 key in firebase
        Custom store listing configuration for marketing purpose.

    Need to change for iOS build only:
        In package.json:
            Replace "firebase": "^10.9.0" with "firebase": "^9.15.0"
            Replace "@react-native-firebase/app": "^19.0.1" with "@react-native-firebase/app": "^16.5.0"
            Remove @expo/config-plugins using "npm uninstall @expo/config-plugins" command
            Rename app.config.js file with app.config.ts

    ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ MOST IMPORTANT ☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
        If firebase quota exceeded for auth, then disable anonymus signin and remove restriction on firestore database to required auth and update new rule as below:
        allow read, write: if true;

    App create and upload steps for both the platforms:

        Android:
            Command: eas build --platform android
            Steps:
                Open Google Play Console and click on Create App CTA and it will automatically redirected to App details.
                Fill the App details and it will automatically redirected to Main store listing.
                In Main store listing fill all the details.
                Then Go to dashboard and follow the next steps.

App ID Prefix 7369W8W466 (Team ID)

Apple ID 6740090791

    iOS
        Steps Create new app on app store:
            Go to Apple Developer account.
            Got to Account Section.
            Select Indentifiers in Certificates, IDs and Profile(Middle option).
            You will see + icon besides Indentifiers, click on it.
            You will redirect to Register a new Identifier.
            Now select App Ids and click on Continue CTA that is located Top right corner.
            It will redirect you to Register a new Identifier, now select App there and press on continue.
            It will redirect you to Register an App Id, where you need to insert Bundle ID in Explict option selected.
            Select Capabilities, like we are using onesignal, so select Push Notifications checkbox.
            Now Press on continue and it will create indentifires for your app.
            Now go to App Store Connect.
            Click on + button beside of Apps(Top left corner) and it will open New App popup.
            Select Platform as iOS.
            Enter App name.
            Choose primary language as English US.
            Select Bundle id.
            In User Access Select Full Access Radio.
            Now Press on Create CTA and your app will be created.
            Now go to app and fill all the details like description and screenshots.
            Now go to App Privacy from left menu.
            Add Privacy policy URL.
            Select Data Types, like Location with Coarse Location, Indentifiers with Device ID, Usage data with Product Interaction and Advertising Data, Diagnostics with Performance Data and Crash-data.

    Go to app store connect and go to Distribution.

    Check for + icon beside of iOS App on top left corner. It will show + icon only your previous build is Ready for Sale and you havent added new version or this your first time for this app.

    if + icon is present there, press it and it will ask for build number, where you need to enter new build number like, previous was 1.0.0 then you need to insert 2.0.0.

    if + is not present there, that means you have already added new build number.

    Now in your project(App.json and package.json) you need to add version number according to it only
        Command: eas build --platform ios
        After run this command follow below steps to create certificates and build:
            In VS code it will prompt for apple developer login details: Like "Do you want to Login in to your apple account?", Where you need to Press Y.
            It will ask your Apple ID, where you need to insert your Apple ID and press Enter.
            Now it will ask for Password, after inserting password press Enter.
            Now it will ask for generate certificate, press Y.
            Now it will ask for Device, where you can insert your device UDID for testing purpose development build from TestFlight.
            Now it will ask for Provisional prifile, press Y.
            If already present then it will ask for reuse original profile press Y.
            Now it will ask for push notification keys, press Y.
            Now it will generate and provide ipa file link, where you can press on that link and download ipa file.
        Steps:
            Now open Transporter software(Build by Apple developer) and login with Apple ID.
            Now press on Add App CTA and select or upload your ipa file.
            Once confirm by transformer clink on Deliver CTA.
            After Deliver check after around 10-15 minutes, if app has any error Transporter will show the error.
            If approved and delivered by Transporter then go to App store connect.
            In App store connect, go to Test Flight, wehere you will see your app as in processing mode.
            After processing done, it will show Manage CTA, now click on it and it will show confirmation popup for you app is not doing any violation and select none.
            Now go to Distribution and it will show + icon beside Build(for this you need scroll to down bit) and click on it and it will show you all the build list.
            Select latest build from it.
            On top right corner you will see the Save CTA and Submit for review CTA.
            First click on Save and then click on Submit for review.
            Now your build will be in review, now wait for app to publish.

    While start new project with copy and paste old one:
    ✔ Change the static ads ids, helpers.ts and on firebase
    ✔ Package name and bundle ids in app.json.
    ✔ Replace App name from whole project.
    - Craete Adaptive icon, favicons, icon, splash, app icon if present in images folder of Assets.
    ✔ Firebase Database creation
    - Remove unneccesary Assets.
    - Replace android_app_id and ios_app_id under react-native-google-mobile-ads in app.json.
    ✔ Expo: Project id, slug, name, owner in app.json
    - Replace oneSignalAppId in app.json
    ✔ Replace name in package.json
    ✔ Replace All google services json and GoogleService-info.plist files under firebase-config folder.
    - Remove Credentials folder.
    - Replace Share App Message.
    - Replace the ascAppId in eas.json file.
    - Enable Firebase Appcheck.
    - Enable Firebase Analytics.
    - Enable Firebase Crashlytics.
    ✔ Enable Anonymous firebase authentication from Authentication section.
    ✔ Firebase rules will be: allow read, write: if request.auth.uid != null;
    - Store all the accounts details in Google Drive.
    - Change the Primary and Primary secondary color codes.
    - Update url in expo -> updates -> url. In app.json file.
