import React , {useState , useRef , useEffect} from 'react';
import { View, Text, StyleSheet, Button , Alert , ScrollView}  from 'react-native'
import NumberContainer from '../NumberContainer';
import Card from '../Card';
import DefaultStyle from '../Constants/default-styles';
import MainButton from '../MainButton';
import {Ionicons} from '@expo/vector-icons';
import BodyText from '../BodyText';

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

const StartGameScreen = props => {
const initialGuess = generateNumberBetween(1 , 99 , props.userChoice);
const [currentGuess , setCurrentGuess] = useState(initialGuess)
const [pastGuesses , setPastGuesses] = useState([initialGuess])

const currentLow = useRef(1);
const currentHeight = useRef(99);

const {userChoice , onGameOver } = props;

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
        <View style={styles.listContainer}>
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
    marginTop:20,
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
        width:'70%',
        flex:1
    },
    list:{
        flexGrow:1,
        alignItems:'center',
        justifyContent:'flex-end'
    }
})

export default StartGameScreen;