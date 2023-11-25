
import { saveStateToLocalStorage } from "./actions";

export const localStorageMiddleware = (store) => (next) => (action) => {
  // Si action es una función (como en el caso de redux-thunk), ejecútala
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }

  const result = next(action);

  if (action && action.type) {
    store.dispatch(saveStateToLocalStorage());
  }

  return result;
};
