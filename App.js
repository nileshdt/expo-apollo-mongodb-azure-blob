import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import {useState} from 'react';
import  UserItem  from './components/UserItem';
import UserInput  from './components/UserInput';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import MessageInput from './components/MessageInput';
import ImageUploader from './components/ImageUploader';
import ListImages from './components/ListImages';
import getEnvVars from './environment';
const { apolloUrl } = getEnvVars();
console.log(apolloUrl)
export default function App() {
  const client = new ApolloClient({
    uri: apolloUrl ,
    cache: new InMemoryCache(),
  });
  const [users, setUsers] = useState([]);

  // function addUserHandler(enteredUserText) {
  //   setUsers(currentUsers => [...currentUsers,
  //      {
  //       text : enteredUserText,
  //       id: Math.random().toString()
  //     }]);
  // };



  return (
    <ApolloProvider client={client}>
    
    <View style={styles.appContainer}>
      <ImageUploader/>
      <ListImages/> 
    </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex:1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  userContainer:{
    flex:5
  },
 
});
