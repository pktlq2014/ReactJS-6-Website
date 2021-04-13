import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/index";
import HomePageList from "./../HomePageList/HomePageList";
class HomePageContainer extends Component {
  componentDidMount() {
    this.props.onProductAPI();
    this.props.onTypeAPI();
  }
  render() {
    var {
      onTypeAPI,
      onCart,
      onProductAPI,
      type,
      product,
      category,
      cart,
    } = this.props;
    return (
      <HomePageList
        onCart={onCart}
        type={type}
        cart={cart}
        category={category}
        product={product}
        onProductAPI={onProductAPI}
        onTypeAPI={onTypeAPI}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    type: state.type,
    product: state.product,
    category: state.category,
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onTypeAPI: () => {
      dispatch(actions.typeAPI());
    },
    onProductAPI: () => {
      dispatch(actions.productAPI());
    },
    onCart: (data) => {
      dispatch(actions.cartReducers(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
