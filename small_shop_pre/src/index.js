import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './App.less'
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store, persistor } from "./store/store"
import { PersistGate } from 'redux-persist/integration/react'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider locale={zhCN}>
            <App />
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </HashRouter>
)



