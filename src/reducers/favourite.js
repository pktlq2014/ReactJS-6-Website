import * as types from '../constants/index';
// tạo 1 object trên local để kiểm tra trường hợp và so sánh đăng nhập
var dataLogin = JSON.parse(localStorage.getItem('favourite'));
const initialState = dataLogin;
var favourite = (state = initialState, action) => {
    switch(action.type) {
        case types.authConstants.FAVOURITE: {
            state = action.data;
            console.log(state);
            //localStorage.setItem('dataLogin', JSON.stringify(state));
            return state;
        }
        // case types.authConstants.SIGNOUT: {
        //     console.log(action);
        //     if(action.data === 0) {
        //         localStorage.clear();
        //         state = null;
        //     }
        //     return state;
        // }
        default : return state;
    }
}
export default favourite;