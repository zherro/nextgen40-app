const axios = require('axios').default

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

const axiosConfigAuth = (token) => {
    return {
        withCredentials: true,
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
        console.log('error.response.status')
        console.log(error.response.status)
        res.status(error.response.status).json({
            error: true,
            code: error?.response?.data?.code,
            message: error?.response?.data?.detail,
        });
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        res.status(500).json({
            error: true,
            code: "REQUEST_TYPE_ERROR",
            message: "Server host Off!"
        });
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        res.status(500).json({
            error: true,
            code: "REQUEST_TYPE_ERROR",
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

const handleResponse = async (promise, res) => {
    promise.then((response) => {
        readResponse(res, response)
    })
    .catch((error) => {
        handleError(res, error)
    });
}

const fetchGet = async (route, req, res ) => {
    let request = axios.get(`${route}`, axiosConfigAuth({"Authorization" : req.headers['authorization']}));
    await handleResponse(request, res);
}

const fetchPost = async (route, req, res ) => {
    let request = axios.post(`${route}`, req.body, axiosConfigAuth({"Authorization" : req.headers['authorization']}));
    await handleResponse(request, res);
}

const fetchUpdate = async (route, req, res ) => {
    let request = axios.put(`${route}`, req.body, axiosConfigAuth({"Authorization" : req.headers['authorization']}));
    await handleResponse(request, res);
}

export {
    axiosConfig, axiosConfigAuth, handleError,
    readResponse, invalidOperationResponse,
    validatePost, validateGet,
    fetchGet, fetchPost, fetchUpdate
};