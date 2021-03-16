import * as types from "../constants/index";
// nhận data từ server
const initialState = [];
var category = (state = initialState, action) => {
  switch (action.type) {
    case types.authConstants.PRODUCT: {
      console.log(action);
      state = action.data;
      return state;
    }
    // case types.authConstants.QUESTION: {
    //   console.log(action);
    //   //var data = [...state];
    //   state.forEach((values, index) => {
    //     if(values.id === action.data.id) {
    //       values = action.data;
    //     }
    //   });
    //   console.log(state);
    //   return [...state];
    // }
    default: return state;
  }
};
export default category;
