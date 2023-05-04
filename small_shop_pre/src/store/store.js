import { configureStore,combineReducers} from '@reduxjs/toolkit'
import loginReducer from "./reducer/login"
import userReducer from './reducer/user'
import pageNation from '../views/goods/store/pageNation'
import indexSwiper from '../views/home/store/indexSwiper'
import global from './reducer/global'
import address from './reducer/address'
import thunk from 'redux-thunk'
//持久化存储
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'small-shop',
  storage,
}

const reducer = combineReducers({
  loginDialog:loginReducer,
  userInfo:userReducer,
  pageNation,
  indexSwiper,
  global,
  address,
})
const persistedReducer = persistReducer(persistConfig,reducer)

export let store =  configureStore({reducer:persistedReducer,middleware:[thunk]},)
export let persistor = persistStore(store)

