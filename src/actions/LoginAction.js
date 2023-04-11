import axios from "axios";
import { onLoading, onSystemLoading } from "./LoadingAction";
export const UPDATE_EMAIL = "loginReducer/UPDATE_EMAIL";
export const UPDATE_PASSWORD = "loginReducer/UPDATE_PASSWORD";
export const ON_LOGGEDIN = "loginReducer/ON_LOGGEDIN";
export const GET_USER = "loginReducer/GET_USER"

export const updateEmail = (val) => (disptch) => {
  disptch({
    type: UPDATE_EMAIL,
    payload: val,
  });
};

export const updatePassword = (val) => (disptch) => {
  disptch({
    type: UPDATE_PASSWORD,
    payload: val,
  });
};

export const onLoggedin = (val) => (disptch) => {
  disptch({
    type: ON_LOGGEDIN,
    payload: val,
  });
};

export const onLoginSubmit = ({ email, password }) => (dispatch) => {
  dispatch(onLoading(true))

  return axios.post(`${process.env.REACT_APP_AUTH_SERVICE}/signin`, { email, password })
}

export const getUser = (token) => (dispatch) => {
  dispatch(onSystemLoading(true))

  axios.get(`${process.env.REACT_APP_AUTH_SERVICE}/me`, {
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data.user
      })
      dispatch(onSystemLoading(false))
    })
    .catch(e => {
      localStorage.removeItem('token')
      dispatch(onSystemLoading(false))
    })
}

export const onLogOut = (token, userId) => (dispatch) => {
  return axios.post(`${process.env.REACT_APP_AUTH_SERVICE}/logout`)
}