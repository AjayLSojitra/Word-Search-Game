import prodConfig from "./app-config/app.config.prod";
import betaConfig from "./app-config/app.config.beta";
import devConfig from "./app-config/app.config.dev";
import envConfig from "./app-config/app.config.env";
import merge from "deepmerge";

// config is loaded from app.json
export default ({ config }) => {
  const appVariant = process.env.APP_VARIANT;

  return merge.all([
    config,
    (() => {
      switch (appVariant) {
        case "production":
          return prodConfig;
        case "beta":
          return betaConfig;
        case "development":
        default:
          return devConfig;
      }
    })(),
    envConfig,
  ])
};
