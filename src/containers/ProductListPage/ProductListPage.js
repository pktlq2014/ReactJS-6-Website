import React, { Component } from "react";
import getParams from "./../../utils/getParams";
import Layout from "./../../components/Layout/layout";
import ProductStoreContainer from "./ProductStore/ProductStoreContainer/ProductStoreContainer";
import ProductPageContainer from "./ProductPage/ProductPageContainer/ProductPageContainer";
import Product from "./Product/Product";
class ProductListPage extends Component {
  renderProduct = () => {
    console.log(this.props);
    const params = getParams(this.props.location.search);
    console.log(params);
    var content = null;
    switch (params.type) {
      case "store": {
        content = <ProductStoreContainer {...this.props} />;
        break;
      }
      case "product": {
        content = <Product {...this.props} />;
        break;
      }
      case "page": {
        content = <ProductPageContainer {...this.props} />;
        break;
      }
      default:
        content = null;
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
