/* eslint-disable prettier/prettier */
import { AUTHENTICATE, LOGOUT} from "../actions/auth";

const initialState={
    token: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
      case AUTHENTICATE:
        return {
          token: action.token,
          name: action.name,
          tarjeta: action.tarjeta
        };
      case LOGOUT:
        return initialState;
      default:
        return state;
    }
  };