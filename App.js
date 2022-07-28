import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import {useState} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import ImageUploader from './components/ImageUploader';
import ListImages from './components/ListImages';
import getEnvVars from './environment';
const { apolloUrl } = getEnvVars();

const GET_MESSAGES = gql`
query  messages {
  messages {
    id
    name
    type
    text
    fileName
    address
    createdAt
    createdBy
  }
}
`;

console.log(apolloUrl)
export default function App() {
  const client = new ApolloClient({
    uri: apolloUrl ,
    cache: new InMemoryCache(),
  });
  const [images, SetImages] = useState([]);

    // SetImages(currentImages => [...currentImages,
    //   data.messages.map(({  id, name, type, text, filename, createdAt, createdBy }) => (
    //     {
    //     text : enteredUserText,
    //     id: Math.random().toString()
    //     }))
    //   ])

 

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
