import React from 'react';
import {View ,Text, StyleSheet} from 'react-native'
import Color from '../Components/Constants/Color'

const Header = props => {
return(
    <View style={styles.header}>
        <Text style={styles.headerTitle}>{props.children}</Text>
    </View>
)
}


const styles = StyleSheet.create({
header:{
    width:'100%',
    height:90,
    paddingTop:39,
    backgroundColor:Color.primary,
    alignItems:'center',
    justifyContent:'center',
},
headerTitle:{
    color:'black',
    fontSize:18,
    fontFamily:'open-sans-bold'

}
})
export default Header;