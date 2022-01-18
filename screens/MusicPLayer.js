import React,{useContext} from 'react';
import { Text,View,Button,StyleSheet,Image,TouchableNativeFeedback,Dimensions} from 'react-native';
import playbackContext from '../context/playbackContext';
import useControlAudio from '../hooks/useAudioControl';
import {CalculateTime} from '../lib/utils';

export default function MusicPlayer(){
const {playback,setPlayback} = useContext(playbackContext)
const [controlAudio,togleLoop,isLoop] = useControlAudio()



const FillForCurrentTime = (currentTime,duration) => {
let  porcentaje = ((currentTime / 1000) /duration)*100
let fill =   (251 * (porcentaje/100))

return fill

}






    return (
        <View style={styles.container}>

            <Image  blurRadius={0}   style={styles.BackImage}    source={require("../assetsC/ronaldo2.jpg")}></Image>
            <Image source={require("../assetsC/album.jpg")} style={styles.AlbumContainer}>
            </Image>
            <Text style={styles.titleText}>{playback?.currentAudio?.filename}</Text>





<View style={styles.Time}>
<Text>{CalculateTime(playback?.currentAudio?.duration)}</Text>
<Text>{CalculateTime(playback.currentTime / 1000)}</Text>
</View>


<View style={styles.prosBar}>
<View   style={{  height: 3,backgroundColor: '#957DFF',width:FillForCurrentTime(playback?.currentTime,playback?.currentAudio?.duration)}}></View>

</View>





<View style={styles.controls}>


<TouchableNativeFeedback  onPress={togleLoop} >
{isLoop ? <Image    style={{width:30,height:30}} source={require("../assetsC/2x/repeatOne.png")}/>
: <Image    style={{width:30,height:30}} source={require("../assetsC/2x/shufle.png")}/>

}
</TouchableNativeFeedback>


<View style={styles.controlPlay}>

<TouchableNativeFeedback>


<Image style={styles.btnControl} source={require("../assetsC/2x/previus.png")} ></Image>


</TouchableNativeFeedback>





<TouchableNativeFeedback onPress={()=>{controlAudio(playback.currentAudio)}}  >
{
playback?.soundObject?.isPlaying ? <Image     style={{width:30,height:30}} source={require("../assetsC/2x/pause.png")}/>
: <Image    style={{width:30,height:30}} source={require("../assetsC/2x/play.png")}/>
}
</TouchableNativeFeedback>





<TouchableNativeFeedback>


<Image style={styles.btnControl} source={require("../assetsC/2x/next.png")} ></Image>


</TouchableNativeFeedback>

</View>





</View>




        </View>
    )
}



const styles = StyleSheet.create({
     container:{
            flex:1,
            backgroundColor:"#1E1159",
            alignItems:"center",
            justifyContent:"center",
            padding:20
        },
        BackImage:{
            width:Dimensions.get('window').width,
            height:440,
            position:"absolute",
            top:0

        }
        ,
        AlbumContainer:{

            position: 'absolute',
            width: 217,
            height: 203,
            left: Dimensions.get('window').width/2 - 110,
            top: 182,
            
            backgroundColor: 'gray'
        },
        titleText:{
            position:"absolute",
            top:120,
            fontSize:18,
            fontWeight:"bold",
            color:"white",



        },

        btnControl:{ 
        
            width:30,
            height:30,

        },
        controls:{

            flexDirection:"row",
            justifyContent:"space-evenly",
            alignItems:"center",
            width:Dimensions.get('window').width,
            position:"absolute",
            top:490

        },
        prosBar:{
            position: 'absolute',
width: 251,
height: 3,
top: 470,
left: Dimensions.get('window').width/2 - 125,
backgroundColor: 'gray',

        },

        fillbar:{
            height: 3,
            backgroundColor: '#957DFF',
        },
        Time:{
            top:445,
            position:"absolute",
            justifyContent:"space-around",
            flexDirection:"row",
            width:Dimensions.get('window').width,
        },
        controlPlay:{
            width:200,
            flexDirection:"row",
            justifyContent:"space-evenly",
            marginLeft:-70
        }
    
    })


    