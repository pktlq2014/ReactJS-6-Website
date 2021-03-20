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
import { ImageTwoTone } from "@material-ui/icons";
import Layout from "./../../components/Layout/layout";
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
    this.state = {};
  }
  componentDidMount() {
    this.props.onTypeAPI();
  }
  render() {
    var { type } = this.props;
    console.log(type);
    return (
      <Layout>
        {type.map((values, index) => {
          return (
            <div key={index}>
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
                  values.banners.map((valuess, index) => {
                    console.log(valuess.img);
                    var image = require(`./../../assets/images/${valuess.img}`);
                    return (
                      <a
                        href={valuess.navigateTo}
                        style={{ display: "block" }}
                        key={index}
                      >
                        <img src={image.default} alt="" />
                      </a>
                    );
                  })}
              </Carousel>

              {values.products.length <= 0 ? (
                ""
              ) : (
                <div className="home_product">
                  <div className="home_product_title">
                    <div className="home_product_title_left">
                      {values.title !== "" ? values.title : ""}
                    </div>
                    <button className="home_product_title_right">
                      View All
                    </button>
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
                    {values.products &&
                      values.products.map((valuess, index1) => {
                        var image = require(`./../../assets/images/${valuess.img}`);
                        return (
                          <div className="product" key={index1}>
                            <div className="product__header">
                              <img src={image.default} alt="" />
                            </div>

                            <ul>
                              <li>
                                <a>
                                  <AddShoppingCartIcon className="product_icon" />
                                </a>
                              </li>
                              <li>
                                <a>
                                  <SearchIcon className="product_icon" />
                                </a>
                              </li>
                              <li>
                                <a>
                                  <FilterCenterFocusIcon className="product_icon" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        );
                      })}
                  </CarouselMulti>
                </div>
              )}
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
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onTypeAPI: () => {
      dispatch(actions.typeAPI());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
