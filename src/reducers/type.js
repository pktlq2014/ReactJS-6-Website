import * as types from "../constants/index";
// nhận data từ server
const initialState = [];
var type = (state = initialState, action) => {
  switch (action.type) {
    case types.authConstants.TYPE: {
      console.log(action);
      state = action.data;
      return state;
    }
    default: return state;
  }
};
export default type;
