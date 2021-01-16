import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Components/Header'
import StartGameScreen from './Components/screens/StartGameScreen'
import GameScrenn from './Components/screens/GameScrenn'
import GameOverScreen from './Components/screens/GameOverScreen'
/*expo-font is a package which gives you font utilities , 
so utilities taht allow you to load fonts , 
and you import everything from that package and bundle it together in this font object */
import *  as Font from 'expo-font'

import AppLoading from 'expo-app-loading';

const fetchFonts = () =>{
  return Font.loadAsync({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
  })
}


export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds , setGuessRounds] = useState(0);
  const [dataLoaded , setDataLoaded] = useState(false);

  //we can load our fonts like this but mot recommended 
  //since Font.loadAsync return promise so if there is an error page will not be rendered because it shhoud wait Font.loadAsync asyncrounous to finish
  //fetchFonts()

  if(!dataLoaded){
    return <AppLoading 
    startAsync = {fetchFonts} 
    onFinish={() =>{setDataLoaded(true)}}
    onError = {(err) => console.log(err)}
    />
  }

const startGameHandler = selectedNumber => {
  setUserNumber(selectedNumber);
}

const gameOverHandler = numOfRounds => {
  setGuessRounds(numOfRounds);
  console.log("numOfRounds",numOfRounds)
}

const configureNewGame = () => {
  setGuessRounds(0);
  setUserNumber(null);

}

  let content = <StartGameScreen onStartGame = {startGameHandler}/>

if(userNumber && guessRounds <= 0){
  content = <GameScrenn userChoice = {userNumber} onGameOver={gameOverHandler}/>;
}
else if(guessRounds > 0){
  content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} restartGame={configureNewGame}/>
}

  return (
    <View style={styles.screen}>
      <Header >Guess a Number</Header>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
