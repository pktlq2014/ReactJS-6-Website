import * as types from "../constants/index";
// nhận data từ server
const initialState = {
  key : ''
}
var search_total = (state = initialState, action) => {
  switch (action.type) {
    case types.authConstants.SEARCH_TOTAL: {
      console.log(action);
      // state = action.data;
      // return state;
    }
    default: return state;
  }
};
export default search_total;
