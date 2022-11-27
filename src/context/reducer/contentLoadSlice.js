import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loadingContent: false,
};

export const contentLoadSlice = createSlice({
    name: 'contentReducer',
    initialState,
    reducers: {
        contentLoadRequest: (state, action) => {
            state.loadingContent = true;
        },
        contentLoadSuccess: (state, action) => {
            state.loadingContent = false;
        },
        contentLoadFinish: (state, action) => {
            state.loadingContent = false;
        },
        contentLoadFailure: (state, action) => {
            state.loadingContent = false;
            state.contentLoadError = action.payload;
        }
    }
});

export const {
    contentLoadRequest, contentLoadSuccess, contentLoadFinish, contentLoadFailure
} = contentLoadSlice.actions;


export default contentLoadSlice.reducer