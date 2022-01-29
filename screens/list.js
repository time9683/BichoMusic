
import React, { useContext } from 'react'

import playBackConsumer from '../context/playbackContext'
import { StyleSheet, Text, View, ScrollView, Image, TouchableNativeFeedback, Dimensions, Alert, Modal, TouchableWithoutFeedback } from 'react-native'
import { controlAudio } from '../hooks/useAudioControl'
import MusicController from '../components/playerMin'
import { removeAudioToPlaylist, removePlaylist } from '../lib/utils'
export default function List ({ navigation, route }) {
  const context = useContext(playBackConsumer)
  const [modalVisible, setModalVisible] = React.useState(false)
  const [modalAudioVisible, setModalAudioVisible] = React.useState({ open: false, audio: null })
  const { list } = route.params

  const handleReproduc = async () => {
    if (list?.audios?.length > 0) {
      context.setPlayback((p) => { return { ...p, playlist: list } })
      controlAudio(context, list.audios[0])
      return
    }
    Alert.alert('no hay audios')
  }

  return (
    <>
    <View style={styles.container}>

        <Image style={styles.AlbumImg} source={require('../assetsC/playList.jpg')} />
      <TouchableNativeFeedback onPress={() => { setModalVisible(true) }}>
     <Image style={{ width: 25, height: 25, position: 'absolute', top: 20, right: 20 }} source={require('../assetsC/points.png')} />
     </TouchableNativeFeedback>

     <ModalAlbum context={context} navegate={navigation.navigate} listname={list.name} close={() => { setModalVisible(false) }} visible={modalVisible}/>
     <Text style={styles.title}>{list.name}</Text>
     <View>
        <Btn onPress={handleReproduc}>reproducir</Btn>
                  </View>
                  <View style={{ height: 490 }}>
   <ScrollView style={{ width: Dimensions.get('window').width }}>
    {
        list?.audios?.map((item, index) => (
             <TouchableNativeFeedback onPress={() => { context.setPlayback((p) => { return { ...p, playlist: list } }); controlAudio(context, item) }} key={index}>
               <View style={context?.playback?.currentAudio?.id === item?.id ? styles.AlbumSelect : styles.AlbumContainer}>
              <Image style={styles.ImgId} source={require('../assetsC/cristiano.jpeg')}/>
            <Text style={styles.text}>{item?.filename}</Text>
            <TouchableNativeFeedback onPress={() => { setModalAudioVisible({ open: true, audio: item }) }}>
            <Image style={styles.points} source={require('../assetsC/points.png')}/>
            </TouchableNativeFeedback>
            </View>
            </TouchableNativeFeedback>
        ))
    }
     <AudioModal listname={list.name} audio={modalAudioVisible.audio} close={() => { setModalAudioVisible({ open: false, audio: null }) }} visible={modalAudioVisible.open}/>
    </ScrollView>
    </View>

    </View>
    <MusicController></MusicController>
    </>
  )
}

// create a styles object
const styles = StyleSheet.create({
  container: {
    // center
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1159',
    padding: 10
  },
  AlbumSelect: {
    flexDirection: 'row',
    margin: 8,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#641282',
    padding: 5,
    borderRadius: 10,
    position: 'relative'

  },

  displayer: {

  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10

  },
  AlbumImg: {
    width: 180,
    height: 180,
    borderRadius: 15,
    marginBottom: 10

  },
  ImgId: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10

  },
  AlbumContainer: {
    flexDirection: 'row',
    margin: 8,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#4E0E66',
    padding: 5,
    borderRadius: 10,
    position: 'relative'
  },
  text: {
    width: 280,
    color: 'white',
    fontSize: 12
  },
  points: {
    width: 20,
    height: 20
    // position: 'absolute',
    // right: 10
  }

})

const Btn = ({ onPress, children }) => {
  return (
        <TouchableNativeFeedback onPress={onPress}>
        <View style={btnStyle.btn}>
            <Text style={btnStyle.text}>
            {children}
            </Text>
        </View>
        </TouchableNativeFeedback>
  )
}

// create button styleSheet
const btnStyle = StyleSheet.create({
  btn: {
    backgroundColor: '#957DFF',
    padding: 8,
    margin: 10,
    borderRadius: 10
  },
  text: {
    color: 'white'
  }
})

const ModalAlbum = ({ visible, close, listname, navegate, context }) => {
  const DeleteThisAlbum = () => {
    Alert.alert(
      'Eliminar',
      '¿Estas seguro de eliminar este album?',
      [
        {
          text: 'Cancelar',
          onPress: () => close(false),
          style: 'cancel'
        },
        { text: 'Eliminar', onPress: async () => await remove() }
      ],
      { cancelable: false }
    )
  }

  const remove = async () => {
    // console.log(context.playback.playlist.names)
    if (context?.playback?.playlist?.name === listname) {
      context.setPlayback((p) => { return { ...p, playlist: null } })
    }
    await removePlaylist(listname)
    navegate('Platlists', { Reset: true })
  }

  return (

<Modal visible={visible} animationType='fade' transparent={true} >

<TouchableNativeFeedback onPress={DeleteThisAlbum}>
<View style={ModalStylshet.container} >
  <Text>Eliminar</Text>
</View>
</TouchableNativeFeedback>

<TouchableWithoutFeedback onPress={close}>
    <View style={ModalStylshet.modalbgColor}/>
    </TouchableWithoutFeedback>
</Modal>

  )
}

const ModalStylshet = StyleSheet.create({
  container: {
    backgroundColor: '#322f33',
    color: 'white',
    padding: 5,
    width: 120,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    top: 20,
    right: 20

  },
  modalbgColor: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0

  }
})

const AudioModal = ({ visible, close, listname, audio }) => {
  const DeleteThisAudio = () => {
    Alert.alert(
      'Eliminar',
      '¿Estas seguro de eliminar este audio?',
      [
        {
          text: 'Cancelar',
          onPress: () => close(false),
          style: 'cancel'
        },
        { text: 'Eliminar', onPress: async () => await remove() }
      ],
      { cancelable: false }
    )
  }

  const remove = async () => {
    await removeAudioToPlaylist(listname, audio)
    close()
  }

  return (

<Modal visible={visible} animationType='fade' transparent={true} >

<TouchableNativeFeedback onPress={DeleteThisAudio}>
<View style={audioModal.container} >
  <Text>Eliminar</Text>
</View>
</TouchableNativeFeedback>

<TouchableWithoutFeedback onPress={close}>
    <View style={ModalStylshet.modalbgColor}/>
    </TouchableWithoutFeedback>
</Modal>

  )
}

const audioModal = StyleSheet.create({
  container: {
    backgroundColor: '#322f33',
    color: 'white',
    padding: 5,
    width: 120,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    top: 20,
    right: 20
  }
})
