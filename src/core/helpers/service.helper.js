
import { STORAGE_KEYS } from '../config/api.environment';

const handleResponse = (response) => {
    return response.json();
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

const authHeader = () => {
    let user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));

    if (user && user.accessToken) {
        return { 'Authorization': 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
};


export { handleResponse, loginUser, logoutUser, authHeader, getUserRoutes, userIsAdmin };