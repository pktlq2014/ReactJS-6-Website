import * as types from '../constants/index';
// tạo 1 object trên local để kiểm tra trường hợp và so sánh đăng nhập
var data = JSON.parse(localStorage.getItem('cart'));
const initialState = data ? data : [];
var cart = (state = initialState, action) => {
    switch(action.type) {
        case types.authConstants.CART: {
            console.log(action);
            // state = action.data;
            state.push(action.data);
            console.log(state);
            localStorage.setItem('cart', JSON.stringify(state));
            return [...state];
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
export default cart;