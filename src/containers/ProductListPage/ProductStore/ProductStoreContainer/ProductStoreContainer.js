import React, { Component } from "react";
import { connect } from "react-redux";
import ProductStoreList from "./../ProductStoreList/ProductStoreList";
import * as actions from "./../../../../actions/index";
class ProductStoreContainer extends Component {
  componentDidMount() {
    this.props.onProductAPI();
  }
  render() {
    var { product, match, onProductAPI, onCategoryAPI, onCart, searchProductNameReducers, category, cart, product_name_search } = this.props;
    return (
      <ProductStoreList
        category={category}
        cart={cart}
        match={match}
        onCart={onCart}
        onProductAPI={onProductAPI}
        onCategoryAPI={onCategoryAPI}
        searchProductNameReducers={searchProductNameReducers}
        product_name_search={product_name_search}
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
    // product_name_search: state.search_product_name,
    product_name_search: state.search_local,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onProductAPI: () => {
      dispatch(actions.productAPI());
    },
    onCategoryAPI: () => {
      dispatch(actions.categoryAPI());
    },
    onCart: (data) => {
      dispatch(actions.cartReducers(data));
    },
    searchProductNameReducers: (data) => {
      dispatch(actions.searchLocalReducers(data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductStoreContainer);
