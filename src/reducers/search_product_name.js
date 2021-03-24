import * as types from "../constants/index";
var initialState = {
  name: "",
  sort_price: -1,
  range_price: "",
  star: 0,
  sales: 0
};
var search_product_name = (state = initialState, action) => {
  switch (action.type) {
    case types.authConstants.SEARCH_PRODUCT_NAME: {
      console.log(action);
      var data = {
        name: action.data.name.toLowerCase(),
        sort_price : action.data.sort_price,
        range_price : action.data.range_price,
        star: action.data.star,
        sales: action.data.sales
      };
      state = data;
      console.log(state);
      return state;
    }
    default:
      return state;
  }
};
export default search_product_name;
