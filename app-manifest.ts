import Constants from "expo-constants";

interface ExpoAppManifestExtra {
  readonly firebaseWeb: any;
  readonly auth: {
    readonly google: {
      webClientId: string;
    };
  };
  readonly appVariant: string;
}

export class AppManifest {
  static get extra(): ExpoAppManifestExtra {
    const extra = Constants.expoConfig?.extra;
    if (!extra) {
      const err = new Error(
        "unable to load extra. please check the configuration and try again"
      );
      console.error(err);
      throw err;
    }

    return {
      ...extra,
    } as any;
  }
}
