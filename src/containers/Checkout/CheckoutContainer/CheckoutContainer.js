import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/index";
import CheckoutList from "./../CheckoutList/CheckoutList";
class CheckoutContainer extends Component {
  render() {
    var {
      address,
      onOrder,
      onCartDelete,
      onAddress,
      onCart,
      onDeleteProductCart,
      onDeleteAddress,
      signin,
      history,
      cart,
    } = this.props;
    return (
      <CheckoutList
        cart={cart}
        onDeleteAddress={onDeleteAddress}
        onAddress={onAddress}
        onDeleteProductCart={onDeleteProductCart}
        signin={signin}
        onCart={onCart}
        onCartDelete={onCartDelete}
        history={history}
        onOrder={onOrder}
        address={address}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    address: state.address,
    signin: state.signin,
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddress: (data) => {
      dispatch(actions.updateCategoryAPI(data));
    },
    onDeleteAddress: (data) => {
      dispatch(actions.deleteCategoryAPI(data));
    },
    onCart: (data, index) => {
      dispatch(actions.quantityUpdateReducers(data, index));
    },
    onDeleteProductCart: (index) => {
      dispatch(actions.deleteProductReducers(index));
    },
    onOrder: (data) => {
      dispatch(actions.orderAPI(data));
    },
    onCartDelete: (data) => {
      dispatch(actions.cartDeleteReducers(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
