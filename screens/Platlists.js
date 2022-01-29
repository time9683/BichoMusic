import React, { useState, useEffect } from 'react'
import { Image, Dimensions, Modal, View, Text, TouchableNativeFeedback, StyleSheet, TextInput, Alert, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { addNew, getAllPlaylists } from '../lib/utils'

export default function Playlists ({ navigation, route }) {
  let { Reset } = route.params

  Reset = Reset || false

  const [playlists, setPlaylists] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  useEffect(() => {
    (async () => {
      setPlaylists(await getAllPlaylists())
    }

    )()
  }, [])

  const updateList = async () => {
    setPlaylists(await getAllPlaylists())
  }

  if (Reset) {
    (async () => {
      await updateList()
    })()

    Reset = false
  }

  return (
    <>
    <View style={styles.container}>
      <Text style={{ fontSize: 20, justifyContent: 'center', alignContent: 'center' }}>Playlists</Text>

      <TouchableNativeFeedback onPress={() => { setModalVisible(true) }}>
  <View style={{ width: 200, margin: 10, height: 30, borderRadius: 15, backgroundColor: '#957DFF', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: 'white' }}>
       Crear playlist
    </Text>
  </View>
  </TouchableNativeFeedback>
      <ScrollView style={{ position: 'relative' }} contentContainerStyle={styles.displayer}>

    {
      playlists.map((playlist, index) => (
          <Album key={index} route={navigation.navigate} list={playlist} />
      ))

    }

      </ScrollView>

    </View>
    <InputModal update={updateList} set={setModalVisible} visible={modalVisible} />
    </>
  )
}

const Album = ({ list, route }) => {
  return (
    <TouchableNativeFeedback onPress={() => { route('list', { list }) }}>
<View style={styles.ContainerPlay} >
<Image style={styles.PlaylistAlbum} source={require('../assetsC/playList.jpg')} />
<Text style={styles.ListTitle}>{list?.name}</Text>
<Text style={styles.ListDescription}>
{list?.audios?.length} canciones en total
</Text>
</View>
</TouchableNativeFeedback>

  )
}

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
    backgroundColor: '#4E0E66',
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  text: {
    fontSize: 20,
    color: '#000'
  }
})

const InputModal = ({ visible, set, update }) => {
  const [text, onChangeText] = useState('')

  const handleOk = async () => {
    if (text.length > 0) {
      await addNew(text)
      update()
      set(false)
      onChangeText('')
    } else {
      Alert.alert('error', 'no puede estar vacio')
    }
  }
  return (

 <Modal animationType='slide' transparent={true} visible={visible}>
   <View style={ModalStylshet.modalContainer}>
     <Text style={ModalStylshet.title}>Nombre de la lista</Text>
    <TextInput onChangeText={onChangeText} value={text} style={ModalStylshet.inputContainer} placeholder='nombre de la playlist' />

     <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
    <Btn onPress={() => { set(false) }}>cancelar</Btn>
    <Btn onPress={handleOk}>Crear</Btn>
    </View>
   </View>
   <TouchableWithoutFeedback onPress={() => { set(false) }}>
    <View style={ModalStylshet.modalbgColor}/>
    </TouchableWithoutFeedback>

 </Modal>

  )
}

const ModalStylshet = StyleSheet.create({
  modalContainer: {
    width: Dimensions.get('window').width,
    height: 200,
    flex: 1,
    backgroundColor: '#3C1070',
    padding: 20,
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
    zIndex: 1
  },
  inputContainer: {
    backgroundColor: '#1E1159',
    borderRadius: 5,
    padding: 10
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1159',
    alignItems: 'center'
    // justifyContent: 'center'
  },
  PlaylistAlbum: {
    backgroundColor: 'black',
    width: 180,
    height: 180,
    borderRadius: 15
  },
  displayer: {
    // flex: 1?,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginLeft: 6,
    justifyContent: 'flex-start'
  },
  ContainerPlay: {
    width: 180,
    margin: 5

  },
  ListTitle: {
    fontSize: 18,
    color: '#403e3e',
    fontWeight: 'bold'
  },
  ListDescription: {
    fontSize: 14,
    color: '#545454'
  }

})
