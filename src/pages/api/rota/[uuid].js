import { fetchGet, fetchUpdate } from '../api.util';
import { HOST_PATH, API_HOST } from '../host.environment';

export default async function handler(req, res) {

    const query = req.query;

    switch (req.method) {
        case 'GET':
            await fetchGet(`${API_HOST}${HOST_PATH.ROUTES.GET_ROUTE}${query?.uuid}`, req, res);
            break;
        case 'PUT':
            await fetchUpdate(`${API_HOST}${HOST_PATH.ROUTES.GET_ROUTE}${query?.uuid}`, req, res);
            break;

        default:
            break;
    }

    // console.log(axiosConfigAuth({"Authorization" : req.headers['authorization']}))
}
