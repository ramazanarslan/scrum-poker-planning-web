import {put, call} from "redux-saga/effects";
import {message} from "antd";
import * as actionTypes from "../actionTypes";
import api from "../../services/api";

export function* tryLogin({payload}) {
  yield put({type: actionTypes.LOGIN_BEGIN});

  try {
    const response = yield call(() =>
      api._doPost("/auth/staff/login", payload)
    );

    const {data} = response;
    localStorage.setItem("ky-sk-token", data.tokenstaff);

    yield put({
      type: actionTypes.LOGIN_SUCCESS,
      payload: data.user
    });
  } catch (error) {
    message.error(error.message || error || "Login Failed!");
    yield put({
      type: actionTypes.LOGIN_FAILURE
    });
  }
}

export function* tryAutoLogin() {
  yield put({type: actionTypes.AUTO_LOGIN_BEGIN});
  try {
    const response = yield call(() =>
      api._doGetWithAuth("/auth/staff/profile")
    );
    yield put({type: actionTypes.AUTO_LOGIN_SUCCESS, payload: response.data});
  } catch {
    yield put({type: actionTypes.AUTO_LOGIN_FAILURE});
  }
}

export function* logout() {
  try {
    localStorage.setItem("ky-sk-token", null);
    yield put({type: actionTypes.LOGOUT_SUCCESS});
  } catch {
    message.error("Logout Error!");
  }
}

export function* tryGoogleLogin() {
  try {
    const user = window.gapi.auth2.getAuthInstance().currentUser.get();
    const email = user.getBasicProfile().getEmail();
    const accessToken = user.getAuthResponse().access_token;
    yield put({
      type: actionTypes.GOOGLE_LOGIN_SUCCESS,
      payload: {email, accessToken}
    });
  } catch {}
}
