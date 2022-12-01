
import { APP_HOST, STORAGE_KEYS } from '../config/api.environment';

const handleResponse = (response) => {
    console.log(response)
    if(response?.status == 401) {
        return {
            error: true,
            code: "AUTH_ERROR",
            message: "Operacao nao autorizada!"
        };
    } else {
        return response.json();
    }    
};

const loginUser = (user) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
};

const logoutUser = () => {
    localStorage.clear();
    window.location.reload();
};

const getUser = () => {
    let user = localStorage.getItem(STORAGE_KEYS.USER);
    if(!user || user === undefined || !JSON.parse(user)) {
        logoutUser();
        return null;
    }
    return JSON.parse(user);
}

const getUserRoutes = () => {
    return getUser()?.routes;
}

const userIsAdmin = () => {
    return getUser()?.roles.indexOf('ROLE_ADMIN') >= 0;
}

const userHasRole = (role) => {
    return getUser()?.roles.indexOf(role) >= 0;
}

const authHeader = () => {
    let user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));

    if (user && user.accessToken) {
        return { 'Authorization': 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
};



const fetchPost = (route, values) => {

    let token = authHeader();
    
    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            ...token
        },
        body: JSON.stringify(values)
    };
    console.log('aaa')
    return fetch(`${APP_HOST}${route}`, requestOptions)
        .then(handleResponse);
}


export {
    handleResponse, loginUser, logoutUser,
    authHeader, getUserRoutes, userIsAdmin,
    userHasRole, fetchPost
};