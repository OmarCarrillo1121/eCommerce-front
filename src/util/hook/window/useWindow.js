import { useState, useEffect } from "react";

export const useWindow = () => {
    let [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const handleResize = () => {
        setViewportWidth(window.innerWidth);
    };
    useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
    window.removeEventListener('resize', handleResize);
    };
    }, []);

    return { viewportWidth }
}