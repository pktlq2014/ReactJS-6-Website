import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles.css";
import { Card, Button } from "react-bootstrap";
import * as actions from "./../../../actions/index";
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
class ProductStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortPrice: [
        {
          price: 500,
        },
        {
          price: 1000,
        },
      ],
    };
  }
  showStar = (data) => {
    var result = [];
    for (var i = 0; i < data; i++) {
      result.push(<Star className="star" />);
    }
    for (var j = 0; j < 5 - data; j++) {
      result.push(<StarBorder />);
    }
    return result;
  };
  componentDidMount() {
    this.props.onProductAPI();
    this.props.onCategoryAPI();
  }
  showProduct = (product, category, match, slug) => {
    var result = product.map((values, index) => {
      category.forEach((categoryValues, index) => {
        if (values.categoryID === categoryValues.id) {
          console.log(categoryValues.name.toLowerCase());
          slug = categoryValues.name.toLowerCase();
        }
      });
      if (match.params.slug === slug) {
        return (
          <Card
            key={index}
            border="primary"
            className="card_parent"
            style={{ width: "18rem" }}
          >
            <div className="home-product-item__favourite">
              <CheckCircleOutline
                className="checkOutline"
                style={{ fontSize: 17.5 }}
              />
              favourite
            </div>

            <div className="home-product-item__sale-off">
              <span className="home-product-item__sale-off-percent">
                {values.sales}%
              </span>
              <span className="home-product-item__sale-off-label">SALE</span>
            </div>
            <div className="productImgContainer">
              {values.productPictures.map((valuess, index3) => {
                var index = valuess.img.indexOf("samsung");
                if (index === 1) {
                }
                //var image = require(`./../../assets/images/${values.productPictures[index].img}`);
                var image = require(`./../../../assets/images/${valuess.img}`);
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
                <Card.Text>{this.showStar(values.star)}</Card.Text>
                <Card.Text className="showQuantity">
                  ({values.quantity})
                </Card.Text>
              </div>
              <Card.Text className="productPrice">
                <p>{values.price * 2 * ((100 - values.sales) / 100)}$</p>
                <p className="Oldprice">{values.price * 2}$</p>
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        );
      } else {
        return null;
      }
    });
    return result;
  };
  render() {
    var { product, match, category } = this.props;
    console.log(this.props);
    console.log(match);
    var { sortPrice } = this.state;
    var slug = "";
    var array1 = [];
    var array2 = [];
    var result = product.filter((values, index) => {
      if (values.price >= 0 && values.price <= 500) {
        return array1.push(values);
      } else if (values.price > 500 && values.price <= 1000) {
        return array2.push(values);
      }
    });
    console.log(array1);
    console.log(array2);
    var showProduct = sortPrice.map((valuessss, index3) => {
      return (
        <Card key={index3}>
          <Card.Header as="h5" className="cardHeader">
            <Card.Text className="cartHeader_marginTop">
              {match.params.slug} - under {valuessss.price}$
            </Card.Text>
            <Button variant="primary">View All</Button>
          </Card.Header>

          <Card.Body className="show_product">
            {valuessss.price >= 0 && valuessss.price <= 500
              ? this.showProduct(array1, category, match, slug)
              : this.showProduct(array2, category, match, slug)}
          </Card.Body>
        </Card>
      );
    });
    console.log(showProduct);
    return <div>{showProduct}</div>;
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductStore);