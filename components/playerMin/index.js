import React, { useContext } from 'react'
import { Text, View, Image, TouchableNativeFeedback, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import playbackContext from '../../context/playbackContext'
import { controlAudio } from '../../hooks/useAudioControl'
export default function MusicController () {
  const context = useContext(playbackContext)
  const navigation = useNavigation()

  const togleLoop = () => {
    context.setPlayback({ ...context.playback, isLoop: !context.playback.isLoop })
  }

  return (

<View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, backgroundColor: '#4527CC', width: Dimensions.get('window').width, height: 50, justifyContent: 'space-around', alignItems: 'center' }}>

<TouchableNativeFeedback onPress={togleLoop} >
{context?.playback?.isLoop
  ? <Image style={{ width: 30, height: 30 }} source={require('../../assetsC/2x/repeatOne.png')}/>
  : <Image style={{ width: 30, height: 30 }} source={require('../../assetsC/2x/shufle.png')}/>

}
</TouchableNativeFeedback>

<TouchableNativeFeedback onPress={() => { navigation.navigate('Player') }}>
<Text style={{ width: 300 }}>{context?.playback?.currentAudio?.filename}</Text>

</TouchableNativeFeedback>
<TouchableNativeFeedback onPress={() => { controlAudio(context, context.playback.currentAudio) }}>
{ context.playback?.soundObject?.isPlaying
  ? <Image style={{ width: 30, height: 30 }} source={require('../../assetsC/2x/pause.png')}/>
  : <Image style={{ width: 30, height: 30 }} source={require('../../assetsC/2x/play.png')}/>

}
</TouchableNativeFeedback>
</View>

  )
}
