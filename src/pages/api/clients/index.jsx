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
            await fetchPost(`${API_HOST}${HOST_PATH.CLIENT.PATH}`, req, res);
            break;
        case 'GET':
            await fetchGet(`${API_HOST}${HOST_PATH.CLIENT.PATH_WITH_PARAM}${serializeToQuery(req.query)}`, req, res);
            break;
    
        default:
            await methodNotAllowed(res);
            break;
    }
}
