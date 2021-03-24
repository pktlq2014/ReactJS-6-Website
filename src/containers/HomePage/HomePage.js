import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { connect } from "react-redux";
import "./styles.css";
import Slider from "react-slick";
import CarouselMulti from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemsCarousel from "react-items-carousel";
import CreateIcon from "@material-ui/icons/Create";
import * as actions from "./../../actions/index";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { ArrowRightAltTwoTone, ImageTwoTone } from "@material-ui/icons";
import Layout from "./../../components/Layout/layout";
import { Link, Redirect } from "react-router-dom";
import FilterCenterFocusIcon from "@material-ui/icons/FilterCenterFocus";
import SearchIcon from "@material-ui/icons/Search";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
};
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayProduct: [],
      temp: 0,
      data: [],
    };
  }
  componentDidMount() {
    this.props.onProductAPI();
    this.props.onTypeAPI();
  }
  onAddShoppingCart = (id, name, price, img, quantity, category, cart) => {
    var object = {};
    object = {
      id: id,
      name: name,
      price: price,
      img: img,
      quantity: quantity,
      nameIdParent: category,
    };
    this.props.onCart(object);
  };
  showCart = (product, cart, id, name, category) => {
    var result = product
      .filter((valuess) => id === valuess.parentID)
      .map((valuess, index2) => {
        var count = 0;
        var string = "";
        var stringParent = "";
        var image = require(`./../../assets/images/${valuess.productPictures[0].img}`);
        return (
          <div className="product" key={index2}>
            <div className="product__header">
              {image && <img src={image.default} alt={image.default} />}
            </div>

            <ul>
              {cart &&
                cart.map((valuessss, index) => {
                  if (valuessss.id === valuess.id) {
                    count = 1;
                    return (
                      <li className="in_cart_home">
                        <AddShoppingCartIcon className="in_cart_home" />
                      </li>
                    );
                  }
                })}
              {count === 0 ? (
                <li
                  onClick={() =>
                    this.onAddShoppingCart(
                      valuess.id,
                      valuess.name,
                      valuess.price,
                      valuess.productPictures[0].img,
                      1,
                      name,
                      cart
                    )
                  }
                >
                  <a>
                    <AddShoppingCartIcon className="product_icon" />
                  </a>
                </li>
              ) : (
                ""
              )}
              {category.map((valuesss, index) => {
                if (valuesss.id === valuess.categoryID) {
                  string = valuesss.name.toLowerCase();
                  stringParent = valuesss.id;
                }
              })}
              <Link
                className="search_link"
                style={{ textDecoration: "none" }}
                to={`/${string}/${valuess.id}/p`}
              >
                <li>
                  <a>
                    <SearchIcon className="product_icon" />
                  </a>
                </li>
              </Link>
              <Link to={`/${name.toLowerCase()}?cid=${id}&type=store`}>
                <li>
                  <a>
                    <FilterCenterFocusIcon className="product_icon" />
                  </a>
                </li>
              </Link>
            </ul>
          </div>
        );
      });
    return result;
  };
  render() {
    var { type, product, category, cart } = this.props;
    console.log(category);
    console.log(product);
    var count = 0;
    console.log(type);
    var data = [];
    var temp = 0;
    if (temp === 0) {
      category.forEach((values, index) => {
        var temp = 0;
        product.forEach((valuess, index) => {
          if (values.id === valuess.parentID) {
            if (temp === 0) {
              data.push({ id: values.id, name: values.name });
              temp = 1;
            }
          }
        });
      });
      temp = 1;
    }
    console.log(data);
    return (
      <Layout>
        {type.map((values, index) => {
          return (
            <Carousel
              key={index}
              className="home_carousel"
              renderThumbs={() => {}}
              autoPlay={true}
              emulateTouch={true}
              infiniteLoop={true}
              interval={1750}
            >
              {values.banners &&
                values.banners.map((valuess, index99) => {
                  console.log(valuess.img);
                  var image = require(`./../../assets/images/${valuess.img}`);
                  if (valuess.img.indexOf("Laptop") !== -1) {
                    return (
                      <Link
                        to={`/laptops?cid=7&type=store`}
                        style={{ display: "block" }}
                        key={index99}
                      >
                        <img src={image.default} alt="" />
                      </Link>
                    );
                  } else {
                    return (
                      <Link
                        to={`/mobiles?cid=6&type=store`}
                        style={{ display: "block" }}
                        key={index99}
                      >
                        <img src={image.default} alt="" />
                      </Link>
                    );
                  }
                })}
            </Carousel>
          );
        })}
        {data.map((values, index) => {
          return (
            <div key={index}>
              <div className="home_product">
                <div className="home_product_title">
                  <div className="home_product_title_left">
                    {values.name !== "" ? values.name : ""}
                  </div>
                  <Link to={`/${values.name.toLowerCase()}?cid=${values.id}&type=store`}>
                    <button className="home_product_title_right">
                      View All
                    </button>
                  </Link>
                </div>
                <div className="home_product_divide"></div>
                <CarouselMulti
                  responsive={responsive}
                  swipeable={false}
                  draggable={false}
                  // showDots={true}
                  ssr={true} // means to render carousel on server-side.
                  // infinite={true}
                  transitionDuration={500}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                  containerClass="carousel-container"
                  keyBoardControl={true}
                >
                  {this.showCart(
                    product,
                    cart,
                    values.id,
                    values.name,
                    category
                  )}
                </CarouselMulti>
              </div>
              <div className="end"></div>
            </div>
          );
        })}
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    type: state.type,
    product: state.product,
    category: state.category,
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onTypeAPI: () => {
      dispatch(actions.typeAPI());
    },
    onProductAPI: () => {
      dispatch(actions.productAPI());
    },
    onCart: (data) => {
      dispatch(actions.cartReducers(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
