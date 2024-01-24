import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './index.less';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from "./store/store"
import { Provider } from 'react-redux';
import { StillnessProvider } from "react-stillness-component";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StillnessProvider>
    <BrowserRouter basename="/small-shop-manage">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    </StillnessProvider>
  </React.StrictMode>
);

