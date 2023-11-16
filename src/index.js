import React from 'react';

// Después
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./redux/store";
import { saveStateToLocalStorage } from "./redux/actions"
import App from './App';

const root = createRoot(document.getElementById('root'));

window.addEventListener('beforeunload', () => {
  store.dispatch(saveStateToLocalStorage());
});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
