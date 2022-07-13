import {  gql, useMutation } from '@apollo/client';
import { View, ActivityIndicator, Text, Image, StyleSheet, Button} from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';

function generateRNFile(uri, name) {
    return uri ? new ReactNativeFile({
      uri,
      type: mime.lookup(uri) || 'image',
      name,
    }) : null;
  }
  
  const UPLOAD_IMAGE = gql`
    mutation uploadImage($image: Upload) {
      uploadImage(image: $image)
    }
  `;
function ImageUploader(){
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(null);
    const [uploadImage, { data, loading }] = useMutation(UPLOAD_IMAGE);
  
    async function pickImage () {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          allowsMultipleSelection: false,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };
    
      async function onUploadPress() {
        status && setStatus(null);
        const file = generateRNFile(image, `picture-${Date.now()}`);
        try {
          await uploadImage({
            variables: { image: file },
          });
          setStatus('Uploaded')
        } catch (e) {
          setStatus('Error')
        }
      }
      return (
        
        <View style={styles.container}>
            
          <Button title="Pick an image from camera roll" onPress={pickImage}/>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          {image && <Button title={ loading ? "Uploading" : "Upload"} onPress={onUploadPress} disabled={loading}/>}
          {
            loading && (
              <ActivityIndicator size="small" style={styles.loading}/>
            )
          }
          <Text style={{ color: status === 'Uploaded' ? 'green' : 'red'}}>{status}</Text>
          {
            status === 'Uploaded' && (
              <Text>URL: {data.uploadImage}</Text>
            )
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
    loading: {
      margin: 16,
    }
  });