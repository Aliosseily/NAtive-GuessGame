import React from 'react';
import { View, StyleSheet} from 'react-native'

const Card = props => {
    return (
        <View style={{...styles.card , ...props.style}}>{props.children}</View>
    )
}
    const styles = StyleSheet.create({
        card: {
            // shadow only works on IOS not on Android
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 2 },
            // to use shadows on android u should use elevation
            elevation: 8,
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10
        }
    })
    export default Card;