
import React, { useEffect, useState } from 'react'
import { Modal, View, StyleSheet, Dimensions, Text, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native'
import { addAudioToPlaylist, getAllPlaylists } from '../../lib/utils'

export const OptionsModal = ({ visible, modalClose, CurrenAudio, handlePlay, togleToadd }) => {
  return (
      <Modal
      animationType="slide"
      transparent={true}
      visible={visible}>
        <View style={ModalStylshet.modalContainer}>
        <Text style={ModalStylshet.title}>opciones para audios</Text>
        <View style={ModalStylshet.optionsContainer}>

        <TouchableNativeFeedback onPress={() => { handlePlay() }}>
          <Text style={ModalStylshet.Text}>play audio</Text>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => { togleToadd({ open: true, audio: CurrenAudio }) }}>
          <Text style={ModalStylshet.Text}>add to  playlist</Text>
          </TouchableNativeFeedback>

          </View>

        </View>
        <TouchableWithoutFeedback onPress={modalClose}>
      <View style={ModalStylshet.modalbgColor}/>
      </TouchableWithoutFeedback>
      </Modal>

  )
}

export const AddPlaylist = ({ visible, close, audio }) => {
  const [playlist, setPlaylist] = useState([])

  useEffect(() => {
    (async () => {
      setPlaylist(await getAllPlaylists())
    })()
  }, [visible])
  return (
  <Modal animationType='slide' transparent={true} visible={visible} >

  <View style={ModalStylshet.modalContainer}>

  <Text style={ModalStylshet.title}>Select the List to add</Text>

  <View style={ModalStylshet.optionsContainer}>

  {

  playlist.map((list, index) => {
    return (<TouchableNativeFeedback onPress={async () => { await addAudioToPlaylist(list.name, audio); close({ open: false, audio: null }) }} key={index}>
    <View>
    <Text style={ModalStylshet.Text}>{list.name}</Text>

    </View>
  </TouchableNativeFeedback>
    )
  })

  }

  </View>

  </View>
  <TouchableWithoutFeedback onPress={() => { close({ open: false, audio: null }) }}>
      <View style={ModalStylshet.modalbgColor}/>
      </TouchableWithoutFeedback>
  </Modal>

  )
}

const ModalStylshet = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#181818',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: Dimensions.get('window').width,
    // height: 90,
    // padding: 5
    zIndex: 1

  },
  optionsContainer: {

    padding: 15

  },
  Text: {
    fontSize: 15,
    margin: 6

  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 2,
    color: '#957DFF'

  },
  modalbgColor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'

  }

})
