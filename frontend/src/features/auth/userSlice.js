import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const token = localStorage.getItem('token')

const initialState = {
    token: token ? token : null,
    user: {},
    loading: false,
    error: null,
    success: false
}

// Register

export const register = createAsyncThunk('auth/register', async (user, { rejectWithValue }) => {
    return await axios.post('/api/user/register', user).then(res => {
        return res.data.token
    }).catch(err => {
        return rejectWithValue(err.response.data)
    })
})

// Login

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    return await axios.post('/api/user/login', data).then(res => {
        localStorage.setItem('token', res.data.token)
        return res.data.token
    }).catch(err => {
        return rejectWithValue(err.response.data)
    })
})

// Get me

export const getMe = createAsyncThunk('auth/getMe', async (token, { rejectWithValue }) => {
    return await axios.get('/api/user/me', {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then(res => {

        return res.data
    }).catch(err => {
        return rejectWithValue(err.response.data)
    })
})
// Logout 

export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('token')
})

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetState: (state) => {
            state.token = null
            state.user = {}
            state.loading = false
            state.error = null
            state.success = false
        }
    },
    extraReducers: (builder) => {

        //Register

        builder.addCase(register.pending, state => {
            state.loading = true
        })

        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.token = null
            state.user = {}
            state.success = true
        })

        builder.addCase(register.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.success = false
        })

        // Login

        builder.addCase(login.pending, state => {
            state.loading = true
        })

        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.token = action.payload
            state.success = true
        })

        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.success = false
        })

        // Get me

        builder.addCase(getMe.pending, state => {
            state.loading = true
        })

        builder.addCase(getMe.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.success = true
        })

        builder.addCase(getMe.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.success = false
        })
    }
})

export const { resetState } = userSlice.actions
export default userSlice.reducer