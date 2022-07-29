# expo-apollo-mongodb-azure-blob
A basic implementation to set up expo with apollo server with GraphQL, connect it to MongoDB Atlas and upload file to azure blob.


```sh
git clone https://github.com/nileshdt/expo-apollo-mongodb-azure-blob.git

cd expo-apollo-mongodb-azure-blob/api
```
Then create and update the file .env with azure storage values
```sh
AZURE_STORAGE_CONNECTION_STRING=
AZURE_ACCOUNT=
AZURE_CONTAINER=
AZURE_SAS=
``` 
Run the following commands

```sh
npm install 
node server.js
```              
you should see Server is listening on port 7001

Open a new terminal 
```sh
cd expo-apollo-mongodb-azure-blob/apollo
```
Then create and update the file .env with the mongodb values
```sh
MONGO_USER=
MONGO_PASSWORD=
MONGO_DB=
``` 
Run the following commands

```sh
npm install
nodemon index.js
```
You should see the following:\n
MongoDB Connected
Server running at http://localhost:5000/


Start the expo app, Make sure Andriod emulator is running.
```sh
cd expo-apollo-mongodb-azure-blob
```
Add enviornment.js
```sh
cd expo-apollo-mongodb-azure-blob
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
   apolloUrl: "http://<your-ip>:5000/graphql",
   azureBlobUrl: "http://<your-ip>:7001/blobupload",
   amplitudeApiKey: null,
 },
 staging: {
   apiUrl: "[your.staging.api.here]",
   apolloUrl: "",
   azureBlobUrl: "",
   // Add other keys you want here
 },
 prod: {
   apiUrl: "[your.production.api.here]",
   apolloUrl: "",
   azureBlobUrl: "",
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
```
Run following commands
```sh
npm install
yarn android
```

