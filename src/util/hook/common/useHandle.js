import { useState } from 'react'

export const useHandle = () => {
    const [handle, setHandle] = useState(true)

    function handleChange() {
        handle ? setHandle(false) : setHandle(true);
      }

    return { handle, handleChange }
}