

import {configureStore} from '@reduxjs/toolkit'
import UserReducer from '../Features/User'
import ThemeReducer from '../Features/Theme'
const store = configureStore({
    reducer:{
        User:UserReducer,
        Theme:ThemeReducer
    }
})

export default store;