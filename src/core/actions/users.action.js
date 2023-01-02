import { contentLoadFinish, contentLoadRequest } from "../../context/reducer/contentLoadSlice";
import { routesFailure, routesRequest, routesSuccess } from "../../context/reducer/routesSlice";
import { actionFetch } from "../helpers/action.helper";
import { fetchMyRoutes } from "../services/routes.service";
import { API_PATHS } from '../config/api.environment';
import { deleteById, getAll, getById, save, update } from "./crudData.action";

// const retrieveMyRoutes = () => {
//   return dispatch => {
//     function request() { return routesRequest(); };
//     function success(routes) { return routesSuccess(routes); };
//     function failure(error) { return routesFailure(error); };

//     function requestContent() { return contentLoadRequest(); };
//     function finishLoad(routes) { return contentLoadFinish(routes); };

//     actionFetch(fetchMyRoutes, dispatch, request, success, failure, requestContent, finishLoad)
//   }
// }

const saveUser = (values) => save(API_PATHS.USERS.CRUD_USERS, values);
const updateUser = (uuid, values) => update(API_PATHS.USERS.CRUD_USERS_UPDATE, uuid, values);
const deleteUserById = (uuid) => deleteById(API_PATHS.USERS.CRUD_USERS_DELETE, uuid);
const getUserById = (uuid) => getById(API_PATHS.USERS.CRUD_USERS_GET_BY_ID, uuid);
const getUserAll = (params) => getAll(API_PATHS.USERS.CRUD_USERS, params);


export { saveUser, getUserById, getUserAll, updateUser , deleteUserById};