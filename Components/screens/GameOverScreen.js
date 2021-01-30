import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native'
import TitleText from '../TitleText'
import BodyText from '../BodyText'
import Color from '../Constants/Color';




const GameOverScreen = props => {
    const [currentDeviceHeight, setCurrentDeviceHeight] = useState(Dimensions.get('window').height)

    useEffect(() => {
        const updateLayout = () => {
            setCurrentDeviceHeight(Dimensions.get('window').height)
        }
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })
    let testStyle = styles.imageContainer;
    if(currentDeviceHeight < 500){
        testStyle = styles.imageContainerTwo
    }
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>Game is Over!!</TitleText>
                <View style={testStyle}>
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    imageContainer: {
        width:  Dimensions.get('window').width * 0.7, //width: 70%
        height: Dimensions.get('window').width * 0.7, // we want height of image to be same as width
        borderRadius: Dimensions.get('window').width * 0.7 / 2, // to have border radius automatically calculated
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 50,
    },
    imageContainerTwo: {
        width:  Dimensions.get('window').width * 0.9, //width: 70%
        height: Dimensions.get('window').width * 0.9, // we want height of image to be same as width
        borderRadius: Dimensions.get('window').width * 0.9 / 2, // to have border radius automatically calculated
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 50,
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 10,
    },
    highlight: {
        color: Color.primary,
        fontFamily: 'open-sans-bold',

    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    },
    image: {
        width: '100%',
        height: '100%'
    }
})

export default GameOverScreen;