import React , {useState} from 'react';
import { View, Text, StyleSheet}  from 'react-native'


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


}

const styles = StyleSheet.create({

})

export default StartGameScreen;