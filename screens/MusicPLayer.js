import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableNativeFeedback, Dimensions } from 'react-native'
import playbackContext from '../context/playbackContext'
// import useControlAudio from '../hooks/useAudioControl'
import { controlAudio } from '../hooks/useAudioControl'
import { CalculateTime } from '../lib/utils'
import { handleNextAudio, handlePreviusAudio } from '../lib/audioHandle'

export default function MusicPlayer () {
  const [position, sePositon] = useState(0)
  const [scale, setScale] = useState(1)
  const context = useContext(playbackContext)

  const { playback } = context
  const { isLoop } = playback

  const togleLoop = () => {
    context.setPlayback({ ...context.playback, isLoop: !context.playback.isLoop })
  }

  const FillForCurrentTime = (currentTime, duration) => {
    const porcentaje = ((currentTime / 1000) / duration) * 100
    const fill = (251 * (porcentaje / 100))
    return fill
  }

  const positionMove = (e) => {
    const Eposition = e.nativeEvent.locationX

    // calculate windows width
    const restWidth = Math.floor(Dimensions.get('window').width / 2 - 125)
    let RealPOsition = Eposition - restWidth
    console.log(RealPOsition)
    if (RealPOsition < 0) {
      if (position < 10) {
        RealPOsition = 0
      } else {
        RealPOsition = position
      }
    }
    if (RealPOsition > 251) {
      RealPOsition = 251
    }

    sePositon(Math.floor(RealPOsition))
  }

  const fillToTime = () => {
    const fillTime = FillForCurrentTime(playback?.currentTime, playback?.currentAudio?.duration)
    const fill = position === 0 ? fillTime : position

    const pecentaje = (fill / 251) * 100
    const Result = (pecentaje / 100) * playback?.currentAudio?.duration
    console.log(Result)
    return Result
  }

  return (
        <View style={styles.container}>

            <Image blurRadius={0} style={styles.BackImage} source={require('../assetsC/ronaldo2.jpg')}></Image>
            <Image source={require('../assetsC/album.jpg')} style={styles.AlbumContainer}>
            </Image>
            <Text style={styles.titleText}>{playback?.currentAudio?.filename}</Text>

<View style={styles.Time}>
<Text>{CalculateTime(playback?.currentAudio?.duration)}</Text>
<Text>{CalculateTime(fillToTime())}</Text>
</View>
<View onStartShouldSetResponder={(evt) => true} onResponderMove={positionMove} onTouchStart={() => { setScale(1.4) }} onTouchEnd={ async () => { await playback.playObject.setPositionAsync(Math.floor(fillToTime() * 1000)); sePositon(0); setScale(1) }} style={styles.prosBar}>
<View style={{ borderRadius: 5, height: 4, backgroundColor: '#957DFF', width: position === 0 ? FillForCurrentTime(playback?.currentTime, playback?.currentAudio?.duration) : position }}>

<View style={{ position: 'absolute', width: 10, height: 10, backgroundColor: '#9577FF', borderRadius: 5, top: -3, left: position === 0 ? FillForCurrentTime(playback?.currentTime, playback?.currentAudio?.duration) : position, transform: [{ scale: scale }] }}></View>
</View>
</View>

<View style={styles.controls}>

<TouchableNativeFeedback onPress={togleLoop} >
{isLoop
  ? <Image style={{ width: 30, height: 30 }} source={require('../assetsC/2x/repeatOne.png')}/>
  : <Image style={{ width: 30, height: 30 }} source={require('../assetsC/2x/shufle.png')}/>

}
</TouchableNativeFeedback>

<View style={styles.controlPlay}>

<TouchableNativeFeedback onPress={() => { handlePreviusAudio(playback, context) }}>

<Image style={styles.btnControl} source={require('../assetsC/2x/previus.png')} ></Image>

</TouchableNativeFeedback>

<TouchableNativeFeedback onPress={() => { controlAudio(context, playback.currentAudio) }} >
{
playback?.soundObject?.isPlaying
  ? <Image style={{ width: 30, height: 30 }} source={require('../assetsC/2x/pause.png')}/>
  : <Image style={{ width: 30, height: 30 }} source={require('../assetsC/2x/play.png')}/>
}
</TouchableNativeFeedback>

<TouchableNativeFeedback onPress={() => { handleNextAudio(playback, context) }}>

<Image style={styles.btnControl} source={require('../assetsC/2x/next.png')} ></Image>

</TouchableNativeFeedback>

</View>

</View>

        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1159',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  BackImage: {
    width: Dimensions.get('window').width,
    height: 440,
    position: 'absolute',
    top: 0

  },
  AlbumContainer: {

    position: 'absolute',
    width: 217,
    height: 203,
    left: Dimensions.get('window').width / 2 - 110,
    top: 182,

    backgroundColor: 'gray'
  },
  titleText: {
    position: 'absolute',
    top: 120,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'

  },

  btnControl: {

    width: 30,
    height: 30

  },
  controls: {

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 490

  },
  prosBar: {
    position: 'absolute',
    width: 251,
    height: 4,
    top: 470,
    left: Dimensions.get('window').width / 2 - 125,
    backgroundColor: 'gray',
    borderRadius: 5

  },

  fillbar: {
    height: 3,
    backgroundColor: '#957DFF'
  },
  Time: {
    top: 445,
    position: 'absolute',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: Dimensions.get('window').width
  },
  controlPlay: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: -70
  }

})
