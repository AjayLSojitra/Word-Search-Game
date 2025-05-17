module.exports = {
  name: "WordSpark",
  scheme: "wordsearchgame",
  icon: "./assets/icon.png",
  web: { favicon: "./assets/favicon.png" },
  extra: {
    firebaseWeb: {
      apiKey: "AIzaSyDBAVR-yx2FH7LMy81gD3nB2KRluXU5qVU",
      authDomain: "word-search-game-app.firebaseapp.com",
      projectId: "word-search-game-app",
      storageBucket: "word-search-game-app.firebasestorage.app",
      messagingSenderId: "230055028122",
      appId: "1:230055028122:web:1ba520e120367db1e9c623",
    },
  },
  android: {
    googleServicesFile: "./firebase-configs/google-services.dev.json",
    package: "com.shreeramkrishna.wordsearch.spelling.checker",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#FFFFFF",
    },
  },
  ios: {
    googleServicesFile: "./firebase-configs/GoogleService-Info.dev.plist",
    bundleIdentifier: "com.shreeramkrishna.wordsearch.spelling.checker",
  },
};
