import React from 'react';
import { TextInput, StyleSheet} from 'react-native'

const Input = props => {
    return (
 <TextInput {...props} style={{...styles.input , ...props.style}}/>
        )
}
export default Input;
const styles = StyleSheet.create({
input:{
    height:30,
    borderBottomColor:'grey',
    borderBottomWidth:3,
    marginVertical:10
}
})