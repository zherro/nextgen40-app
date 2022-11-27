import { axiosConfigAuth, handleError, readResponse, validateGet } from '../api.util';
import { HOST_PATH, API_HOST } from '../host.environment';
const axios = require('axios').default


export default async function handler(req, res) {
    validateGet(req, res);

    // console.log(axiosConfigAuth({"Authorization" : req.headers['authorization']}))

    await axios.get(`${API_HOST}${HOST_PATH.ROUTES.GET_MY_ROUTES}`, axiosConfigAuth({"Authorization" : req.headers['authorization']}))
        .then((response) => {
            console.log(response.code)
            readResponse(res, response)
        })
        .catch((error) => {
            console.log('LENDO ERRO:' + error)
            handleError(res, error)
        });
}
