import { loginFailure, loginRequest, loginSuccess } from "../../context/reducer/loginSlice";
import { loginUserAuth } from "../services/login.service";

const loginAuth = (user) => {
  console.log('action login')
  return dispatch => {
    dispatch(request(user));

    loginUserAuth(user)
      .then(user => {
        if (user.error || user.errors) {
          dispatch(failure(user));
        } else if (!user.error && !user.errors && user.accessToken) {
          dispatch(success(user));
        };
      })
      .catch(error => {
        dispatch(failure(error.data));
      });
  };

  function request(user) { return loginRequest(user); };
  function success(user) { return loginSuccess(user); };
  function failure(error) { return loginFailure(error); };
};

const logoutAuth = () => {
  localStorage.clear();
}

export { loginAuth, logoutAuth };