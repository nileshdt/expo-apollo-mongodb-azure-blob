import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import {useState} from 'react';
import  UserItem  from './components/UserItem';
import UserInput  from './components/UserInput';

export default function App() {

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
    </View>
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
