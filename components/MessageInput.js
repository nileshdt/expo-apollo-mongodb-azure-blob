import { View, TextInput, StyleSheet, Button} from 'react-native';
import { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, useMutation } from '@apollo/client';

const CREATE_MESSAGES = gql`
mutation CreateMessage($messageInput: MessageInput) {
  createMessage(messageInput: $messageInput) {
    text
    createdAt
    createdBy
  }
}
`;
function MessageInput(props){
    const [enteredMessageText, setEnteredMessageText] = useState('');
    const [enteredNameText, setEnteredNameText] = useState('');
    const [enteredTypeText, setEnteredTypeText] = useState('');

    const [createMessage, { data, loading, error }] = useMutation(CREATE_MESSAGES, {
      variables: {
        messageInput: {
          name: "",
          type: "",
          text: "placeholer",
          username: "testnil"

        }
      },
    });
    function messageInputHandler(text){
        setEnteredMessageText(text);
      };
      function nameInputHandler(text){
        setEnteredNameText(text);
      };
      function typeInputHandler(text){
        setEnteredTypeText(text);
      };
      function addMessageHandler(){
        //props.onAddMessage(enteredMessageText);
        console.log(enteredNameText + enteredMessageText );
        createMessage({
          variables: {
            messageInput: {
              name: enteredNameText,
              type: enteredTypeText,
              text:  enteredMessageText,
            username: "nilesh thin"
    
            }
          },
        });
        //if (loading) return <Text>Loading...</Text>;
        //if (error) return <Text>Error :{error}</Text>;
       
        console.log("1"+ enteredMessageText );

        // setMessages(currentMessages => [...currentMessages,
        //   {
        //    text : enteredMessageText,
        //    id: Math.random().toString()
        //  }]);
        setEnteredMessageText('');
      console.log('message submit');
      }
return (
    <View style={styles.inputContainer}>
      <TextInput style={styles.msgtextInput} 
        placeholder="name" 
        onChangeText={nameInputHandler}
        value={enteredNameText}/>
        <TextInput style={styles.msgtextInput} 
        placeholder="type" 
        onChangeText={typeInputHandler}
        value={enteredTypeText}/>
        <TextInput style={styles.msgtextInput} 
        placeholder="message" 
        onChangeText={messageInputHandler}
        value={enteredMessageText}/>
        
        <Button title="Submit" onPress={addMessageHandler}/>
    </View>
);
}

export default MessageInput;

const styles = StyleSheet.create ({
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccccc'
      },
      msgtextInput:{
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '80%',
        marginRight: 2,
        padding: 8
      },
})