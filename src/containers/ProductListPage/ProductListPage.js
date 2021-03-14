import React, { Component } from "react";
import getParams from "./../../utils/getParams";
import Layout from "./../../components/Layout/layout";
import ProductStore from "./ProductStore/productStore";
import ProductPage from "./ProductPage/ProductPage";
class ProductListPage extends Component {
  renderProduct = () => {
    console.log(this.props);
    const params = getParams(this.props.location.search);
    console.log(params);
    var content = null;
    switch (params.type) {
      case "store" : {
        content = <ProductStore {...this.props}/>;
        break;
      }
      case "product" : {
        content = <ProductStore {...this.props}/>;
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
