import { handleResponse } from "@/helpers/service.helper";
import { API_PATHS, APP_HOST } from "../config/api.environment";
import { authHeader } from '@/helpers/service.helper';


const fetchMyRoutes = () => {

    let token = authHeader();
    
    let requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            ...token
        },
    };

    return fetch(`${APP_HOST}${API_PATHS.ROUTES.GET_MY_ROUTES}`, requestOptions)
        .then(handleResponse);
}

export { fetchMyRoutes };