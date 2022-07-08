import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import {useState} from 'react';
import  UserItem  from './components/UserItem';
import UserInput  from './components/UserInput';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import DisplayMessages from './components/DisplayMessages';

export default function App() {
  const client = new ApolloClient({
    uri: 'http://192.168.0.20:5000/graphql',
    cache: new InMemoryCache(),
  });
  // const client = ...
console.log('client');
client
.query({
  query: gql`
    query messages {
      messages {
        _id
        text
        createdAt
        createdBy
      }
    }
  `,
})
.then((result) => console.log(result));
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
      <UserInput onAddUser={addUserHandler}/>

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
      </View>
      <View>
        <DisplayMessages/>
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
