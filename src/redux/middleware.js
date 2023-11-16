import { saveStateToLocalStorage } from "./actions"

export const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    store.dispatch(saveStateToLocalStorage());
    return result;
  };