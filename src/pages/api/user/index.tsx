import {
    fetchGet,
    fetchPost,
    methodNotAllowed,
    serializeToQuery
} from '../api.util';
import { HOST_PATH, API_HOST } from '../host.environment';

export default async function handler(req, res) {
    
    console.log('USER ROUTE')
    console.log(req.query)

    switch (req.method) {
        case 'POST':
            console.log('USER.POST')
            await fetchPost(`${API_HOST}${HOST_PATH.USERS.POST_USERS}`, req, res);
            break;
        case 'GET':
            console.log('USER.GET')
            await fetchGet(`${API_HOST}${HOST_PATH.USERS.GET_USERS}${serializeToQuery(req.query)}`, req, res);
            break;
    
        default:
            await methodNotAllowed(res);
            break;
    }

    // console.log(axiosConfigAuth({"Authorization" : req.headers['authorization']}))
}
