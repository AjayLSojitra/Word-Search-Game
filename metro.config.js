// Learn more https://docs.expo.dev/guides/monorepos
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

// Find the project and workspace directories
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [projectRoot];
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, "node_modules")];
// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = false;

config.resolver.sourceExts = [...config.resolver.sourceExts, "mjs", "cjs"];

config.resolver.resolverMainFields = [
  "sbmodern",
  "react-native",
  "browser",
  "main",
];

config.maxWorkers = 2;

module.exports = config;
