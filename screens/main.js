import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, StatusBar, SafeAreaView, View, Text, ScrollView, Dimensions, Image, TextInput, TouchableNativeFeedback } from 'react-native'
import ItemList from '../components/listMusic/index'
import MusicController from '../components/playerMin'
import playBackConsumer from '../context/playbackContext'
import { controlAudio } from '../hooks/useAudioControl'
import { AddPlaylist, OptionsModal } from '../components/Modals'
import { getAudioAleatory, getPermison } from '../lib/utils'

export default function Main ({ navigation }) {
  const context = useContext(playBackConsumer)
  const { listAudio } = context.playback
  const [search, setSearch] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalOptions, setModalOptions] = useState({ handlePlay: null, audio: null })
  const [ModalPlaylist, setModalP] = useState({ open: false, audio: null })

  useEffect(() => {
    context.setPlayback((play) => { return { ...play, route: navigation.navigate } })

    getPermison(context)
  }, [])

  const TogleModal = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <>
  <SafeAreaView>

  <StatusBar backgroundColor='#181818'></StatusBar>

  </SafeAreaView>
  <View style={styles.container}>

    <View style={styles.inputContainer}>
   <TextInput placeholder="music name" value={search} onChangeText={setSearch} style={styles.input}></TextInput>
   </View>
  <ScrollView style={styles.listContainer} contentContainerStyle={styles.ListFlex} >

 <Text style={styles.Title}>BichoMusic</Text>
 <Image style={{ width: 342, height: 101, margin: 20 }} blurRadius={1.2} source={require('../assetsC/cristiano.jpeg')}></Image>

<Text style={styles.subTitle}>List Music</Text>

<View style={{ flexDirection: 'row', justifyContent: 'center', marginLeft: -20 }}>
<CustomBtn onPress={() => { controlAudio(context, getAudioAleatory(listAudio)) }}>Reproducion aleatoria</CustomBtn>
<CustomBtn onPress={() => { navigation.navigate('Platlists', { Reset: false }) }} >PlayLists</CustomBtn>
</View>

  {listAudio
    ? listAudio.filter(x => new RegExp(search, 'gi').test(x.filename)).map((audio, index) => {
      return (
  <ItemList curren={context?.playback?.currentAudio} activeModal={setModalVisible} setModalOption={setModalOptions} key={index} audio={audio} handleAudio={() => { context.setPlayback((p) => { return { ...p, playlist: null } }); controlAudio(context, audio) }}/>
      )
    })
    : <Text>sin info</Text>
    }
  </ScrollView>

  <MusicController/>
  </View>
<OptionsModal togleToadd={setModalP} CurrenAudio={modalOptions.audio} handlePlay={modalOptions.handlePlay} modalClose={TogleModal} visible={modalVisible}/>
<AddPlaylist audio={ModalPlaylist.audio} close={setModalP} visible={ModalPlaylist.open} />
  </>
  )
}
const CustomBtn = ({ onPress, children }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.btnA}>
        <Text style={{ fontSize: 12 }}>{children}</Text>
      </View>
      </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1159',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listContainer: {

    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 85,
    flex: 1,
    top: 50,
    position: 'absolute'
  },
  ListFlex: {
    justifyContent: 'center',
    alignItems: 'center'

  },
  Title: {
    fontSize: 24,
    position: 'absolute',
    top: 50,
    zIndex: 1

  },
  subTitle: {
    fontSize: 21,
    marginBottom: 5
  },
  btnA: {
    backgroundColor: '#957DFF',
    //  padding:10,
    height: 22,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // alignSelf: 'flex-start',
    marginLeft: 25,
    marginBottom: 5

  },
  input: {
    paddingLeft: 10,
    zIndex: 1,
    position: 'absolute',
    top: 10,
    width: 300,
    height: 30,
    backgroundColor: '#201F1F',
    borderRadius: 10,
    right: 20
  },
  inputContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    width: Dimensions.get('window').width,
    height: 45,
    backgroundColor: '#181818'
  }
})
