import React , {useState , useRef , useEffect} from 'react';
import { View, Text, StyleSheet, Button , Alert , ScrollView, Dimensions}   from 'react-native'
import NumberContainer from '../NumberContainer';
import Card from '../Card';
import DefaultStyle from '../Constants/default-styles';
import MainButton from '../MainButton';
import {Ionicons} from '@expo/vector-icons';
import BodyText from '../BodyText';
import * as ScreenOrientation from 'expo-screen-orientation';
const generateNumberBetween = (min , max , exclude) => {
min = Math.ceil(min);
max = Math.floor(max);
const rndNum = Math.floor(Math.random() * (max - min) + min )
if(rndNum === exclude){
    generateNumberBetween(min , max , exclude);
}else{
 return rndNum ;
}
}

const renderListItem = (value , index) =>(
    <View key={index} style={styles.listItem}>
    <BodyText># {index}</BodyText>
    <BodyText>{value}</BodyText>
</View>
)

const GameScrenn = props => {
    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT) // prevent orientatioon change
    //ScreenOrientation.addOrientationChangeListener // this will fiers a function when orientation change
const initialGuess = generateNumberBetween(1 , 99 , props.userChoice);
const [currentGuess , setCurrentGuess] = useState(initialGuess)
const [pastGuesses , setPastGuesses] = useState([initialGuess])
const [availableDeviceWidth ,  setAailableDeviceWidth] = useState(
    Dimensions.get('window').width
);
const [availableDeviceHeight ,  setAailableDeviceHeight] = useState(
    Dimensions.get('window').height
);
const currentLow = useRef(1);
const currentHeight = useRef(99);

const {userChoice , onGameOver } = props;

useEffect (() =>{
    const updateLayout = () => {
        setAailableDeviceWidth(Dimensions.get('window').width);
        setAailableDeviceHeight(Dimensions.get('window').height);
    }
    Dimensions.addEventListener('change',updateLayout);
    return () =>{
        Dimensions.removeEventListener('change',updateLayout);
    }
})

useEffect(() =>{
    console.log("useEffect run");
    if(currentGuess === props.userChoice){
      props.onGameOver(pastGuesses.length);
    }
},[currentGuess , userChoice , onGameOver]) // these are useEffect dependncy list useEffect will run if one of these depndency value has change if not of these valus are changed then useEffect will not run

const nextGuessHandler = direction =>{
 if((direction === 'lower' && currentGuess < props.userChoice) || 
    (direction === 'greater' && currentGuess > props.userChoice )){
        Alert.alert("Don't lie" , "You know that this is wrong ..." , [{text:"okay" , style:"cancel"}])
        return;
    }
    if(direction === 'lower'){
        currentHeight.current = currentGuess;
    }
    else{
        currentLow.current = currentGuess + 1 ;
    }
    const nextNumber = generateNumberBetween(currentLow.current, currentHeight.current , currentGuess)
    setCurrentGuess(nextNumber)

   // setRounds(curRounds => curRounds +1);
   setPastGuesses(curPastGuess => [nextNumber,...curPastGuess])
}

//let listContainerstyle =  Dimensions.get('window').width < 350 ? styles.listContainer : styles.listContainerBig
let listContainerstyle =  availableDeviceWidth ? styles.listContainer : styles.listContainerBig

// if(Dimensions.get('window').width < 150){
//     listContainerstyle = styles.listContainerBig
// }

//if( Dimensions.get('window').height < 500){
    if( availableDeviceHeight < 500){ // we use state to render new view after each render rotate
    return(
        <View style={styles.screen}>
            <Text style={DefaultStyle.bodyText}>Opponent's Number</Text>
            <View style={styles.control}>
                <MainButton onPress={nextGuessHandler.bind(this,'lower')}>
                    <Ionicons name="md-remove" size={24} color='white'/>
                </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress={nextGuessHandler.bind(this,'greater')}>
                <Ionicons name="md-add" size={24} color='white'/>
                </MainButton>
                </View>
            <View style={listContainerstyle}>
            <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess , index)=>(
                  renderListItem(guess, pastGuesses.length - index)
                ))}
            </ScrollView>
            </View>
        </View>
    )
}

return(
    <View style={styles.screen}>
        <Text style={DefaultStyle.bodyText}>Opponent's Number</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
            <MainButton onPress={nextGuessHandler.bind(this,'lower')}>
                <Ionicons name="md-remove" size={24} color='white'/>
            </MainButton>
            <MainButton onPress={nextGuessHandler.bind(this,'greater')}>
            <Ionicons name="md-add" size={24} color='white'/>
            </MainButton>
        </Card>
        <View style={listContainerstyle}>
        <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess , index)=>(
              renderListItem(guess, pastGuesses.length - index)
            ))}
        </ScrollView>
        </View>
    </View>
)
}

const styles = StyleSheet.create({
    screen:{
    flex:1,
    padding:10,
    alignItems:'center'
    },
    buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    //marginTop:20,
    marginTop : Dimensions.get('window').height > 600 ? 20 : 50 ,// u can use trnary operator to access dimentions as media query 
    width:300,
    maxWidth:'80%'
    },
    listItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:1,
        padding:15,
        marginVertical:10,
        borderColor:'black',
        width:"60%"

    },
    listContainer:{
        width:'60%',
        flex:1
    },
    listContainerBig:{
        width:'80%',
        flex:1
    },
    list:{
        flexGrow:1,
        alignItems:'center',
        justifyContent:'flex-end'
    },
    control:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'80%',
        textAlign:'center'
    }
})

export default GameScrenn;