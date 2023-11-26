import { useState } from 'react'

export const useHandle = () => {
    const [handle, setHandle] = useState(true)

    function handleChange() {
        console.log("manejar Cambiar llamado");
        handle ? setHandle(false) : setHandle(true);
      }

    return { handle, handleChange }
}