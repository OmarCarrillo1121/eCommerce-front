import { useState, useEffect } from 'react'

export const useScroll = () => {
    const [scrollY, setScrollY] = useState(0)

    function handleScroll () {
      setScrollY(window.scrollY)
    }

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return { scrollY }
}