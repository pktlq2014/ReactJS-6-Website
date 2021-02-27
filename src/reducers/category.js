import * as types from "../constants/index";
// nhận data từ server
const initialState = [];
var category = (state = initialState, action) => {
  switch (action.type) {
    case types.authConstants.CATEGORY: {
      console.log(action);
      state = action.data;
      return state;
    }
    default: return state;
  }
};
export default category;
