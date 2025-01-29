import AsyncStorage from "@react-native-async-storage/async-storage";
import { CallbackWithResult } from "@react-native-async-storage/async-storage/lib/typescript/types";

type StorageKeyPrefixData = {
  userId?: string;
};

class LocalStorage {
  static generateStorageKey = (
    storageKeyPrefixData: StorageKeyPrefixData,
    key: string
  ) => {
    if (storageKeyPrefixData?.userId && key) {
      return [storageKeyPrefixData?.userId, key]
        .filter((value) => value)
        .join("-");
    }
    return "";
  };

  static getItem = (
    storageKeyPrefixData: StorageKeyPrefixData,
    key: string,
    callback?: CallbackWithResult<string>
  ) => {
    const storageKey = this.generateStorageKey(storageKeyPrefixData, key);
    if (storageKey) {
      return AsyncStorage.getItem(storageKey, callback);
    } else {
      return null;
    }
  };

  static setItem = (
    storageKeyPrefixData: StorageKeyPrefixData,
    key: string,
    value: string,
    callback?: CallbackWithResult<string>
  ) => {
    const storageKey = this.generateStorageKey(storageKeyPrefixData, key);
    if (storageKey) {
      return AsyncStorage.setItem(storageKey, value, callback);
    } else {
      throw Error("Please ensure keys are valid");
    }
  };

  static removeItem = (
    storageKeyPrefixData: StorageKeyPrefixData,
    key: string
  ) => {
    const storageKey = this.generateStorageKey(storageKeyPrefixData, key);
    if (storageKey) {
      return AsyncStorage.removeItem(storageKey);
    } else {
      throw Error("Please ensure keys are valid");
    }
  };

  static getItemDefault = AsyncStorage.getItem;
  static setItemDefault = AsyncStorage.setItem;
  static removeItemDefault = AsyncStorage.removeItem;
}

export default LocalStorage;
