import React, { createContext, useEffect, useState } from 'react'
import { Audio } from 'expo-av'
import { NextAudio } from '../hooks/useAudioControl'

Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  playThroughEarpieceAndroid: false,
  staysActiveInBackground: true
})

const context = createContext()

export function PlaybackProvider (props) {
  const [playback, setPlayback] = useState({ playlist: null, playObject: null, isLoop: false, soundObject: null, currentAudio: null, currentTime: 0, duration: 0, listAudio: [], route: null })

  const onPlaybackStatusUpdate = async status => {
    if (status.isLoaded && status.isPlaying) {
      setPlayback((playback) => { return { ...playback, currentTime: status.positionMillis, duration: status.durationMillis } })
    }

    if (status.didJustFinish && !playback.isLoop) {
      console.log(playback.isLoop)
      console.log('finish and loop false')
      if (playback.playlist) {
        const index = playback.playlist.audios.findIndex(audio => audio.id === playback.currentAudio.id)
        const nextAudio = playback.playlist.audios[index + 1]
        await NextAudio(nextAudio, playback, setPlayback)
      } else {
        const audio = playback.listAudio.findIndex(audio => audio.id === playback.currentAudio.id)
        const nextAudio = playback.listAudio[audio + 1]
        NextAudio(nextAudio, playback, setPlayback)
      }
    }

    if (status.didJustFinish && playback.isLoop) {
      console.log(playback.isLoop)
      console.log('finish and loop true')
      playback.playObject.replayAsync()
    }
  }

  // useEffect(() => {
  //   (async () => {
  //     const status = await playback.playObject.setStatusAsync({ isLooping: playback.isLoop })
  //     setPlayback({ ...playback, soundObject: status })
  //     console.log('listo')
  //   })()
  // }, [playback.isLoop])

  useEffect(() => {
    const objectPlaback = new Audio.Sound()
    setPlayback((playback) => { return { ...playback, playObject: objectPlaback } })
  }, [])

  useEffect(() => {
    // console.log(playback.currentAudio)
    if (playback.playObject) {
      playback.playObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
    }
  }, [playback.currentAudio, playback.isLoop])

  return (
        <context.Provider value={{ playback, setPlayback }}>
        {props.children}
        </context.Provider>
  )
}

export default context
