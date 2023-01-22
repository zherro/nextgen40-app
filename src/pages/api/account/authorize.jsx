import {
    fetchGet,
    fetchPost,
    methodNotAllowed,
    serializeToQuery
} from '../api.util';
import { HOST_PATH, API_HOST } from '../host.environment';

export default async function handler(req, res) {

    switch (req.method) {
        case 'POST':
            await fetchPost(`${API_HOST}${HOST_PATH.ROUTES.POST_AUTHORIZE_ROUTES}`, req, res);
            break;
        
        default:
            await methodNotAllowed(res);
            break;
    }

    // console.log(axiosConfigAuth({"Authorization" : req.headers['authorization']}))
}
