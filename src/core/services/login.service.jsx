import { handleResponse, loginUser } from "@/helpers/service.helper";
import { API_PATHS } from "../config/api.environment";


const loginUserAuth = (user) => {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(user)
    };

    return fetch(API_PATHS.LOGIN.BASIC_PATH_LOGIN, requestOptions)
        .then(handleResponse)
        .then(loginUser)
}

export { loginUserAuth };