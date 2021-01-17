import React  from 'react';
import { View, Text, StyleSheet, Button , Image}  from 'react-native' 
import TitleText from '../TitleText'
import BodyText from '../BodyText'
import Color from '../Constants/Color';
const GameOverScreen = props => {
return (
<View style={styles.screen}>
    <TitleText>Game is Over!!</TitleText>
    <View style={styles.imageContainer}>
    <Image 
    style={styles.image}
    //to use image from web 
    //fadeDuration={300}
    //source={{uri}:'https://imagepath'}
    source={require('../../assets/drip-4267390_1920.jpg')}
    resizeMode='cover'
    />
    </View>
    <View style={styles.resultContainer}>
    <BodyText style={styles.resultText}>
        Your phone needed {' '} <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess
        the number{' '} <Text style={styles.highlight}>{props.userNumber}</Text>
    </BodyText>
    </View>
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
    resultContainer:{
        marginHorizontal:30
    },
    highlight:{
        color:Color.primary,
        fontFamily:'open-sans-bold'

    },
    resultText:{
        textAlign:'center',
        fontSize:20
    },
    image:{
        width:'100%',
        height:'100%'
    }
})

export default GameOverScreen ;