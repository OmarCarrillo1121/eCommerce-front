
import { useState } from "react"

export function uselocalStorage( key, initialValue){
    const [ storedValue, setStoredValue ] = useState(() =>{

        try{
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : initialValue;
        } catch(error){
            console.error("Error al recuperar el valor del localStorage", error);
            return initialValue;
        }
    })
    const setValue = value =>{

        try{
            setStoredValue(value)

            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error("Error al almacenar el valor en localStorage", error);

        }
    }

    return [ storedValue, setValue]
}