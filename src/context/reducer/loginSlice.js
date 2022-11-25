import { STORAGE_KEYS } from '../../core/config/api.environment';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: typeof window !== "undefined" && localStorage.getItem(STORAGE_KEYS.USER) && JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) ? { user: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) } : {},
    loggingIn: false,
};

export const loginSlice = createSlice({
    name: 'loginReducer',
    initialState,
    reducers: {
        loginRequest: (state, action) => {
            state.loggingIn = true;
        },
        loginSuccess: (state, action) => {
            state.loggingIn = false;
            state.user = action.payload;
        },
        loginFailure: (state, action) => {
            state.loggingIn = false;
            state.loginError = action.payload;
        }
    }
});

export const {
    loginRequest, loginSuccess, loginFailure
} = loginSlice.actions;


export default loginSlice.reducer