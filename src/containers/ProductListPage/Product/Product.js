import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles.css";
import { Card, ThemeProvider } from "react-bootstrap";
import * as actions from "../../../actions/index";
import Star from "@material-ui/icons/Star";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import StarBorder from "@material-ui/icons/StarBorder";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
class Product extends Component {
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
  // onClick = (id, slug) => {
  //   alert("aaa");
  //   return <Redirect to={`/${slug}/${id}/p`}></Redirect>;
  // }
  onClick = (values) => {
    var object = {};
    var { match, category } = this.props;
    var name = match.params.slug;
    var idParent;
    var type;
    category.forEach((values, index) => {
      if (values.name.toLowerCase() === name) {
        idParent = values.idParent;
      }
    });
    console.log(idParent);
    category.forEach((values, index) => {
      if (values.id === idParent) {
        type = values.name;
      }
    });
    console.log(values);
    object = {
      id: values.id,
      name: values.name,
      price: values.price,
      img: values.productPictures[0].img,
      quantity: 1,
      nameIdParent: type,
    };
    console.log(object);
    this.props.onCart(object);
  };
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
  showProduct = (product, category, match, slug, slugProduct, cart) => {
    var result = product.map((values, index) => {
      var temp = 0;
      category.forEach((categoryValues, index) => {
        if (values.categoryID === categoryValues.id) {
          console.log(categoryValues.name.toLowerCase());
          slug = categoryValues.name.toLowerCase();
        }
      });
      if (match.params.slug === slug) {
        return (
          <div
            key={index}
            border="primary"
            className="card_parent"
            style={{ width: "18rem" }}
          >
            <di className="home-product-item__favourite product">
              <CheckCircleOutline
                className="checkOutline"
                style={{ fontSize: 17.5 }}
              />
              favourite
            </di>

            <di className="home-product-item__sale-off product">
              <span className="home-product-item__sale-off-percent">
                {values.sales}%
              </span>
              <span className="home-product-item__sale-off-label">SALE</span>
            </di>
            <Link
              style={{ textDecoration: "none" }}
              to={`/${match.params.slug}/${values.id}/p`}
            >
              <div className="productImgContainer product">
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
            </Link>
            <div className="productInfo">
              <Link
                style={{ textDecoration: "none" }}
                to={`/${match.params.slug}/${values.id}/p`}
              >
                <div className="productInfo_name product">{values.name}</div>
                <div className="productInfo_display product">
                  <div>{this.showStar(values.star)}</div>
                  <div className="showQuantity">({values.quantity})</div>
                </div>
                <div className="productPrice product">
                  <p>{values.price * ((100 - values.sales) / 100)}$</p>
                  <p className="Oldprice">{values.price}$</p>
                </div>
              </Link>
              {cart &&
                cart.map((valuessss, index6) => {
                  if (valuessss.id === values.id) {
                    temp = 1;
                    return (
                      <button
                        key={index6}
                        disabled
                        className="add_to_cart in_cart"
                      >
                        In Cart
                      </button>
                    );
                  }
                })}
              {temp === 0 ? (
                <button
                  className="add_to_cart"
                  onClick={() => this.onClick(values)}
                >
                  Add To Cart
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
    return result;
  };
  render() {
    var { product, match, category, cart } = this.props;
    console.log(this.props);
    console.log(match);
    var { sortPrice } = this.state;
    var slug = "";
    var temp = 0,
      temp2 = 0;
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
      console.log(match.params.slug);
      console.log(slug);
      return (
        <div key={index3}>
          {/* <div as="h5" className="cardHeader">
            <div className="cartHeader_marginTop">
              {match.params.slug} - under {valuessss.price}$
            </div>
            <button className="add_to_cart">View All</button>
          </div>

          <div className="show_product">
            {valuessss.price >= 0 && valuessss.price <= 500
              ? this.showProduct(
                  array1,
                  category,
                  match,
                  slug,
                  match.params.slug,
                  cart
                )
              : this.showProduct(
                  array2,
                  category,
                  match,
                  slug,
                  match.params.slug,
                  cart
                )}
          </div>
       */}
        </div>
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
    cart: state.cart,
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
