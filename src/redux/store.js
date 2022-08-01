import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer/index'

const initialState={
    todos:["go to the gym","go to the store","go to the bank"],
    loading:false
}
const store = createStore(reducer, initialState, composeWithDevTools())

export default store