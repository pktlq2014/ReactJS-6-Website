import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
class ProductStoreItem extends Component {
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
  render() {
    var temp = 0;
    return (
      <div
        key={this.props.index}
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
            {this.props.sales}%
          </span>
          <span className="home-product-item__sale-off-label">SALE</span>
        </div>
        <Link
          style={{ textDecoration: "none" }}
          to={`/${this.props.match.params.slug}/${this.props.id}/p`}
        >
          <div className="productImgContainer product">
            {this.props.productPictures.map((valuess, index3) => {
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
            to={`/${this.props.match.params.slug}/${this.props.id}/p`}
          >
            <div className="productInfo_name product">{this.props.name}</div>
            <div className="productInfo_display product">
              <div>{this.showStar(this.props.star)}</div>
              <div className="showQuantity">({this.props.quantity})</div>
            </div>
            <div className="productPrice product">
              <p>{this.props.price * ((100 - this.props.sales) / 100)}$</p>
              <p className="Oldprice">{this.props.price}$</p>
            </div>
          </Link>
          {this.props.cart &&
            this.props.cart.map((valuessss, index6) => {
              if (valuessss.id === this.props.id) {
                temp = 1;
                return (
                  <button key={index6} disabled className="add_to_cart in_cart">
                    In Cart
                  </button>
                );
              }
            })}
          {temp === 0 ? (
            <button
              className="add_to_cart"
              onClick={() => this.onClick(this.props.values)}
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

export default ProductStoreItem;
