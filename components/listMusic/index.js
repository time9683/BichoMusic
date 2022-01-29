import React from 'react'
import { Text, View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native'

export default function ItemList (props) {
  const { handleAudio, audio, setModalOption, activeModal, curren } = props
  const handleOptions = () => {
    setModalOption({
      handlePlay: handleAudio,
      audio: audio
    })
    activeModal(true)
  }

  return (
    <TouchableNativeFeedback onPress={handleAudio}>
    <View style={curren?.id === audio?.id ? styles.ContainerSelect : styles.container} >
     <Image style={styles.imageStyle} source={require('../../assetsC/cristiano.jpeg')}/>
     <Text style={styles.text} >{audio.filename}</Text>
     <TouchableNativeFeedback onPress={handleOptions}>
     <Image style={styles.puntos} source={require('../../assetsC/points.png')}></Image>
     </TouchableNativeFeedback>

    </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#4A3E80',
    height: 60,
    width: 341,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10
  },
  ContainerSelect: {
    flexDirection: 'row',
    backgroundColor: '#5b4c9c',
    height: 60,
    width: 341,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10

  },

  imageStyle: {
    width: 50,
    height: 50
  },
  text: {
    fontSize: 12,
    color: 'white',
    width: 250,
    marginLeft: 5

  },
  puntos: {

    width: 20,
    height: 20,
    position: 'absolute',
    right: 4

  }
})
