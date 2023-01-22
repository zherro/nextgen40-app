import axios from "axios";
import { axiosConfig, handleError, readResponse, validatePost } from "../api.util";
import { HOST_PATH, API_HOST } from '../host.environment';

export default async function handler(req, res) {
    validatePost(req, res);

    await axios.post(`${API_HOST}${HOST_PATH.LOGIN.BASIC_PATH_LOGIN}`, req.body, axiosConfig)
    .then((response) => readResponse(res, response))
    .catch((error) => handleError(error));
}
