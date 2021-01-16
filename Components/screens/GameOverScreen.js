import React  from 'react';
import { View, Text, StyleSheet, Button , Image}  from 'react-native' 
import TitleText from '../TitleText'
const GameOverScreen = props => {
return (
<View style={styles.screen}>
    <TitleText>Game is Over!!</TitleText>
    <View style={styles.imageContainer}>
    <Image 
    style={styles.image}
    source={require('../../assets/drip-4267390_1920.jpg')}
    resizeMode='cover'
    />
    </View>
    <TitleText>Number Of Round : {props.roundsNumber}</TitleText>
    <TitleText>Number Was : {props.userNumber}</TitleText>
    <Button title="Restart" onPress={props.restartGame} />
</View>
)
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    imageContainer:{
        width:300,
        height:300,
        borderRadius:150,
        borderWidth:3,
        borderColor:'black',
        overflow:'hidden',
        marginVertical:30
    },
    image:{
        width:'100%',
        height:'100%'
    }
})

export default GameOverScreen ;