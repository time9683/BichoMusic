import React,{useContext, useState,useEffect} from 'react';
import { Audio } from 'expo-av';
import  PlaybackConsumer from '../context/playbackContext';
import audioConsumer from '../context/AudioContext';
import { useNavigation } from '@react-navigation/native';






Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: false,
    staysActiveInBackground: true,
    playThroughEarpieceAndroid: false,
  });








export default function  useControlAudio(){
const navigation = useNavigation();
const [isLoop,setLoop] = useState(false);
const {playback,setPlayback} = useContext(PlaybackConsumer)
const {audios,setAudios} = useContext(audioConsumer)




const getAudioAleatory =  () => {
  let audioAleatory = audios[Math.floor(Math.random() * audios.length)];
  return audioAleatory
  };


  const getNextAudio = async (actual) => {

    
  let index = await audios.findIndex(audio => audio?.filename === actual?.filename);
  console.log(index)  
    

  }
    



const onplaybackUptdate =  (status) => {

    ()=>{


      console.log(playback)
    }




 
  setPlayback((playback)=>{ return   {...playback,currentTime:status.positionMillis}})



}











useEffect(async ()=>{
    await playback?.playObject?.setIsLoopingAsync(isLoop)   
      },[isLoop])


      const togleLoop = ()=>{
        setLoop(!isLoop)
    }
    



const controlAudio = async (audio) => {
    if(playback?.soundObject === null ){

        const objectPlaback = new Audio.Sound()
         
        const audioOb = await objectPlaback.loadAsync({uri : audio.uri},{shouldPlay : true,isLooping:isLoop,progressUpdateIntervalMillis:1000})
        
        setPlayback({playObject:objectPlaback,soundObject:audioOb,currentAudio:audio})
        objectPlaback.setOnPlaybackStatusUpdate(onplaybackUptdate)
        setTimeout(()=>{  
          navigation.navigate("Player")


        })
        
      }
      

      if(playback?.soundObject?.isLoaded && playback?.soundObject?.isPlaying){

       const status = await   playback.playObject.setStatusAsync({shouldPlay : false})

        setPlayback((playback)=>{return {...playback,soundObject:status}})
      
      }

      if(playback?.soundObject?.isLoaded && !playback?.soundObject?.isPlaying && playback?.currentAudio?.id === audio.id){
        const status = await playback.playObject.playAsync()
        setPlayback((playback)=>{return {...playback,soundObject:status}})

      }

      if(playback?.soundObject?.isLoaded  && playback?.currentAudio?.id !== audio?.id){
      await playback.playObject.stopAsync()
      await playback.playObject.unloadAsync()
      const status = await playback.playObject.loadAsync({uri : audio.uri},{shouldPlay : true,isLooping:isLoop})
        setPlayback((playback)=>{return {...playback,soundObject:status,currentAudio:audio}})
        navigation.navigate("Player")
      
      }


}




return [controlAudio,togleLoop,isLoop]



  }













