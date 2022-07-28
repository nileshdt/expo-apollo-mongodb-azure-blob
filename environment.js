/*****************************
* environment.js
* path: '/environment.js' (root of your project)
******************************/

import Constants from "expo-constants";
import { Platform } from "react-native";

const localhost =
 Platform.OS === "ios" ? "localhost:8080" : "10.0.2.2:8080";

const ENV = {
 dev: {
   apiUrl: localhost,
   apolloUrl: "http://192.168.4.53:5000/graphql",
   azureBlobUrl: "http://192.168.4.53:7001/blobupload",
   amplitudeApiKey: null,
 },
 staging: {
   apiUrl: "[your.staging.api.here]",
   apolloUrl: "",
   azureBlobUrl: "",
   amplitudeApiKey: "[Enter your key here]",
   // Add other keys you want here
 },
 prod: {
   apiUrl: "[your.production.api.here]",
   apolloUrl: "",
   azureBlobUrl: "",
   amplitudeApiKey: "[Enter your key here]",
   // Add other keys you want here
 }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
 // What is __DEV__ ?
 // This variable is set to true when react-native is running in Dev mode.
 // __DEV__ is true when run locally, but false when published.
 if (__DEV__) {
   return ENV.dev;
 } else if (env === 'staging') {
   return ENV.staging;
 } else if (env === 'prod') {
   return ENV.prod;
 }
};

export default getEnvVars;