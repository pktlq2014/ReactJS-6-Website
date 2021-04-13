import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
import ProductDetailsPageList from "./../ProductDetailPageList/ProductDetailsPageList";
class ProductDetailsPageContainer extends Component {
  componentDidMount() {
    this.props.onProductAPI();
  }
  render() {
    var {
      product,
      onFavourite,
      onQuestion,
      category,
      cart,
      favourite,
      history,
      signin,
      match,
      onProductAPI,
      onCart,
    } = this.props;
    return (
      <ProductDetailsPageList
        onFavourite={onFavourite}
        onQuestion={onQuestion}
        onCart={onCart}
        match={match}
        history={history}
        onProductAPI={onProductAPI}
        category={category}
        cart={cart}
        signin={signin}
        favourite={favourite}
        product={product}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    product: state.product,
    category: state.category,
    cart: state.cart,
    favourite: state.favourite,
    signin: state.signin,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onProductAPI: () => {
      dispatch(actions.productAPI());
    },
    onCart: (data) => {
      dispatch(actions.cartReducers(data));
    },
    onQuestion: (data) => {
      dispatch(actions.questionAPI(data));
    },
    onFavourite: (data) => {
      dispatch(actions.favouriteReducers(data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailsPageContainer);
