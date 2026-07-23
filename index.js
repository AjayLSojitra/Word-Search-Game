import "react-native-get-random-values"
import { Buffer } from "buffer";
global.Buffer = Buffer;
import { BackHandler } from "react-native";

// Polyfill for BackHandler.removeEventListener (removed in RN 0.79+)
// react-native-modal still uses the old API
if (BackHandler && !BackHandler.removeEventListener) {
  const handlerToSubscription = new Map();
  const originalAddEventListener = BackHandler.addEventListener.bind(BackHandler);
  
  BackHandler.addEventListener = function (eventName, handler) {
    const subscription = originalAddEventListener(eventName, handler);
    handlerToSubscription.set(handler, subscription);
    return subscription;
  };
  
  BackHandler.removeEventListener = function (eventName, handler) {
    const subscription = handlerToSubscription.get(handler);
    if (subscription) {
      subscription.remove();
      handlerToSubscription.delete(handler);
    }
  };
}

import "reflect-metadata";
import "./app";