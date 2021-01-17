import React  from 'react';
import {View, Text, StyleSheet ,TouchableOpacity}  from 'react-native'
import Color from './Constants/Color';

const MainButton = props =>{
    return(
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.6}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
backgroundColor:Color.primary,
paddingVertical:12,
paddingHorizontal:30,
borderRadius:25
    },
    buttonText:{
        color:'white',
        fontFamily:'open-sans'
    }
})

export default MainButton;