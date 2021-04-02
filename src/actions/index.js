import * as types from "./../constants/index";
import axios from "./../helpers/axios/axios";
import API from "./../utils/API";
import APIz from "./../utils/APIz";
export const categoryAPI = () => {
  return async (dispatch) => {
    return API("category", "GET", null).then((res) => {
      console.log(res);
      if (res && res.data) {
        dispatch(categoryReducers(res.data));
      }
    });
  };
};
export const categoryReducers = (data) => {
  return {
    type: types.authConstants.CATEGORY,
    data: data,
  };
};
export const productAPI = () => {
  return async (dispatch) => {
    return API("product", "GET", null).then((res) => {
      console.log(res);
      if (res && res.data) {
        dispatch(productReducers(res.data));
      }
    });
  };
};
export const productReducers = (data) => {
  return {
    type: types.authConstants.PRODUCT,
    data: data,
  };
};
export const typeAPI = () => {
  return async (dispatch) => {
    return API("page", "GET", null).then((res) => {
      console.log(res);
      if (res && res.data) {
        dispatch(typeReducers(res.data));
      }
    });
  };
};
export const typeReducers = (data) => {
  return {
    type: types.authConstants.TYPE,
    data: data,
  };
};
export const signUpAPI = (data) => {
  return (dispatch) => {
    // thời gian lấy dữ liệu từ server về lâu hơn thời gian lấy dữ liệu
    // rồi truyền vào dispatch, nên sinh ra lỗi middleware
    // hay nói cách khác là khi truyền dữ liệu từ server vào dispatch nhanh quá
    // lúc này chưa có dữ liệu để truyền vào dispatch
    // middleware là lớp nằm giữa reducers và dispatch actions
    // giúp fetch dữ liệu xong mới dispatch actions
    return API("api", "POST", data).then((res) => {
      console.log(data);
      if (res && res.data) {
        dispatch(signUpReducers(res.data));
      }
    });
  };
};
export const signUpReducers = (data) => {
  return {
    type: types.authConstants.ACCOUNT,
    data: data,
  };
};
export const signinAPI = (data) => {
  return (dispatch) => {
    // thời gian lấy dữ liệu từ server về lâu hơn thời gian lấy dữ liệu
    // rồi truyền vào dispatch, nên sinh ra lỗi middleware
    // hay nói cách khác là khi truyền dữ liệu từ server vào dispatch nhanh quá
    // lúc này chưa có dữ liệu để truyền vào dispatch
    // middleware là lớp nằm giữa reducers và dispatch actions
    // giúp fetch dữ liệu xong mới dispatch actions
    return API("api", "GET", null).then((res) => {
      console.log(data);
      if (res && res.data) {
        dispatch(signinReducers(res.data));
      }
    });
  };
};
export const signinReducers = (data) => {
  return {
    type: types.authConstants.LOGIN,
    data: data,
  };
};
export const statusLogin = (data) => {
  return {
    type: types.authConstants.STATUS_LOGIN,
    data: data,
  };
};
export const cartReducers = (data) => {
  return {
    type: types.authConstants.CART,
    data: data,
  };
};
export const questionAPI = (data) => {
  return (dispatch) => {
    // thời gian lấy dữ liệu từ server về lâu hơn thời gian lấy dữ liệu
    // rồi truyền vào dispatch, nên sinh ra lỗi middleware
    // hay nói cách khác là khi truyền dữ liệu từ server vào dispatch nhanh quá
    // lúc này chưa có dữ liệu để truyền vào dispatch
    // middleware là lớp nằm giữa reducers và dispatch actions
    // giúp fetch dữ liệu xong mới dispatch actions
    return API(`product/${data.id}`, "PUT", data).then((res) => {
      console.log(data);
      if (res && res.data) {
        dispatch(questionReducers(res.data));
      }
    });
  };
};
export const questionReducers = (data) => {
  return {
    type: types.authConstants.QUESTION,
    data: data,
  };
};
export const favouriteReducers = (data) => {
  return {
    type: types.authConstants.FAVOURITE,
    data: data,
  };
};
export const notificationShowAPI = () => {
  return async (dispatch) => {
    return APIz("notification", "GET", null).then((res) => {
      console.log(res);
      if (res && res.data) {
        dispatch(notificationShowReducers(res.data));
      }
    });
  };
};
export const notificationShowReducers = (data) => {
  return {
    type: types.authConstants.NOTIFICATION_SHOW,
    data: data,
  };
};
export const searchProductNameReducers = (data) => {
  return {
    type: types.authConstants.SEARCH_PRODUCT_NAME,
    data: data,
  };
};
export const searchTotalReducers = (data) => {
  return {
    type: types.authConstants.SEARCH_TOTAL,
    data: data,
  };
};
export const searchLocalReducers = (data) => {
  return {
    type: types.authConstants.SEARCH_LOCAL,
    data: data,
  };
};
export const quantityUpdateReducers = (data, index) => {
  return {
    type: types.authConstants.QUANTITY_UPDATE,
    data: data,
    index: index,
  };
};
export const deleteProductReducers = (index) => {
  return {
    type: types.authConstants.DELETE_PRODUCT,
    index: index,
  };
};
export const updateCategoryAPI = (address) => {
  return (dispatch) => {
    // thời gian lấy dữ liệu từ server về lâu hơn thời gian lấy dữ liệu
    // rồi truyền vào dispatch, nên sinh ra lỗi middleware
    // hay nói cách khác là khi truyền dữ liệu từ server vào dispatch nhanh quá
    // lúc này chưa có dữ liệu để truyền vào dispatch
    // middleware là lớp nằm giữa reducers và dispatch actions
    // giúp fetch dữ liệu xong mới dispatch actions
    return API(`api/${address.id}`, "PUT", address).then((res) => {
      console.log(address);
      if (res && res.data) {
        dispatch(updateAddressReducers(res.data));
      }
    });
  };
};
export const updateAddressReducers = (data) => {
  return {
    type: types.authConstants.ADDRESS,
    data: data,
  };
};
export const deleteCategoryAPI = (address) => {
  return (dispatch) => {
    // thời gian lấy dữ liệu từ server về lâu hơn thời gian lấy dữ liệu
    // rồi truyền vào dispatch, nên sinh ra lỗi middleware
    // hay nói cách khác là khi truyền dữ liệu từ server vào dispatch nhanh quá
    // lúc này chưa có dữ liệu để truyền vào dispatch
    // middleware là lớp nằm giữa reducers và dispatch actions
    // giúp fetch dữ liệu xong mới dispatch actions
    return API(`api/${address.id}`, "DELETE", address).then((res) => {
      console.log(address);
      if (res && res.data) {
        dispatch(deleteAddressReducers(res.data));
      }
    });
  };
};
export const deleteAddressReducers = (data) => {
  return {
    type: types.authConstants.DELETE_ADDRESS,
    data: data,
  };
};
export const orderAPI = (data) => {
  return (dispatch) => {
    // thời gian lấy dữ liệu từ server về lâu hơn thời gian lấy dữ liệu
    // rồi truyền vào dispatch, nên sinh ra lỗi middleware
    // hay nói cách khác là khi truyền dữ liệu từ server vào dispatch nhanh quá
    // lúc này chưa có dữ liệu để truyền vào dispatch
    // middleware là lớp nằm giữa reducers và dispatch actions
    // giúp fetch dữ liệu xong mới dispatch actions
    return APIz("order", "POST", data).then((res) => {
      console.log(data);
      if (res && res.data) {
        dispatch(orderReducers(res.data));
      }
    });
  };
};
export const orderReducers = (data) => {
  return {
    type: types.authConstants.ORDER,
    data: data,
  };
};
export const cartDeleteReducers = (data) => {
  return {
    type: types.authConstants.CART_DELETE,
    data: data,
  };
};