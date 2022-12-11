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


        rotaListRequest: (state, action) => {
            state.loadingRotaList = true;
        },
        rotaListSuccess: (state, action) => {
            state.loadingRotaList = false;
            state.rotas = action.payload;
        },
        rotaListFailure: (state, action) => {
            state.loadingRotaList = false;
            state.rotaListError = action.payload;
        },

        
    }
});

export const {
    rotaCreateRequest, rotaCreateSuccess, rotaCreateFailure,
    rotaGetRequest, rotaGetSuccess, rotaGetFailure,
    rotaListRequest, rotaListSuccess, rotaListFailure,
} = crudSlice.actions;


export default crudSlice.reducer