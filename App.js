import React from 'react'
import { AudioProvider } from './context/AudioContext'
import { PlaybackProvider } from './context/playbackContext'
import Main from './screens/main'
import MusicPlayer from './screens/MusicPLayer'
import Playlists from './screens/Platlists'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import List from './screens/list'

export default function App () {
  const Stack = createNativeStackNavigator()

  return (
 <PlaybackProvider>
  <AudioProvider>
  <NavigationContainer>
  <Stack.Navigator>
  <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
  <Stack.Screen name="Player" component={MusicPlayer} options={{ headerShown: false }}/>
  <Stack.Screen name="Platlists" component={Playlists} options={{ headerShown: false }} />
  <Stack.Screen name="list" component={List} options={{ headerShown: false }} />
  </Stack.Navigator>
  </NavigationContainer>
  </AudioProvider>
  </PlaybackProvider>
  )
}
