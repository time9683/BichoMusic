import { Alert } from 'react-native'

// import { Audio } from 'expo-av'
const play = async (playback, audio) => {
  try {
    return await playback.playObject.loadAsync({ uri: audio.uri }, { shouldPlay: true, progressUpdateIntervalMillis: 1000 })
  } catch (error) {
    Alert.alert('Error', 'No se pudo reproducir el audio,se seguira con la misma cancion')
    if (playback.currentAudio) {
      await play(playback, playback.currentAudio)
    }
    return false
  }
}

const resume = async (playback) => {
  try {
    return await playback.playObject.playAsync()
  } catch (error) {
    console.log(error)
  }
}

const pause = async (playback) => {
  try {
    return await playback.playObject.setStatusAsync({
      shouldPlay: false
    })
  } catch (error) {
    // console.log(error)
  }
}

const SelectOther = async (playback, audio) => {
  await playback.playObject.stopAsync()
  await playback.playObject.unloadAsync()
  return await play(playback, audio)
}

// const nextAudio = async (context, audio) => {

// }

export async function controlAudio (context, audio) {
  // context.playback.onPlaybackStatusUpdate()
  if (context.playback?.soundObject === null) {
    const audioOb = await play(context.playback, audio)
    if (audioOb === false) return false
    context.setPlayback((playback) => { return { ...playback, soundObject: audioOb, currentAudio: audio } })

    setTimeout(() => {
      context.playback.route('Player')
    })
  }

  if (context.playback?.soundObject?.isLoaded && context.playback?.soundObject?.isPlaying) {
    const status = await pause(context.playback)
    context.setPlayback((playback) => { return { ...playback, soundObject: status } })
  }

  if (context.playback?.soundObject?.isLoaded && !context.playback?.soundObject?.isPlaying && context.playback?.currentAudio?.id === audio.id) {
    const status = await resume(context.playback)
    context.setPlayback((playback) => { return { ...playback, soundObject: status } })
  }

  if (context.playback?.soundObject?.isLoaded && context.playback?.currentAudio?.id !== audio?.id) {
    const status = await SelectOther(context.playback, audio)
    if (status === false) return false
    context.setPlayback((playback) => { return { ...playback, soundObject: status, currentAudio: audio } })
    // contexnavigation.navigate('Player')
    setTimeout(() => {
      context.playback.route('Player')
    })
  }
}

// const getAudioAleatory = () => {
//   const audioAleatory = audios[Math.floor(Math.random() * audios.length)]
//   return audioAleatory
// }

export const NextAudio = async (next, playback, set) => {
  const status = await SelectOther(playback, next)
  if (status === false) return false
  set((playback) => { return { ...playback, soundObject: status, currentAudio: next } })
}

// const onplaybackUptdate = (status) => {
//   () => {
//     console.log(playback)
//   }

//   setPlayback((playback) => { return { ...playback, currentTime: status.positionMillis } })
// }
