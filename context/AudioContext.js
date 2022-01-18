import React, { useState } from 'react';

const   context = React.createContext();


export function AudioProvider(props){
    const [audios, setAudios] = useState([]);       
    return (
        <context.Provider value={{audios,setAudios}}>
        {props.children}
        </context.Provider>
    )
    }       




    export default context
