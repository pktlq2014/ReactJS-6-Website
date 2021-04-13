import React, { Component } from "react";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import { Link, Redirect } from "react-router-dom";
import StarBorder from "@material-ui/icons/StarBorder";
import Star from "@material-ui/icons/Star";
class ProductPageItem extends Component {
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
  render() {
    var { index, values, match, cart, temp } = this.props;
    var temp1 = temp;
    return (
      <div
        key={index}
        border="primary"
        className="card_parent"
        style={{ width: "18rem" }}
      >
        <div className="home-product-item__favourite product">
          <CheckCircleOutline
            className="checkOutline"
            style={{ fontSize: 17.5 }}
          />
          favourite
        </div>

        <div className="home-product-item__sale-off product">
          <span className="home-product-item__sale-off-percent">
            {values.sales}%
          </span>
          <span className="home-product-item__sale-off-label">SALE</span>
        </div>
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
              var image = require(`./../../../../assets/images/${valuess.img}`);
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
                temp1 = 1;
                return (
                  <button key={index6} disabled className="add_to_cart in_cart">
                    In Cart
                  </button>
                );
              }
            })}
          {temp1 === 0 ? (
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
  }
}
export default ProductPageItem;
