import * as types from "../constants/index";
// nhận data từ server
const initialState = [];
var orders = (state = initialState, action) => {
  switch (action.type) {
    case types.authConstants.ORDERS: {
      console.log(action);
      state = action.data;
      return state;
    }
    case types.authConstants.DELETE_ORDERS: {
      console.log(action);
      state.forEach((values, index) => {
        if(values.id === action.data.id) {
          state.splice(index, 1);
        }
      });
      return [...state];
    }
    default: return state;
  }
};
export default orders;
