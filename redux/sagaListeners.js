import { takeEvery, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";

import { tryLogin, tryAutoLogin, tryGoogleLogin, logout } from "./Auth/saga";

export default function* watchSagas() {
  yield takeEvery(actionTypes.AUTO_LOGIN, tryAutoLogin);
  yield takeEvery(actionTypes.LOGIN, tryLogin);
  yield takeEvery(actionTypes.LOGOUT, logout);
  yield takeEvery(actionTypes.GOOGLE_LOGIN, tryGoogleLogin);
}
