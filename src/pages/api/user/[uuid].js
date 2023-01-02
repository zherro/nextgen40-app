import { fetchDelete, fetchGet, fetchUpdate, methodNotAllowed } from '../api.util';
import { HOST_PATH, API_HOST } from '../host.environment';

export default async function handler(req, res) {

    const query = req.query;

    switch (req.method) {
        case 'GET':
            await fetchGet(`${API_HOST}${HOST_PATH.USERS.GET_USER}${query?.uuid}`, req, res);
            break;
        case 'PUT':
            await fetchUpdate(`${API_HOST}${HOST_PATH.USERS.GET_USER}${query?.uuid}`, req, res);
            break;
        case 'DELETE':
            await fetchDelete(`${API_HOST}${HOST_PATH.USERS.GET_USER}${query?.uuid}`, req, res);
            break;

        default:
            await methodNotAllowed(res);
            break;
    }

    // console.log(axiosConfigAuth({"Authorization" : req.headers['authorization']}))
}
