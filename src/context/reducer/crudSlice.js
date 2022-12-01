import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    creatingRota: false,  
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
        }

        
    }
});

export const {
    rotaCreateRequest, rotaCreateSuccess, rotaCreateFailure
} = crudSlice.actions;


export default crudSlice.reducer