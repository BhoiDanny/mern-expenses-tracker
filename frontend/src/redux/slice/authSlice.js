import { createSlice } from "@reduxjs/toolkit";

//! Initial State
const initialState = {
    user: null
}

//! Slice
 const authSlice = createSlice({
    name: 'auth',
    initialState,
    //? Reducers
    reducers: {
        loginAction: (state, action) => {
            state.user = action.payload
        },
        //? Logout
        logoutAction: (state) => {
            state.user = null
        }
    }
})

//! Generate actions
export const { loginAction, logoutAction } = authSlice.actions

//! Generate the reducers
const authReducer = authSlice.reducer
export default authReducer