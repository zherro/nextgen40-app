import { axiosConfigAuth, handleError, readResponse, validateGet } from '../api.util';
import { HOST_PATH, API_HOST } from '../host.environment';
const axios = require('axios').default


export default async function handler(req, res) {
    validateGet(req, res);

    await axios.get(`${API_HOST}${HOST_PATH.ACCOUNT.GET_ACTIVES}`, axiosConfigAuth({"Authorization" : req.headers['authorization']}))
        .then((response) => {
            readResponse(res, response)
        })
        .catch((error) => {
            handleError(res, error)
        });
}
