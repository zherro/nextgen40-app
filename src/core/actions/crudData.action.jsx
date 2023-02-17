import { contentLoadFinish, contentLoadRequest } from "../../context/reducer/contentLoadSlice";
import {
  dataCreateRequest, dataCreateSuccess, dataCreateFailure,
  dataUpdateRequest, dataUpdateSuccess, dataUpdateFailure,
  dataGetRequest, dataGetSuccess, dataGetFailure,
  dataListRequest, dataListSuccess, dataListFailure,
} from "../../context/reducer/crudSlice";
import { actionFetch, serializeToQuery } from "../helpers/action.helper";
import { fetchPost, fetchGet, fetchUpdate, fetchDelete } from "../helpers/service.helper";

const save = (url, values) => {
  console.log('enviando request')

  return dispatch => {
    function request() { return dataCreateRequest(); };
    function success(data) { return dataCreateSuccess(data); };
    function failure(error) { return dataCreateFailure(error); };

    function requestContent() { return contentLoadRequest(); };
    function finishLoad(data) { return contentLoadFinish(data); };

    actionFetch(() => fetchPost(url, values), dispatch, request, success, failure, requestContent, finishLoad)
  }
}

const update = (url, uuid, values) => {
  console.log('enviando update')

  return dispatch => {
    function request() { return dataUpdateRequest(); };
    function success(data) { return dataUpdateSuccess(data); };
    function failure(error) { return dataUpdateFailure(error); };

    function requestContent() { return contentLoadRequest(); };
    function finishLoad(data) { return contentLoadFinish(data); };

    actionFetch(() => fetchUpdate(`${url}${uuid}`, values), dispatch, request, success, failure, requestContent, finishLoad)
  }
}

const deleteById = (url, uuid) => {
  console.log('Delete by ID')
  return dispatch => {
    function request() { return dataUpdateRequest(); };
    function success(data) { return dataUpdateSuccess(data); };
    function failure(error) { return dataUpdateFailure(error); };

    function requestContent() { return contentLoadRequest(); };
    function finishLoad(data) { return contentLoadFinish(data); };

    actionFetch(() => fetchDelete(`${url}${uuid}`), dispatch, request, success, failure, requestContent, finishLoad)
  }
}

const getById = (url, uuid) => {

  return dispatch => {
    function request() { return dataGetRequest(); };
    function success(data) { return dataGetSuccess(data); };
    function failure(error) { return dataGetFailure(error); };

    function requestContent() { return contentLoadRequest(); };
    function finishLoad(data) { return contentLoadFinish(data); };

    actionFetch(() => fetchGet(`${url}${uuid}`), dispatch, request, success, failure, requestContent, finishLoad)
  }
}

const getAll = (url, params) => {
  console.log('params')
  console.log(params)

  return dispatch => {
    function request() { return dataListRequest(); };
    function success(data) { return dataListSuccess(data); };
    function failure(error) { return dataListFailure(error); };

    function requestContent() { return contentLoadRequest(); };
    function finishLoad(data) { return contentLoadFinish(data); };

    actionFetch(() => fetchGet(`${url}${serializeToQuery(params)}`), dispatch, request, success, failure, requestContent, finishLoad)
  }
}


export { save, getById, getAll, update , deleteById };