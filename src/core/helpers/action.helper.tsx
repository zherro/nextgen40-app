import { logoutRequest } from "src/context/reducer/loginSlice";
import { STORAGE_KEYS } from '../config/api.environment';
import { isValidJson } from "./json.helper";


const actionFetch = (fetch, dispatch, request, success, failure, requestContent, finishLoad) => {
    dispatch(requestContent());
    dispatch(request());

    return fetch()
        .then(response => {
            console.log(response)
            if (response.error || response.errors) {
                console.log('ERROR ERROR 1');
                dispatch(failure(response));
                if (response?.error && response?.code == 'AUTH_ERROR') {
                    dispatch(logoutRequest());
                    localStorage.setItem(STORAGE_KEYS.LOGOUT, true);
                }
            } else if (!response.error && !response.errors) {
                dispatch(success(response));
            };
            dispatch(finishLoad());
        })
        .catch(error => {
            console.log('ERROR ERROR 2');
            console.log(error)
            if (error == undefined || !isValidJson(error)) {
                dispatch(failure({
                    error: true,
                    code: "REQUEST_TYPE_ERROR",
                    message: "Falha ao se comunicar com servidor!"
                }));
            } else {
                if (error?.error && error?.code == 'AUTH_ERROR') {
                    dispatch(logoutRequest());
                    localStorage.setItem(STORAGE_KEYS.LOGOUT, true);
                }
                dispatch(failure(error.data));
            }
            dispatch(finishLoad());
        });
};

const serializeToQuery = (obj) => {

    if (!obj || obj == null || obj == undefined) {
        return '';
    }

    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return "?" + str.join("&");
}

export {
    actionFetch,
    serializeToQuery
};