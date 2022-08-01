import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer/index'

const initialState={
    auth:{
        token:null,
        user: null
    },
    loading:false
}
const store = createStore(reducer, initialState, composeWithDevTools())

export default store