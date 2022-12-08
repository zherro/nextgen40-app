import { fetchPost } from '../api.util';
import { HOST_PATH, API_HOST } from '../host.environment';

export default async function handler(req, res) {
    
    console.log('ROTA ROUTE')
    console.log(req)

    switch (req.method) {
        case 'POST':
            console.log('ROTA.POST')
            await fetchPost(`${API_HOST}${HOST_PATH.ROUTES.POST_ROUTES}`, req, res);
            break;
    
        default:
            break;
    }

    // console.log(axiosConfigAuth({"Authorization" : req.headers['authorization']}))
}
