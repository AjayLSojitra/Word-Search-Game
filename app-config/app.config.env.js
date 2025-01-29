const config = {
  extra: {}
};

const AppVersionKey = `APP_VERSION`
const BuildNumberKey = `APP_BUILD_NUMBER`
const MajorKey = `APP_VERSION_MAJOR`
const MinorKey = `APP_VERSION_MINOR`

if (process.env[AppVersionKey]) {
  config.version = process.env[AppVersionKey];
}

if (process.env[BuildNumberKey]) {
  const buildNumber = process.env[BuildNumberKey];
  config.ios = {
    buildNumber: buildNumber
  };
  config.android = {
    versionCode: parseInt(buildNumber)
  };
}

if (process.env[MajorKey] && process.env[MinorKey]) {
  config.runtimeVersion = `${process.env[MajorKey]}.${process.env[MinorKey]}`;
}

config.extra.appVariant = process.env.APP_VARIANT;

module.exports = config;
