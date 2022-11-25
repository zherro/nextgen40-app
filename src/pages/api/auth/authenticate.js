import axios from "axios";

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

export default async function handler(req, res) {

    if (req.method === 'POST') {
        await axios.post("http://localhost:8080/api/auth/signin", req.body, axiosConfig)
            .then((response) => {
                res.status(200).json(response.data);
            }).catch((error) => {
                if(error.code >= 400 && error.code < 500) {
                    res.status(error.code).json({
                        error: "REQUEST_TYPE_ERROR",
                        message: "Unexpected error!"
                    });
                } else if (error.code >= 500 && error.code < 600) {
                    res.status(error.code).json({
                        error: "REQUEST_TYPE_ERROR",
                        message: "Internal server error!"
                    });
                } else {
                    res.status(500).json({
                        error: "REQUEST_TYPE_ERROR",
                        message: "Internal server error!"
                    });
                }
                
            })
    } else {
        res.status(400).json({
            code: "REQUEST_TYPE_ERROR",
            message: "Operacao invalida!"
        });
    }
}
