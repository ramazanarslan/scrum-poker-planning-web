import * as actionTypes from "../actionTypes";

const initialState = {
  loggedIn: false,
  user: null,
  autoLoginInProgress: true,
  loginInProgress: false,

  googleUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTO_LOGIN_BEGIN:
      return {...state, autoLoginInProgress: true};

    case actionTypes.AUTO_LOGIN_SUCCESS:
      return {
        ...state,
        autoLoginInProgress: false,
        user: action.payload,
        loggedIn: true
      };

    case actionTypes.AUTO_LOGIN_FAILURE:
      return {
        ...state,
        autoLoginInProgress: false,
        loggedIn: false,
        user: null
      };

    case actionTypes.LOGIN_BEGIN:
      return {...state, loginInProgress: true};

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loginInProgress: false,
        user: action.payload,
        loggedIn: true
      };

    case actionTypes.LOGIN_FAILURE:
      return {...state, loginInProgress: false, loggedIn: false, user: null};

    case actionTypes.LOGOUT_SUCCESS:
      return {...state, user: null, loggedIn: false};

    case actionTypes.GOOGLE_LOGIN_SUCCESS:
      return {...state, googleUser: action.payload};
    case actionTypes.GOOGLE_LOGOUT:
      return {...state, googleUser: null};
    default:
      return state;
  }
};
