import {
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  ON_LOGGEDIN,
  GET_USER
} from "../actions/LoginAction";

export const initialState = {
  email: "",
  password: "",
  isLoggedin: false,
  user: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EMAIL: {
      return {
        ...state,
        email: action.payload,
      };
    }

    case UPDATE_PASSWORD: {
      return {
        ...state,
        password: action.payload,
      };
    }

    case ON_LOGGEDIN: {
      return {
        isLoggedin: action.payload,
      };
    }

    case GET_USER: {
      return {
        ...state,
        user: action.payload
      }
    }

    default:
      return state;
  }
};
export default loginReducer;
