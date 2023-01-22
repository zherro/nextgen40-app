import { fetchDelete, fetchGet, fetchUpdate, methodNotAllowed } from '../api.util';
import { HOST_PATH, API_HOST } from '../host.environment';

export default async function handler(req, res) {

    const query = req.query;

    switch (req.method) {
        case 'GET':
            await fetchGet(`${API_HOST}${HOST_PATH.ACCOUNT.PATH_WITH_PARAM}${query?.uuid}`, req, res);
            break;
        case 'PUT':
            await fetchUpdate(`${API_HOST}${HOST_PATH.ACCOUNT.PATH_WITH_PARAM}${query?.uuid}`, req, res);
            break;
        case 'DELETE':
            await fetchDelete(`${API_HOST}${HOST_PATH.ACCOUNT.PATH_WITH_PARAM}${query?.uuid}`, req, res);
            break;

        default:
            await methodNotAllowed(res);
            break;
    }
}
