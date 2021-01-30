import React, { useState , useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView // use to wrap your component with .
    // to make sure when your keboard opens up never overlays the input you'r typing in
}
    from 'react-native'
import Card from '../Card'
import Color from '../Constants/Color'
import Input from '../Input'
import NumberContainer from '../NumberContainer'
import TitleText from '../TitleText'
import DefaultStyle from '../Constants/default-styles'
import MainButton from '../MainButton'

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const changeInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);

    }
     
    useEffect (()=>{
        const updateLayout = () =>{
            console.log('changed')
            setButtonWidth(Dimensions.get('window').width / 4)
        }
        Dimensions.addEventListener('change',updateLayout);
        return () =>{
            console.log('remove')
            Dimensions.removeEventListener('change',updateLayout);
        };
    });

    const confirmInputHandler = () => {

        let chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("Invalid Number", "Number must be between 1 and 99", [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber)
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <Text> You Selected </Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
            </Card>
    }

    return (
        <ScrollView>
             {/*keyboardVerticalOffset means the mount of pixels keyboard slides up*/}
             {/*behavior='position' means repositions the entire screen by 30 pixels*/}
             {/*behavior='padding '  the padding get added at the bottom to slide every thing up*/}
             {/*behavior='height '  change the overall height of the dcreen*/}
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}> 
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles.screen}>
                        <TitleText >Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <Text style={DefaultStyle.bodyText}>Select a Number</Text>
                            <Input style={styles.input}
                                blurOnSubmit
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="number-pad"
                                maxLength={2}
                                onChangeText={changeInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width:buttonWidth}}>
                                    <Button title="Reset" onPress={resetInputHandler} color={Color.accent} />
                                </View>
                                <View style={{width:buttonWidth}}>
                                    <Button title="Confirm" onPress={confirmInputHandler} color={Color.primary} />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth:300,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    // button: {
    //     //width: '45%'
    //     width: Dimensions.get('window').width / 4
    // },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        margin: 20,
        alignItems: 'center'
    }

})
export default StartGameScreen;