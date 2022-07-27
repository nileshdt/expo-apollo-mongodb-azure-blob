import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import {View, Text} from 'react-native';

import { useState } from 'react';

  const GET_MESSAGES = gql`
  query  messages {
    messages {
      id
      name
      type
      text
      createdAt
      createdBy
    }
  }
`;

function DisplayMessages() {
   const [messages, setMessages] = useState([]);

    const { loading, error, data } = useQuery(GET_MESSAGES);
    // console.log("dis msg");
    // console.log(data);
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error :{error}</Text>;
    return data.messages.map(({  id, name, type, text, createdAt, createdBy }) => (
                <Text key={id}>{name + " " + type +" " +text}</Text>
    ));
  }
export default DisplayMessages;