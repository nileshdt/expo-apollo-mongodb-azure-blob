# expo-apollo-mongodb-azure-blob
A basic implementation to set up expo with apollo server with GraphQL, connect it to MongoDB Atlas and upload file to azure blob.


```sh
git clone https://github.com/nileshdt/expo-apollo-mongodb-azure-blob.git

cd expo-apollo-mongodb-azure-blob/api
```
Then update the file .env with azure storage values
```sh
npm install 
node server.js
```
you should see Server is listening on port 7001

Open a new terminal 
```sh
cd expo-apollo-mongodb-azure-blob/apollo
```
Then update the file .env with the mongodb values
```sh
npm install
nodemon index.js
```
You should see the following:\n
MongoDB Connected
Server running at http://localhost:5000/

Start the expo app, Make sure Andriod emultor is running.
```sh
cd expo-apollo-mongodb-azure-blob
npm install
yarn android
```

