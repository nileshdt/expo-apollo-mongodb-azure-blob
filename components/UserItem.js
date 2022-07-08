import {StyleSheet, View, Text} from 'react-native';

function UserItem(props) {
    return (
        <View  style={styles.userItem}>
        <Text style={styles.userText} > {props.text}</Text> 
      </View>
      );

}
export default UserItem; 

const styles = StyleSheet.create({
    userItem:{
        margin: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
      },
      userText:{
        color: 'white'
      }
}

)