module.exports = {
  name: "Verbal Fluency Game",
  scheme: "verbalfluencygame",
  icon: "./assets/icon.test.png",
  web: { favicon: "./assets/favicon.test.png" },
  extra: {
    firebaseWeb: {
      apiKey: "AIzaSyBpY9njtdoDwSCmQRSgY89t036eCh1_i4w",
      authDomain: "verbal-fluency-game.firebaseapp.com",
      databaseURL: "https://verbal-fluency-game-default-rtdb.firebaseio.com",
      projectId: "verbal-fluency-game",
      storageBucket: "verbal-fluency-game.appspot.com",
      messagingSenderId: "605935087397",
      appId: "1:605935087397:web:bbaa1748586922b16bf4cc",
      measurementId: "G-0Q6J6D18WY",
    },
  },
  android: {
    googleServicesFile: "./firebase-configs/google-services.dev.json",
    package: "com.shreeramkrishna.wordsearch.spelling.checker",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.test.png",
      backgroundColor: "#FFFFFF",
    },
  },
  ios: {
    googleServicesFile: "./firebase-configs/GoogleService-Info.dev.plist",
    bundleIdentifier: "com.shreeramkrishna.wordsearch.spelling.checker",
  },
};
