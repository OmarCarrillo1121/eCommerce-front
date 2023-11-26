import { useCallback } from "react";

const useLocalStorageCleaner = (key) => {
  const clearLocalStorage = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);

  return clearLocalStorage;
};

export default useLocalStorageCleaner;