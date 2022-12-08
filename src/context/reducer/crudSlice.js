import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    creatingRota: false,
    loadingRota: false,
};

export const crudSlice = createSlice({
    name: 'crudReducer',
    initialState,
    reducers: {
        /* CRUD ROTA */
        rotaCreateRequest: (state, action) => {
            state.creatingRota = true;
        },
        rotaCreateSuccess: (state, action) => {
            state.creatingRota = false;
            state.rota = action.payload;
        },
        rotaCreateFailure: (state, action) => {
            state.creatingRota = false;
            state.rotaError = action.payload;
        },

        rotaGetRequest: (state, action) => {
            state.loadingRota = true;
        },
        rotaGetSuccess: (state, action) => {
            state.loadingRota = false;
            state.rota = action.payload;
        },
        rotaGetFailure: (state, action) => {
            state.loadingRota = false;
            state.rotaError = action.payload;
        },

        
    }
});

export const {
    rotaCreateRequest, rotaCreateSuccess, rotaCreateFailure,
    rotaGetRequest, rotaGetSuccess, rotaGetFailure,
} = crudSlice.actions;


export default crudSlice.reducer