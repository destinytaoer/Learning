import { createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducers'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENDTION_COMPOSE__ || compose;
export default createStore(reducer, composeEnhancers(applyMiddleware(reduxLogger, reduxThunk, reduxPromise)));