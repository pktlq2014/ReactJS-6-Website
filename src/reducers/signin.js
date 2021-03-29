import * as types from "../constants/index";
// nhận data từ server
const initialState = [];
var signup = (state = initialState, action) => {
  switch (action.type) {
    case types.authConstants.LOGIN: {
        console.log(action);
        state = action.data;
        return state;
    }
    case types.authConstants.ACCOUNT: {
      console.log(action);
      state.push(action.data);
      return [...state];
    }
    case types.authConstants.ADDRESS: {
      console.log(action);
      state.forEach((values, index) => {
        if(values.email === action.data.email) {
          var object = {
            id : action.data.id,
            email : action.data.email,
            password : action.data.password,
            lastname : action.data.lastname,
            firstname : action.data.firstname,
            repassword : action.data.repassword,
            phone : action.data.phone,
            radio : action.data.radio,
            role : action.data.role,
            address : action.data.address
          }
          values = object;
        }
      });
      return [...state];
    }
    case types.authConstants.DELETE_ADDRESS: {
      console.log(action);
    }
    default: return state;
  }
};
export default signup;
