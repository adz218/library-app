import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import library from './library'
import searchCategory from './searchCategory'
import query from './query'
import view from './view'
import filters from './filters'

const reducer = combineReducers({library, searchCategory, view, query, filters})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
