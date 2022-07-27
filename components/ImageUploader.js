import {  gql, useMutation } from '@apollo/client';
import { View, ActivityIndicator, TextInput, Text, Image, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';
import FormData from 'form-data';
import uuidv1 from 'uuid';
import getEnvVars from '../environment';
const { azureBlobUrl } = getEnvVars();

const CREATE_MESSAGES = gql`
mutation CreateMessage($messageInput: MessageInput) {
  createMessage(messageInput: $messageInput) {
    text
    name
    fileName
    createdAt
    createdBy
  }
}
`;

function generateRNFile(uri, name) {
    return uri ? new ReactNativeFile({
      uri,
      type: mime.lookup(uri) || 'image',
      name,
    }) : null;
  }
  
function ImageUploader(){
    const [image, setImage] = useState(null);
    const [val, setVal] = useState(null);
    const [singleFile, setSingleFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(null);
    const [url, setUrl] = useState(null);
    const [enteredMessageText, setEnteredMessageText] = useState('');
    const [enteredNameText, setEnteredNameText] = useState('');
    const [enteredTypeText, setEnteredTypeText] = useState('');

    const [createMessage, { data,  error }] = useMutation(CREATE_MESSAGES, {
      variables: {
        messageInput: {
          name: "",
          type: "",
          text: "placeholer1",
          fileName: "",
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
      createMessage({
        variables: {
          messageInput: {
            name: enteredNameText,
            type: enteredTypeText,
            text:  enteredMessageText,
            fileName: fileName,
            username: "nilesh thin"
  
          }
        },
      }).then((res)=>{
        console.log(res)
      }).catch((err) => {
        console.error(err);
      });
      // setMessages(currentMessages => [...currentMessages,
      //   {
      //    text : enteredMessageText,
      //    id: Math.random().toString()
      //  }]);
      setEnteredMessageText(null);
      setEnteredNameText(null);
      setEnteredTypeText(null);
      setImage(null);
      setFileName(null)
    }
    async function pickImage () {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          allowsMultipleSelection: false,
          aspect: [4, 3],
          quality: 1,
        }).then((response) => {
          if (response.type == "image") {
            let { name, size, uri } = response;
           setImage(uri);
            // >>>>>>>>>>>>> the bug's solution <<<<<<<<<<<<<<<
            if (Platform.OS === "android" && uri[0] === "/") {
              uri = `file://${uri}`;
              uri = uri.replace(/%/g, "%25");
            }
            let nameParts =  uri.split(".");
            let fileType =  nameParts[nameParts.length - 1];
            name = "safetyApp" + uuidv1() + '.'+ fileType;
            setFileName(name);
            setSingleFile({
              name: name,
              size: size,
              uri: uri,
              type: "image/" + fileType,
            });
          } else {
            setSingleFile(null);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    
      };


      async function onUploadPress() {
        status && setStatus(null);
        const file = generateRNFile(image, `picture-${Date.now()}`);
        try {
          console.log(azureBlobUrl)
          const xhr = new XMLHttpRequest();
            xhr.open('POST', azureBlobUrl);
            xhr.onload = () => {
              const response = JSON.parse(xhr.response);
              addMessageHandler();
            };
            xhr.onerror = e => {
              console.log(e, 'upload failed');
            };
            xhr.ontimeout = e => {
              console.log(e, 'upload timeout');
            };
            const formData = new FormData();
            console.log(singleFile)
        
            formData.append("file", singleFile);
            xhr.setRequestHeader("Content-Type","multipart/form-data");
            xhr.send(formData,true);
        
            if (xhr.upload) {
              xhr.upload.onprogress = ({ total, loaded }) => {
                const uploadProgress = (loaded / total);
                console.log(uploadProgress);
              };
            }
        
          setStatus('Uploaded')
        } catch (e) {
          setStatus('Error')
        }
      }
      return (
        
        <View style={styles.container}>
              
          <Button title="Pick an image" onPress={pickImage}/>
          {image && 
          <TextInput style={styles.msgtextInput} 
                      placeholder="name" 
                      onChangeText={nameInputHandler}
                      value={enteredNameText}/> }
          { image && <TextInput style={styles.msgtextInput} 
                      placeholder="type" 
                      onChangeText={typeInputHandler}
                      value={enteredTypeText}/>}
          { image && <TextInput style={styles.msgtextInput} 
                      placeholder="message" 
                      onChangeText={messageInputHandler}
                      value={enteredMessageText}/> }
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          {image && <Button title={ loading ? "Uploading" : "Upload"} 
            onPress={onUploadPress} disabled={loading}/>}
          {
            loading && (
              <ActivityIndicator size="small" style={styles.loading}/>
            )
          }
          <Text style={{ color: status === 'Uploaded' ? 'green' : 'red'}}>{status}</Text>
          {
          }

        </View>
      );      
}
export default ImageUploader;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    msgtextInput:{
      borderColor: '#cccccc',
      borderWidth: 2,
      padding: 10,
      width: '80%',
      margin: 5

    },
    loading: {
      margin: 16,
    }
  });