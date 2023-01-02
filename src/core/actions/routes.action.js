import { contentLoadFinish, contentLoadRequest } from "../../context/reducer/contentLoadSlice";
import {
  routesFailure, routesRequest, routesSuccess,
  routesActiveRequest, routesActiveSuccess, routesActiveFailure
} from "../../context/reducer/routesSlice";
import { actionFetch } from "../helpers/action.helper";
import { fetchMyRoutes, fetchActiveRoutes } from "../services/routes.service";
import { API_PATHS } from '../config/api.environment';
import { deleteById, getAll, getById, save, update } from "./crudData.action";

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

const retrieveRoutesActives = () => {
  return dispatch => {
    function request() { return routesActiveRequest(); };
    function success(routes) { return routesActiveSuccess(routes); };
    function failure(error) { return routesActiveFailure(error); };

    function requestContent() { return contentLoadRequest(); };
    function finishLoad(routes) { return contentLoadFinish(routes); };

    actionFetch(fetchActiveRoutes, dispatch, request, success, failure, requestContent, finishLoad)
  }
}

const saveRota = (values) => save(API_PATHS.ROUTES.CRUD_ROUTES, values);
const sendAuthorizedRoutesForUser = (values) => save(API_PATHS.ROUTES.CRUD_ROUTES_AUTHORIZE_USER, values);
const updateRota = (uuid, values) => update(API_PATHS.ROUTES.CRUD_ROUTES_UPDATE, uuid, values);
const deleteRotaById = (uuid) => deleteById(API_PATHS.ROUTES.CRUD_ROUTES_DELETE, uuid);
const getRotaById = (uuid) => getById(API_PATHS.ROUTES.CRUD_ROUTES_GET_BY_ID, uuid);
const getRotaAll = (params) => getAll(API_PATHS.ROUTES.CRUD_ROUTES, params);


export {
  retrieveMyRoutes,
  retrieveRoutesActives,
  saveRota,
  sendAuthorizedRoutesForUser,
  getRotaById,
  getRotaAll,
  updateRota,
  deleteRotaById
};