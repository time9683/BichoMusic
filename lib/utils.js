import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import * as MediaLibrary from 'expo-media-library'

export const CalculateTime = (time) => {
  let segundos = Math.floor(time)
  let minutos = Math.floor(time / 60) > 0 ? Math.floor(time / 60) : 0
  let horas = Math.floor(time / (60 * 60)).toFixed() > 0 ? Math.floor(time / 3600) : 0
  if (segundos > 60) {
    segundos = Math.floor(time - Math.floor(minutos) * 60)
  }

  if (minutos >= 60) {
    minutos = Math.floor(minutos - Math.floor(horas) * 60)
  }
  if (segundos < 10) {
    segundos = `0${segundos}`
  }
  if (minutos < 10) {
    minutos = `0${minutos}`
  }
  if (Math.floor(horas) <= 0) {
    horas = ''
  }
  if (horas < 10 && horas > 0) {
    horas = `0${horas}:`
  }
  return `${horas}${minutos}:${segundos}`
}

// get all playlists
export const getAllPlaylists = async () => {
  // get playlists from async storage
  const playlists = await AsyncStorage.getItem('playlists')
  // if playlists is not null
  if (playlists !== null) {
    // return playlists
    return JSON.parse(playlists)
  }
  // else return empty array
  return []
}

// create new playlist
export const addNew = async (playlist) => {
  // get all playlists
  const allPlaylists = await getAllPlaylists()
  // add new playlist to all playlists the playlists is a object with the name of the playlist
  allPlaylists.push({ name: playlist })
  // save all playlists to async storage
  await AsyncStorage.setItem('playlists', JSON.stringify(allPlaylists))
}

// get One PLaylist
export const getPlaylist = async (playlistName) => {
  const allPlaylists = await getAllPlaylists()
  const playlist = allPlaylists.find(playlist => playlist.name === playlistName)
  return playlist
}

// add new audio to playlist
export const addAudioToPlaylist = async (playlistName, audio) => {
  const playlist = await getPlaylist(playlistName)
  console.log(playlist)
  if (playlist.audios === undefined) {
    playlist.audios = []
  }

  // find out if the audio is already in the playlist
  const audioInPlaylist = playlist.audios.find(audioInPlaylist => audioInPlaylist.id === audio.id)
  // if audio is not in playlist
  if (audioInPlaylist) {
    return
  }

  playlist.audios.push(audio)
  await modificatePlaylist(playlistName, playlist)
}

// remove audio to playlist
export const removeAudioToPlaylist = async (playlistName, audio) => {
  const playlist = await getPlaylist(playlistName)
  playlist.audios = playlist.audios.filter(x => x.filename !== audio.filename)
  await modificatePlaylist(playlistName, playlist)
}

// modificate playlist
export const modificatePlaylist = async (playlistName, newPlaylist) => {
  const allPlaylists = await getAllPlaylists()
  const index = allPlaylists.findIndex(playlist => playlist.name === playlistName)
  allPlaylists[index] = newPlaylist
  await AsyncStorage.setItem('playlists', JSON.stringify(allPlaylists))
}

// remove all playlists
export const removeAllPlaylists = async () => {
  await AsyncStorage.removeItem('playlists')
}

// remove one playlist
export const removePlaylist = async (playlistName) => {
  const allPlaylists = await getAllPlaylists()
  const index = allPlaylists.findIndex(playlist => playlist.name === playlistName)
  allPlaylists.splice(index, 1)
  await AsyncStorage.setItem('playlists', JSON.stringify(allPlaylists))
}

export const getAudioAleatory = (listAudio) => {
  const audioAleatory = listAudio[Math.floor(Math.random() * listAudio.length)]
  return audioAleatory
}

// getPermission
export const getPermison = async (context) => {
  const permision = await MediaLibrary.getPermissionsAsync()

  if (permision.granted && permision.canAskAgain) {
    getMedia(context)
  } else {
    const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync()

    if (status === 'denied' && canAskAgain) {
      permisonAlert(context)
    }

    if (status === 'granted') {
      getMedia(context)
    }

    if (status === 'denied' && !canAskAgain) {
      Alert.alert('permision denied,please check your settings for permision app')
    }
  }
}

// permision alert
const permisonAlert = (context) => {
  Alert.alert('permision is required', 'please allow the app to access your music library', [
    {
      text: 'ok',
      onPress: () => { getPermison(context) }
    },
    {
      text: 'cancel',
      onPress: () => {
        permisonAlert(context)
      }
    }])
}

// getMedia
const getMedia = async (context) => {
  let media = await MediaLibrary.getAssetsAsync({
    mediaType: 'audio'
  })
  media = await MediaLibrary.getAssetsAsync({
    mediaType: 'audio',
    first: media.totalCount
  })

  const audiosMp3 = media.assets.filter(asset => asset.filename.endsWith('.mp3'))
  context.setPlayback((play) => { return { ...play, listAudio: audiosMp3 } })
}
