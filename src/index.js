import React from "react";

// Después
import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { saveStateToLocalStorage } from "./redux/actions";
import App from "./App";

const persistor = persistStore(store);

const root = createRoot(document.getElementById("root"));

window.addEventListener("beforeunload", () => {
  store.dispatch(saveStateToLocalStorage());
});

root.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </PersistGate>
);
