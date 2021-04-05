import React, { Component } from "react";
import getParams from "./../../utils/getParams";
import Layout from "./../../components/Layout/layout";
import ProductStoreList from "./ProductStore/ProductStoreList/ProductStoreList";
import ProductPage from "./ProductPage/ProductPage";
import Product from './Product/Product';
class ProductListPage extends Component {
  renderProduct = () => {
    console.log(this.props);
    const params = getParams(this.props.location.search);
    console.log(params);
    var content = null;
    switch (params.type) {
      case "store" : {
        content = <ProductStoreList {...this.props}/>;
        break;
      }
      case "product" : {
        content = <Product {...this.props}/>;
        break;
      }
      case "page" : {
        content = <ProductPage {...this.props}/>;
        break;
      }
      default : content = null;
    }
    return content;
  };
  render() {
    return (
      <Layout>
        {/* <ProductStore match={this.props.match} /> */}
        {this.renderProduct()}
      </Layout>
    );
  }
}
export default ProductListPage;
