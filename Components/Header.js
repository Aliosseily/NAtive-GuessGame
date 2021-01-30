import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native'
import Color from '../Components/Constants/Color'

const Header = props => {
    return (
        <View
            style={{
                ...styles.headerBase,
                ...Platform.select({
                    ios: styles.headerIOS, android: styles.headerAndroid
                })
            }}
        >
            <Text style={styles.headerTitle}>{props.children}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 39,
        backgroundColor: Color.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    headerAndroid: {
        backgroundColor: Color.primary,

    },
    headerTitle: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'open-sans-bold'

    }
})
export default Header;