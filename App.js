import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import {useState} from 'react';
import  UserItem  from './components/UserItem';
import UserInput  from './components/UserInput';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import DisplayMessages from './components/DisplayMessages';
import MessageInput from './components/MessageInput';
import ImageUploader from './components/ImageUploader';
//'http://192.168.0.20:5000/graphql',
export default function App() {
  const client = new ApolloClient({
    uri: `${process.env.GRAPHQL_URI}` ,
    cache: new InMemoryCache(),
  });
  const [users, setUsers] = useState([]);

  function addUserHandler(enteredUserText) {
    console.log(enteredUserText);
    setUsers(currentUsers => [...currentUsers,
       {
        text : enteredUserText,
        id: Math.random().toString()
      }]);
  };



  return (
    <ApolloProvider client={client}>
    
    <View style={styles.appContainer}>
      {/* <UserInput onAddUser={addUserHandler}/>

      <View style={styles.userContainer}>
      <FlatList data={users} renderItem={(itemData) => {
        return  <UserItem text={itemData.item.text}/> ;
      }} 

      keyExtractor = {(item, index) => {
        return item.id;
      }

      }
      alwaysBounceVertical={false}>
      </FlatList>
      </View> */}
      <View>
        <MessageInput /> 
        <DisplayMessages/> 
        <ImageUploader/>
      </View>
      
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
