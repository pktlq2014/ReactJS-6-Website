import * as types from "./../constants/index";
import axios from "./../helpers/axios/axios";
import API from './../utils/API';
export const categoryAPI = () => {
    return async (dispatch) => {
      return API('category', 'GET', null).then(res => {
          console.log(res);
          dispatch(categoryReducers(res.data));
      });
    };
  };
  export const categoryReducers = (data) => {
      return {
          type : types.authConstants.CATEGORY,
          data : data
      }
  }
  export const productAPI = () => {
    return async (dispatch) => {
      return API('product', 'GET', null).then(res => {
          console.log(res);
          dispatch(productReducers(res.data));
      });
    };
  };
  export const productReducers = (data) => {
      return {
          type : types.authConstants.PRODUCT,
          data : data
      }
  }