import React, { Component } from "react";
import * as actions from "./../../../../actions/index";
import { connect } from "react-redux";
import ProductPage from "./../ProductPageList/ProductPage";
import ProductPageItem from "./../ProductPageItem/ProductPageItem";
class ProductPageContainer extends Component {
  componentDidMount() {
    this.props.onProductAPI();
  }
  render() {
    var {
      match,
      product,
      category,
      cart,
      onCart,
      product_name_search,
      searchProductNameReducers,
    } = this.props;
    console.log(product_name_search);
    return (
      <ProductPage
        product={product}
        category={category}
        cart={cart}
        match={match}
        onCart={onCart}
        searchProductNameReducers={searchProductNameReducers}
        product_name_search={product_name_search}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    product: state.product,
    category: state.category,
    cart: state.cart,
    product_name_search: state.search_product_name,
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
      dispatch(actions.searchProductNameReducers(data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPageContainer);
