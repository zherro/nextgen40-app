import { toastFinish, toastRequest } from '../../context/reducer/toastSlice';

const pushToast = (message) => {
    return dispatch => {
        dispatch(request(message));

        function request(message) { return toastRequest(message); };
    }
}

const clearToast = () => {
    return dispatch => {
        dispatch(finish());

        function finish() { return toastFinish(); };
    }
}

export { pushToast, clearToast }