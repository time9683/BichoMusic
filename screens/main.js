import audioConsumer from '../context/AudioContext';
import React, {useContext, useEffect, useState } from 'react';
import {Alert,StyleSheet,StatusBar ,SafeAreaView, View ,Button,Text,ScrollView,Dimensions,Image,TextInput} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import  ItemList  from '../components/listMusic/index';
import MusicController from '../components/playerMin';
import { TouchableNativeFeedback } from 'react-native';
import playBackConsumer from '../context/playbackContext'
import useControlAudio from '../hooks/useAudioControl';


export default function Main() {
    const  {audios,setAudios} = useContext(audioConsumer)
    const {playback} = useContext(playBackConsumer)
  const [controlAudio,togleLoop,isLoop] = useControlAudio()
const [search,setSearch] = useState('')



  const getAudioAleatory =  () => {
  let audioAleatory = audios[Math.floor(Math.random() * audios.length)];
  return audioAleatory
  };
    
  
  const getMedia = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType : "audio",
    })
   media = await MediaLibrary.getAssetsAsync({
      mediaType : "audio",
      first : media.totalCount
   })

   const audiosMp3 = media.assets.filter(asset =>  asset.filename.endsWith(".mp3"))  
   setAudios(audiosMp3)
  }
  


  const permisonAlert = () => {
    Alert.alert('permision is required', 'please allow the app to access your music library',[
      {text:'ok',
      onPress:() => { getPermison()}
    },
      {text:'cancel',onPress:()=>{
        permisonAlert()
    }}])

  }


  const getPermison = async () => {
    const permision = await MediaLibrary.getPermissionsAsync();

    if (permision.granted && permision.canAskAgain ) {
        getMedia()
    } else {
     const {status,canAskAgain}=   await MediaLibrary.requestPermissionsAsync();

      if(status === 'denied' && canAskAgain){
        permisonAlert()
      }

       if( status === 'granted'){
         getMedia()
      
      }

      if(status === 'denied' && !canAskAgain){
        Alert.alert("permision denied,please check your settings for permision app") 

      }


    }
  }





  
  
  
useEffect(()=>{
  getPermison()
},[])





  

  
  return(
    <>
  <SafeAreaView>

  <StatusBar backgroundColor='#181818'></StatusBar>

  </SafeAreaView>
  <View style={styles.container}>
   
    <View style={styles.inputContainer}>
   <TextInput  placeholder="music name" value={search} onChangeText={setSearch} style={styles.input}></TextInput>
   </View>
  <ScrollView  style={styles.listContainer}   contentContainerStyle={styles.ListFlex}  >

 <Text style={styles.Title}>BichoMusic</Text>
 <Image style={{width:342,height:101,margin:20}}  blurRadius={1.2} source={require('../assetsC/cristiano.jpeg')}></Image>


<Text style={styles.subTitle}>List Music</Text>


<TouchableNativeFeedback  onPress={()=>{controlAudio(getAudioAleatory())}}>
<View style={styles.btnA}>
<Text style={{fontSize:12}}>Reproducion aleatoria</Text>

</View>


</TouchableNativeFeedback>
  {audios ? audios.filter(x =>  new RegExp(search,'gi').test(x.filename)).map((audio,index)=>{
    return(

      <ItemList  key={index} audio={audio} handleAudio={(x)=>{controlAudio(x)}}/>
  
    )}) : <Text>sin info</Text>
    }
  </ScrollView>
  
  <MusicController   Isloop={isLoop}  setLoop={togleLoop} handleAudio={(x)=>{controlAudio(x)}} audio={playback.currentAudio} playback={playback} />
  </View>
  
  </>
  )
  }
  
  
  
  
  
  
 const styles =  StyleSheet.create({ 
    container: {
      flex: 1,
      backgroundColor: '#1E1159',
      alignItems: 'center',
      justifyContent: 'center',
    },
    listContainer:{

      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height - 70 ,
      flex:1,
      top:50,
      position:'absolute',
    }
    ,
    ListFlex:{
      justifyContent: 'center',
      alignItems: 'center',

    },
    Title:{
     fontSize:24,
     position:'absolute',
      top:50,
      zIndex:1,

    }
    ,
    subTitle:{
      fontSize:21,
      marginBottom:5,
  },
  btnA:{
   backgroundColor:'#957DFF',
  //  padding:10,
   height:22,
   width:179,
   justifyContent:'center',
   alignItems:'center',
    borderRadius:10,
    alignSelf:'flex-start',
    marginLeft:25,
    marginBottom:5
   


  }
  ,
  input:{
    paddingLeft:10,
    backgroundColor:'white',
    zIndex:1,
    position:'absolute',
    top:10,
     width:300,
      height:30,
      backgroundColor:'#201F1F',
      borderRadius:10,
      right:20,
    },
    inputContainer:{
      position:'absolute',
      zIndex:1,
      top:0,
      width:Dimensions.get('window').width,
      height:45,
      backgroundColor:'#181818',
    }
});

  


  
  
  
  
  
  
  
