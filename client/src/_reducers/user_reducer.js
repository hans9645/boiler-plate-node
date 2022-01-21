import { LOGIN_USER, REGISTER_USER } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    //다른 타입이 올 때마다 다른 조치를 취해줘야해서 스위치 문법 사용.
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;
    case REGISTER_USER:
      return { ...state, register: action.payload };

    default:
      return state;
  }
}
