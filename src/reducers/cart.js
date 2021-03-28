import * as types from "../constants/index";
// tạo 1 object trên local để kiểm tra trường hợp và so sánh đăng nhập
var data = JSON.parse(localStorage.getItem("cart"));
const initialState = data ? data : [];
var cart = (state = initialState, action) => {
  switch (action.type) {
    case types.authConstants.CART: {
      console.log(action);
      // state = action.data;
      state.push(action.data);
      console.log(state);
      localStorage.setItem("cart", JSON.stringify(state));
      return [...state];
    }
    case types.authConstants.QUANTITY_UPDATE: {
      console.log(action);
      state[action.index] = action.data;
      localStorage.setItem("cart", JSON.stringify(state));
      return [...state];
      // if(action.data === 0) {
      //     localStorage.clear();
      //     state = null;
      // }
      // return state;
    }
    case types.authConstants.DELETE_PRODUCT: {
      console.log(action);
      state.splice(action.index, 1);
      localStorage.setItem("cart", JSON.stringify(state));
      return [...state];
    }
    default:
      return state;
  }
};
export default cart;
