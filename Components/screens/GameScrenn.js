import React , {useState , useRef , useEffect} from 'react';
import { View, Text, StyleSheet, Button , Alert}  from 'react-native'
import NumberContainer from '../NumberContainer';
import Card from '../Card';
import DefaultStyle from '../Constants/default-styles'

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

const StartGameScreen = props => {

const [currentGuess , setCurrentGuess] = useState(generateNumberBetween(1 , 99 , props.userChoice))
const [rounds , setRounds] = useState(0)

const currentLow = useRef(1);
const currentHeight = useRef(99);

const {userChoice , onGameOver } = props;

useEffect(() =>{
    console.log("useEffect run");
    if(currentGuess === props.userChoice){
      props.onGameOver(rounds);
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
        currentLow.current = currentGuess;
    }

    setCurrentGuess(generateNumberBetween(currentLow.current, currentHeight.current , currentGuess))
    setRounds(curRounds => curRounds +1);
}

return(
    <View style={styles.screen}>
        <Text style={DefaultStyle.bodyText}>Opponent's Number</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
            <Button title="LOWER" onPress={nextGuessHandler.bind(this,'lower')}/>
            <Button title="GREATER" onPress={nextGuessHandler.bind(this,'greater')}/>
        </Card>
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
    }
})

export default StartGameScreen;