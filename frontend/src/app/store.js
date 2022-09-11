import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/auth/userSlice'

const store = configureStore({
    reducer: {
        auth: userReducer
    }
})

export default store