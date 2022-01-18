import React from 'react';
import { Text,View,Button,Image,TouchableNativeFeedback,Dimensions } from 'react-native';

export default function MusicController({handleAudio,playback,audio,Isloop,setLoop}){







return (




<View style={{flexDirection:"row",  position:"absolute",bottom:0,backgroundColor:"#4527CC",width:Dimensions.get('window').width,height:50,justifyContent:'space-around',alignItems:"center"}}>

<TouchableNativeFeedback  onPress={setLoop} >
{Isloop ? <Image   onPress={()=>{handleAudio(playback.currentAudio)}}  style={{width:30,height:30}} source={require("../../assetsC/2x/repeatOne.png")}/>
: <Image    style={{width:30,height:30}} source={require("../../assetsC/2x/shufle.png")}/>

}
</TouchableNativeFeedback>

<Text style={{width:300}}>{playback?.currentAudio?.filename}</Text>

<TouchableNativeFeedback onPress={()=>{handleAudio(audio)}} >
{playback?.soundObject?.isPlaying ? <Image   onPress={()=>{handleAudio(playback.currentAudio)}}  style={{width:30,height:30}} source={require("../../assetsC/2x/pause.png")}/>
: <Image    style={{width:30,height:30}} source={require("../../assetsC/2x/play.png")}/>

}
</TouchableNativeFeedback>
</View>







)


















}