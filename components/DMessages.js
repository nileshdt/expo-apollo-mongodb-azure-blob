import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import {Image, FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { get_images, get_images_url } from '../services/apiClient';

import { useState } from 'react';

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

function DMessages() {
    const [test, setTest] = useState();
 
     const { loading, error, data } = useQuery(GET_MESSAGES);
     console.log("d msg");

    //  if (data) return <Text>error...</Text>;
     if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error :{error}</Text>;
    // return data.messages.map(({  id, name, type, text, createdAt, createdBy }) => (
    //             <Text key={id}>{name + " " + type +" " +text}</Text>
    // ));
    console.log(data.messages);
    
  return (
    <SafeAreaView style={ {flex: 1}} >
      <View style={{height: 100, justifyContent: 'center', alignItems: 'center'}} >
        <Text style={{fontSize: 20}}>Gallery</Text>
      </View> 
      <View style={{ flex: 1}}>
        <FlatList 
        data={data.messages}
        numColumns= {3}
        keyExtractor={(_, index) => index}
        initialNumToRender={data.messages.length}
        renderItem={({ item, _ }) => {
          return( 
            <Image 
              style={{height:100, width:100,
               borderRadius:4, margin:5, borderBottomWidth:2
              }}
              source={{uri: get_images_url(item.fileName)}}
            />
          )
        }}
        />
      </View> 
    </SafeAreaView>)
    
  }
export default DMessages;