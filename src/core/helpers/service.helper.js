
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


export { handleResponse, loginUser, logoutUser };