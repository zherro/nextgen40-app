import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loadingRoutes: false,
    loadingActiveRoutes: false,
    myRoutes: [],
    activeRoutes: [],
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
            state.routesError = undefined;
            state.myRoutes = action.payload;
        },
        routesFailure: (state, action) => {
            state.loadingRoutes = false;
            state.routesError = action.payload;
            state.myRoutes = undefined;
        },

        routesActiveRequest: (state, action) => {
            state.loadingActiveRoutes = true;
        },
        routesActiveSuccess: (state, action) => {
            state.loadingActiveRoutes = false;
            state.routesActiveError = undefined;
            state.activeRoutes = action.payload;
        },
        routesActiveFailure: (state, action) => {
            state.loadingActiveRoutes = false;
            state.routesActiveError = action.payload;
            state.activeRoutes = undefined;
        },

    }
});

export const {
    routesRequest, routesSuccess, routesFailure,
    routesActiveRequest, routesActiveSuccess, routesActiveFailure,
} = routesSlice.actions;


export default routesSlice.reducer