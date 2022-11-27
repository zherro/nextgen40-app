import { contentLoadFinish, contentLoadRequest } from "../../context/reducer/contentLoadSlice";
import { routesFailure, routesRequest, routesSuccess } from "../../context/reducer/routesSlice";
import { fetchMyRoutes } from "../services/routes.service";

const retrieveMyRoutes = () => {
  return dispatch => {
    dispatch(requestContent());
    dispatch(request());

    fetchMyRoutes()
      .then(route => {
        if (route.error || route.errors) {
          dispatch(failure(route));
        } else if (!route.error && !route.errors && route.accessToken) {
          dispatch(success(route));
        };
        dispatch(finishLoad());
      })
      .catch(error => {
        dispatch(failure(error.data));
        dispatch(finishLoad());
      });
  };

  function request() {return routesRequest(); };
  function success(routes) { return routesSuccess(routes); };
  function failure(error) { return routesFailure(error); };

  function requestContent() {return contentLoadRequest(); };
  function finishLoad(routes) { return contentLoadFinish(routes); };
};

export { retrieveMyRoutes };