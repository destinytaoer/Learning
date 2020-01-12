import { createStore, applyMiddleware} from 'redux'
import reducer from './reducers'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
export default createStore(reducer, applyMiddleware(reduxLogger, reduxThunk, reduxPromise))