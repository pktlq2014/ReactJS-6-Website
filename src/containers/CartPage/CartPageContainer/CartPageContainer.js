import React, { Component } from "react";
import * as actions from "./../../../actions/index";
import { connect } from "react-redux";
import CartPageList from "./../CartPageList/CartPageList";
class CartPageContainer extends Component {
  componentDidMount() {
    this.props.onCart();
  }
  render() {
    var { cart, onCart, onDeleteProductCart } = this.props;
    return (
      <CartPageList
        onCart={onCart}
        onDeleteProductCart={onDeleteProductCart}
        cart={cart}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onCart: (data, index) => {
      dispatch(actions.quantityUpdateReducers(data, index));
    },
    onDeleteProductCart: (index) => {
      dispatch(actions.deleteProductReducers(index));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartPageContainer);
