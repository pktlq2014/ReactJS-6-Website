import React, { Component } from "react";
import Layout from "./../../components/Layout/layout";
import { connect } from "react-redux";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import * as actions from "./../../actions/index";
import { BiRupee } from "react-icons/bi";
import EmailIcon from "@material-ui/icons/Email";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { AiFillThunderbolt } from "react-icons/ai";
import StarBorder from "@material-ui/icons/StarBorder";
import Star from "@material-ui/icons/Star";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { MaterialButton } from "./../../components/MaterialUI/materialUI";
import "./styles.css";
class ProductDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.onProductAPI();
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
  render() {
    var { productId } = this.props.match.params;
    var { product, category } = this.props;
    console.log(category);
    console.log(this.props);
    console.log(productId);
    console.log(product);
    var data = product.filter((values, index) => {
      if (values.id === productId) {
        return values;
      }
    });
    // lấy ra object thằng cha của thằng sp này để lấy ra name
    var objectNameCategory = {};
    var objectNameIdParent = {};
    var nameCurrent, nameIdParent, idParent;
    category.forEach((values, index) => {
      data.forEach((valuess, index) => {
        if (values.id === valuess.categoryID) {
          objectNameCategory = values;
        }
      });
    });
    console.log(objectNameCategory);
    nameCurrent = objectNameCategory.name;
    idParent = objectNameCategory.idParent;
    category.forEach((values, index) => {
      if (values.id === idParent) {
        objectNameIdParent = values;
      }
    });
    console.log(objectNameIdParent);
    nameIdParent = objectNameIdParent.name;
    console.log(nameIdParent);
    console.log(nameCurrent);
    console.log(data);

    var result = data.map((values, index) => {
      console.log(values.productPictures);
      var resultImage = values.productPictures.map((valuess, index) => {
        var image = require(`./../../assets/images/${valuess.img}`);
        return (
          <div className="pictures__container">
            <img
              className="picture"
              id="pic1"
              key={index}
              src={image.default}
              alt={valuess.img}
            />
          </div>
        );
      });
      return resultImage;
    });
    return (
      <Layout>
        <main id="watch_product_main">
          <div className="watch_product_body">
            <section className="product-details__section">
              <div className="product-detail__container">
                <div className="product-detail__left">
                  <div className="details__container--left">
                    <div className="product__pictures">{result}</div>

                    <div className="product__picture" id="product__picture">
                      <div className="picture__container">
                        {data.map((values, index) => {
                          var image = require(`./../../assets/images/${values.productPictures[0].img}`);
                          return (
                            <img
                              className="image_product_watch"
                              key={index}
                              id="pic"
                              src={image.default}
                              alt={`${values.productPictures[0].img}`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="zoom" id="zoom"></div>
                  </div>

                  <div className="product-details__btn">
                    <a className="product__btn_product add" data-id="" href="#">
                      <ShoppingCartIcon className="margin-right-10" />
                      ADD TO CART
                    </a>
                    <a className="buy_now buy" href="./cart.html">
                      <CreditCardIcon className="margin-right-10" />
                      BUY NOW
                    </a>
                  </div>
                </div>

                <div className="product-detail__right">
                  {data.map((values, index) => {
                    return (
                      <div className="product-detail__content">
                        <div className="breed">
                          <ul>
                            <li>
                              <a href="#">Home</a>
                              <IoIosArrowForward />
                            </li>
                            <li>
                              <a href="#">{nameIdParent}</a>
                              <IoIosArrowForward />
                            </li>
                            <li>
                              <a href="#">{nameCurrent}</a>
                              <IoIosArrowForward />
                            </li>
                            <li>
                              <a href="#">
                                <div>{values.name}</div>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <h3 className="title_product">{values.name}</h3>

                        <div className="price">
                          <span className="new__price price_product">
                          {values.price * ((100 - values.sales) / 100)}$
                          </span>
                        </div>

                        <div className="product__review">
                          <div className="rating">
                            {this.showStar(values.star)}
                          </div>
                          <a href="#" className="rating__quatity">
                            {values.star} reviews
                          </a>
                        </div>

                        <p>
                          {values.description}
                        </p>

                        <div className="product__info-container">
                          <ul className="product__info">
                            <li>
                              <p>Old Price:</p>
                              <a href="#" className="priceOld_product">
                                {values.price}$
                              </a>
                            </li>
                            <li>
                              <p>Quantity:</p>
                              <a className="origin_product" href="#">
                                {values.quantity}
                              </a>
                            </li>
                            <li>
                              <p>Product Type:</p>
                              <a className="category_product" href="#">
                                {nameCurrent}
                              </a>
                            </li>
                            <li>
                              <p>Availability:</p>
                              <a href="#" className="in-stock">
                                In Stock (7 Items)
                              </a>
                            </li>
                          </ul>

                          <div className="product-info__btn">
                            <a href="#">
                              <LocalShippingIcon className="margin-right-10" />
                              Shipping
                            </a>
                            <a href="#">
                              <EmailIcon className="margin-right-10" />
                              Ask About This Product
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </main>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsPage);
