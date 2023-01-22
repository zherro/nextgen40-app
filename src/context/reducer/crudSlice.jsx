import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    creatingData: false,
    loadingData: false,
    updatingData: false,
    loadingDataList: false,
};

export const crudSlice = createSlice({
    name: 'crudReducer',
    initialState,
    reducers: {
        /* CRUD CREATE */
        dataCreateRequest: (state, action) => {
            state.creatingData = true;
        },
        dataCreateSuccess: (state, action) => {
            state.creatingData = false;
            state.dataCreated = action.payload;
            state.dataCreateError = null;
        },
        dataCreateFailure: (state, action) => {
            state.creatingData = false;
            state.dataCreateError = action.payload;
        },

        /* CRUD UPDATE */
        dataUpdateRequest: (state, action) => {
            state.loadingData = true;
        },
        dataUpdateSuccess: (state, action) => {
            state.loadingData = false;
            state.data = action.payload;
            state.dataError = null;
        },
        dataUpdateFailure: (state, action) => {
            state.loadingData = false;
            state.dataError = action.payload;
        },


        /* CRUD GET */
        dataGetRequest: (state, action) => {
            state.loadingData = true;
        },
        dataGetSuccess: (state, action) => {
            state.loadingData = false;
            state.data = action.payload;
            state.dataError = null;
        },
        dataGetFailure: (state, action) => {
            state.loadingData = false;
            state.data = null;
            state.dataError = action.payload;
        },

        /* CRUD LIST */
        dataListRequest: (state, action) => {
            state.loadingDataList = true;
        },
        dataListSuccess: (state, action) => {
            state.loadingDataList = false;
            state.dataList = action.payload;
            state.dataListError = {};
        },
        dataListFailure: (state, action) => {
            state.loadingDataList = false;
            state.dataListError = action.payload;
        },
        
    }
});

export const {
    dataCreateRequest, dataCreateSuccess, dataCreateFailure,
    dataUpdateRequest, dataUpdateSuccess, dataUpdateFailure,
    dataGetRequest, dataGetSuccess, dataGetFailure,
    dataListRequest, dataListSuccess, dataListFailure,
} = crudSlice.actions;


export default crudSlice.reducer