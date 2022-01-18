export const CalculateTime = (time) =>{
    let segundos  =  Math.floor(time) 
    let minutos =  Math.floor(time / 60)  > 0 ?  Math.floor(time/60)  :  0  ;   
    let horas =  Math.floor(time / (60 * 60)).toFixed() > 0 ? Math.floor(time / 3600) : 0
    if(segundos > 60){
      segundos =   Math.floor(time -  Math.floor(minutos) * 60)
    }
      
      if(minutos >= 60){  
      minutos = Math.floor(minutos - Math.floor(horas)*60)    
      }
      if(segundos < 10){ 
        segundos = `0${segundos}`
      }
      if(minutos < 10 ){ 
         minutos = `0${minutos}`
      }
      if(Math.floor(horas) <= 0){
        horas = ''
       }
             if(horas < 10 && horas > 0){ 
          horas = `0${horas}:`
       }
    return   `${horas}${minutos}:${segundos}`
    }
    
    
    