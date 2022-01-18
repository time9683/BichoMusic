import React from "react";
import { Text,View,Image,StyleSheet,TouchableHighlight  } from "react-native";


export default function ItemList(props){
    const {handleAudio,audio} = props;


    const press= () => {
        handleAudio(audio)
    }

    return(
    <TouchableHighlight onPress={press}>
    <View  style={styles.container}  >
     <Image style={styles.imageStyle}  source={require('../../assetsC/cristiano.jpeg')}/>
     <Text style={styles.text} >{audio.filename}</Text>

    </View>
    </TouchableHighlight>
    )



}


const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        backgroundColor:"#4A3E80",
        height:60,
        width:341,
        margin:4,
        borderRadius:8,
        overflow:"hidden",
        justifyContent:"flex-start",
        alignItems:"center",
        padding:10
    },
    imageStyle:{
        width:50,
        height:50,
    },
    text:{
     fontSize:12,
     color : 'white'

    }

})