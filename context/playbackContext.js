import React,{createContext,useState} from 'react';





const context = createContext();

export function PlaybackProvider(props){
    const [playback,setPlayback] = useState({playObject:null,soundObject:null,currentAudio:null,currentTime:0,duration:0})   
    return (
        <context.Provider value={{playback,setPlayback}}>
        {props.children}
        </context.Provider>
    )
    }


    export default context