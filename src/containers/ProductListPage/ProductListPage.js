import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles.css";
import { Card, Button } from "react-bootstrap";
import * as actions from "./../../actions/index";
import Layout from "./../../components/Layout/layout";
class ProductListPage extends Component {
  componentDidMount() {
    this.props.onProductAPI();
  }
  render() {
    var { product, match } = this.props;
    console.log(product);
    var showProduct = product.map((values, index) => {
      return (
        <Card key={index} border="primary" style={{ width: "18rem" }}>
          <div className="productImgContainer">
            {values.productPictures.map((valuess, index) => {
              console.log(valuess.img);
              var index = valuess.img.indexOf("--");
              if(index === 1) {
                var image = require(`./../../assets/images/${values.productPictures[index].img}`);
                return (
                  <img
                    key={index}
                    className="img"
                    //src={`${process.env.PUBLIC_URL}/${truoc}`}
                    src={image.default}
                    alt="logo"
                  />
                );
              }
              console.log(index);
            })}
          </div>
          <Card.Body className="productInfo">
            <Card.Title className="productInfo_name">{values.name}</Card.Title>
            <div className="productInfo_display">
              <Card.Text>{values.quantity}</Card.Text>
              <Card.Text>5000</Card.Text>
            </div>
            <Card.Text className="productPrice">{values.price}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      );
    });
    console.log(this.props);
    console.log(match.params.slug);
    return (
      <Layout>
        <Card>
          <Card.Header as="h5" className="cardHeader">
            <Card.Text className="cartHeader_marginTop">
              Samsung under 10k
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
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onProductAPI: () => {
      dispatch(actions.productAPI());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
