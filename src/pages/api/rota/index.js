import { axiosConfigAuth, fetchPost, handleError, readResponse } from '../api.util';
import { HOST_PATH, API_HOST } from '../host.environment';

export default async function handler(req, res) {
    
    switch (req.method) {
        case 'POST':
            await fetchPost(`${API_HOST}${HOST_PATH.ROUTES.POST_ROUTES}`, req, res);
            break;
    
        default:
            break;
    }

    // console.log(axiosConfigAuth({"Authorization" : req.headers['authorization']}))
}
