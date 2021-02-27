import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles.css";
import { Card, Button } from "react-bootstrap";
import * as actions from "./../../actions/index";
import Layout from "./../../components/Layout/layout";
class ProductListPage extends Component {
  componentDidMount() {
    this.props.onProductAPI();
    this.props.onCategoryAPI();
  }
  render() {
    var { product, match, category } = this.props;
    var slug = "";
    console.log(category);
    var showProduct = product.map((values, index) => {
      category.forEach((categoryValues, index) => {
        if (values.categoryID === categoryValues.id) {
          console.log(categoryValues.name.toLowerCase());
          slug = categoryValues.name.toLowerCase();
        }
      });
      if (match.params.slug === slug) {
        return (
          <Card key={index} border="primary" style={{ width: "18rem" }}>
            <div className="productImgContainer">
              {values.productPictures.map((valuess, index3) => {
                var index = valuess.img.indexOf("samsung");
                if (index === 1) {
                }
                //var image = require(`./../../assets/images/${values.productPictures[index].img}`);
                var image = require(`./../../assets/images/${valuess.img}`);
                return (
                  <img
                    key={index3}
                    className="img"
                    //src={`${process.env.PUBLIC_URL}/${truoc}`}
                    src={image.default}
                    alt="logo"
                  />
                );
              })}
            </div>
            <Card.Body className="productInfo">
              <Card.Title className="productInfo_name">
                {values.name}
              </Card.Title>
              <div className="productInfo_display">
                <Card.Text>{values.quantity}</Card.Text>
                <Card.Text>5000</Card.Text>
              </div>
              <Card.Text className="productPrice">{values.price}</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        );
      } else {
        return null;
      }
    });
    return (
      <Layout>
        <Card>
          <Card.Header as="h5" className="cardHeader">
            <Card.Text className="cartHeader_marginTop">
              {match.params.slug} under 10k
            </Card.Text>
            <Button variant="primary">View All</Button>
          </Card.Header>

          <Card.Body className="show_product">{showProduct}</Card.Body>
        </Card>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    product: state.product,
    category: state.category,
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
