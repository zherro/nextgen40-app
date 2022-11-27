import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loadingRoutes: false,
    myRoutes: [],
};

export const routesSlice = createSlice({
    name: 'routesReducer',
    initialState,
    reducers: {
        routesRequest: (state, action) => {
            state.loadingRoutes = true;
        },
        routesSuccess: (state, action) => {
            state.loadingRoutes = false;
            state.myRoutes = action.payload;
        },
        routesFailure: (state, action) => {
            state.loadingRoutes = false;
            state.routesError = action.payload;
        }
    }
});

export const {
    routesRequest, routesSuccess, routesFailure
} = routesSlice.actions;


export default routesSlice.reducer