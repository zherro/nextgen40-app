import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showToast: false,
    messageToast: null,
};

export const toastSlice = createSlice({
    name: 'toastReducer',
    initialState,
    reducers: {
        /* toast */
        toastRequest: (state, action) => {
            state.messageToast = action.payload;
            state.showToast = true;
        },
        toastFinish: (state, action) => {
            state.messageToast = null;
            state.showToast = false;
        },
        
    }
});

export const {
    toastRequest, toastFinish
} = toastSlice.actions;


export default toastSlice.reducer