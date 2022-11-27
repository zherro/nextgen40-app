import { STORAGE_KEYS } from "../../core/config/api.environment";

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

const axiosConfigAuth = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            ...token
        }
    }
};

const handleError = (res, error) => {
    if (error === undefined || error === null) return;

    const userIsUnauthorized = statusIsUnauthorized(error.code);
    if (userIsUnauthorized) logoutHelperUser();

    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        res.status(error.code).json({
            error: error.data.code,
            message: error.data.message,
        });
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        res.status(500).json({
            error: "REQUEST_TYPE_ERROR",
            message: "Server host Off!"
        });
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        res.status(500).json({
            error: "REQUEST_TYPE_ERROR",
            message: "Internal server error!"
        });

        console.log('Error', error.message);
    }
    console.log(error.config);

}

const logoutHelperUser = () => {
    localStorage.clear();
};

function statusIsUnauthorized(statusTarget) {
    if (statusTarget === 401 || statusTarget === 403 || statusTarget?.status === 500) return true;
    return false;
};

const readResponse = (res, response) => {
    res.status(200).json(response.data);
};

const invalidOperationResponse = (res) => {
    res.status(400).json({
        code: "REQUEST_TYPE_ERROR",
        message: "Invalid Operation!"
    });
}

const validatePost = (req, res) => {
    if (req.method !== 'POST') invalidOperationResponse(res);
};

const validateGet = (req, res) => {
    if (req.method !== 'GET') invalidOperationResponse(res);
};

export {
    axiosConfig, axiosConfigAuth, handleError,
    readResponse, invalidOperationResponse,
    validatePost, validateGet
};