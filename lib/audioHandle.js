import { NextAudio } from '../hooks/useAudioControl'

export const handleNextAudio = async (playback, context) => {
  // if playlist is defined and is not empty  then go to next audio in playlist
  if (playback.playlist) {
    // search the index of the current audio
    const index = playback.playlist.audios.findIndex(audio => audio.id === playback.currentAudio.id)
    // if last audio in playlist then go to first audio
    if (index === playback.playlist.audios.length - 1) {
      const nextAudio = playback.playlist.audios[0]
      await NextAudio(nextAudio, playback, context.setPlayback)
      return
    }
    // if not last audio in playlist then go to next audio
    const nextAudio = playback.playlist.audios[index + 1]
    await NextAudio(nextAudio, playback, context.setPlayback)
  } else {
    const index = playback.listAudio.findIndex((audio) => audio.id === context.playback.currentAudio.id)
    if (index === playback.listAudio.length - 1) {
      const nextAudio = playback.listAudio[0]
      await NextAudio(nextAudio, playback, context.setPlayback)
      return
    }
    const NexAudio = playback.listAudio[index + 1]
    await NextAudio(NexAudio, playback, context.setPlayback)
  }
}

export const handlePreviusAudio = async (playback, context) => {
  if (playback.playlist) {
    // search the index of the current audio
    const index = playback.playlist.audios.findIndex(audio => audio.id === playback.currentAudio.id)
    // if first audio in playlist then repeat the current audio
    if (index === 0) {
      const nextAudio = playback.playlist.audios[0]
      await NextAudio(nextAudio, playback, context.setPlayback)
      return
    }
    // if not first audio in playlist then go to previus audio
    const nextAudio = playback.playlist.audios[index - 1]
    await NextAudio(nextAudio, playback, context.setPlayback)
    return
  }

  const index = playback.listAudio.findIndex((audio) => audio.id === context.playback.currentAudio.id)
  // if first audio in playlist then repeat the current audio
  if (index === 0) {
    const nextAudio = playback.listAudio[0]
    await NextAudio(nextAudio, playback, context.setPlayback)
    return
  }
  const NexAudio = playback.listAudio[index - 1]
  await NextAudio(NexAudio, playback, context.setPlayback)
}
