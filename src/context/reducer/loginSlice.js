import { STORAGE_KEYS } from '../../core/config/api.environment';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: typeof window !== "undefined" && localStorage.getItem(STORAGE_KEYS.USER) && JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) ? { user: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) } : {},
    loggingIn: false,
    logout: false,
};

export const loginSlice = createSlice({
    name: 'loginReducer',
    initialState,
    reducers: {
        loginRequest: (state, action) => {
            state.loggingIn = true;
        },
        loginSuccess: (state, action) => {
            state.logout = false;
            state.loggingIn = false;
            state.user = action.payload;
        },
        loginFailure: (state, action) => {
            state.loggingIn = false;
            state.loginError = action.payload;
        },
        
        
        logoutRequest: (state, action) => {
            state.logout = true;
        },
        logoutSuccess: (state, action) => {
            state.logout = false;
        },
        logoutFailure: (state, action) => {
            state.logout = true;
            state.logoutError = action.payload;
        },
    }
});

export const {
    loginRequest, loginSuccess, loginFailure,
    logoutRequest, logoutSuccess, logoutFailure,
} = loginSlice.actions;


export default loginSlice.reducer