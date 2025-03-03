import { useEffect } from "react";
import { DeviceEventEmitter } from "react-native";

// Define event types
export type EVENT_TYPE = "languageSelection" | "CategoriesDataAdded";

// Trigger event function
export const triggerEvent = (type: EVENT_TYPE, data?: any) => {
  DeviceEventEmitter.emit(type, data);
};

// Custom hook to listen for events
function useTriggeredEvent(
  type: EVENT_TYPE,
  listener: (data?: any) => Promise<void> | void,
  dependencies?: any[]
) {
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(type, (data) => {
      listener(data);
    });

    return () => {
      subscription?.remove();
    };
  }, [type, ...(dependencies ?? [])]);
}

export default useTriggeredEvent;
