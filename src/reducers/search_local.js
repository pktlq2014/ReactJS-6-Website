import * as types from "../constants/index";
var initialState = {
  search_product_name_local: "",
  sort_price_local: -1,
  range_price_local: "",
  star_local: 0,
  sales_local: 0,
  status: 0,
  statusSales_local: 0
};
var search_local = (state = initialState, action) => {
  switch (action.type) {
    case types.authConstants.SEARCH_LOCAL: {
      console.log(action);
      var data = {
        search_product_name_local: action.data.search_product_name_local,
        sort_price_local: action.data.sort_price_local,
        range_price_local: action.data.range_price_local,
        star_local: action.data.star_local,
        sales_local: action.data.sales_local,
        status: action.data.status,
        statusSales_local: action.data.statusSales_local
      };
      state = data;
      console.log(state);
      return state;
    }
    default:
      return state;
  }
};
export default search_local;
