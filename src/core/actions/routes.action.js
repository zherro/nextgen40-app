import { contentLoadFinish, contentLoadRequest } from "../../context/reducer/contentLoadSlice";
import {
  rotaCreateFailure, rotaCreateRequest, rotaCreateSuccess,
  rotaGetFailure, rotaGetRequest, rotaGetSuccess
} from "../../context/reducer/crudSlice";
import { routesFailure, routesRequest, routesSuccess } from "../../context/reducer/routesSlice";
import { actionFetch } from "../helpers/action.helper";
import { fetchPost, fetchGet } from "../helpers/service.helper";
import { fetchMyRoutes } from "../services/routes.service";
import { API_PATHS } from '../config/api.environment';

const retrieveMyRoutes = () => {
  return dispatch => {
    function request() { return routesRequest(); };
    function success(routes) { return routesSuccess(routes); };
    function failure(error) { return routesFailure(error); };

    function requestContent() { return contentLoadRequest(); };
    function finishLoad(routes) { return contentLoadFinish(routes); };

    actionFetch(fetchMyRoutes, dispatch, request, success, failure, requestContent, finishLoad)
  }
}

const saveRota = (values) => {
  console.log('enviando request')

  return dispatch => {
    function request() { return rotaCreateRequest(); };
    function success(routes) { return rotaCreateSuccess(routes); };
    function failure(error) { return rotaCreateFailure(error); };

    function requestContent() { return contentLoadRequest(); };
    function finishLoad(routes) { return contentLoadFinish(routes); };

    actionFetch(() => fetchPost(API_PATHS.ROUTES.CRUD_ROUTES, values), dispatch, request, success, failure, requestContent, finishLoad)
  }
}

const getRotaById = (uuid) => {

  return dispatch => {
    function request() { return rotaGetRequest(); };
    function success(routes) { return rotaGetSuccess(routes); };
    function failure(error) { return rotaGetFailure(error); };

    function requestContent() { return contentLoadRequest(); };
    function finishLoad(routes) { return contentLoadFinish(routes); };

    actionFetch(() => fetchGet(`${API_PATHS.ROUTES.CRUD_ROUTES_GET_BY_ID}${uuid}`), dispatch, request, success, failure, requestContent, finishLoad)
  }
}


export { retrieveMyRoutes, saveRota, getRotaById };