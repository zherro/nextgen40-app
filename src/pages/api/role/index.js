import {
    fetchGet,
    fetchPost,
    methodNotAllowed,
    serializeToQuery
} from '../api.util';
import { HOST_PATH, API_HOST } from '../host.environment';

export default async function handler(req, res) {
    
    switch (req.method) {
        case 'GET':
            await fetchGet(`${API_HOST}${HOST_PATH.ROLES.GET_ROLES}${serializeToQuery(req.query)}`, req, res);
            break;
    
        default:
            await methodNotAllowed(res);
            break;
    }

    // console.log(axiosConfigAuth({"Authorization" : req.headers['authorization']}))
}
