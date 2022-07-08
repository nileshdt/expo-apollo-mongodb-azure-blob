import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import {View, Text} from 'react-native';


  const GET_MESSAGES = gql`
  query  messages {
    messages {
      _id
      text
      createdAt
      createdBy
    }
  }
`;

function DisplayMessages() {
    const { loading, error, data } = useQuery(GET_MESSAGES);
  
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error :{error}</Text>;
    console.log(data);
    return data.messages.map(({  _id, text, createdAt, createdBy }) => (
                <Text key={_id}>{text}</Text>
    ));
  }
export default DisplayMessages;