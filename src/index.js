import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./redux/store";
import { saveStateToLocalStorage } from "./redux/actions"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

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
