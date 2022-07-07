import { View, TextInput, StyleSheet, Button} from 'react-native';
import { useState } from 'react';

function UserInput(props){
    const [enteredUserText, setEnteredUserText] = useState('');

    function userInputHandler(text){
        setEnteredUserText(text);
      };
      function addUserHandler(){
        props.onAddUser(enteredUserText);
        setEnteredUserText('');
      }
return (
    <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} 
        placeholder="firstname lastname" 
        onChangeText={userInputHandler}
        value={enteredUserText}/>
        <Button title="Add User" onPress={addUserHandler}/>
    </View>
);
}

export default UserInput;

const styles = StyleSheet.create ({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccccc'
      },
      textInput:{
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '80%',
        marginRight: 8,
        padding: 8
      },
})