import React, { Component } from "react";
import Layout from "./../../components/Layout/layout";
import { connect } from "react-redux";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import * as actions from "./../../actions/index";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
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
  render() {
    var { productId } = this.props.match.params;
    var { product } = this.props;
    console.log(this.props);
    console.log(productId);
    console.log(product);
    var data = product.filter((values, index) => {
      if (values.id === productId) {
        return values;
      }
    });
    console.log(data);
    var result = data.map((values, index) => {
      console.log(values.productPictures);
      var resultImage = values.productPictures.map((valuess, index) => {
        var image = require(`./../../assets/images/${valuess.img}`);
        return (
          <div key={index} className="thumbnail">
            <img src={image.default} alt={valuess.img} />
          </div>
        );
      });
      return resultImage;
    });
    return (
      <Layout>
        <div className="productDescriptionContainer">
          <div className="flexRow">
            <div className="verticalImageStack">{result}</div>
            <div className="productDescContainer">
              <div className="productDescImgContainer">
                {data.map((values, index) => {
                  var image = require(`./../../assets/images/${values.productPictures[0].img}`);
                  return (
                    <img
                      key={index}
                      src={image.default}
                      alt={`${values.productPictures[0].img}`}
                    />
                  );
                })}
              </div>

              {/* action buttons */}
              <div className="flexRow">
                <MaterialButton
                  title="ADD TO CART"
                  bgColor="#ff9f00"
                  textColor="#ffffff"
                  style={{
                    marginRight: "5px",
                  }}
                  icon={<IoMdCart />}
                  //   onClick={() => {
                  //     const { _id, name, price } = product.productDetails;
                  //     const img = product.productDetails.productPictures[0].img;
                  //     dispatch(addToCart({ _id, name, price, img }));
                  //     props.history.push(`/cart`);
                  //   }}
                />
                <MaterialButton
                  title="BUY NOW"
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    marginLeft: "5px",
                  }}
                  icon={<AiFillThunderbolt />}
                />
              </div>
            </div>
          </div>
          <div>
            {/* home > category > subCategory > productName */}
            <div className="breed">
              <ul>
                <li>
                  <a href="#">Home</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">Mobiles</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">Samsung</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">
                    {" "}
                    <div>
                      {data.map((values, index) => {
                        return values.name;
                      })}
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            {/* product description */}
            <div className="productDetails">
              <p className="productTitle">
                <div>
                  {data.map((values, index) => {
                    return values.name;
                  })}
                </div>
              </p>
              <div>
                <span className="ratingCount">
                  {
                    data.map((values, index) => {
                      return (
                        values.star
                      )
                    })
                  } <IoIosStar />
                </span>
                <span className="ratingNumbersReviews">
                  72,234 Ratings & 8,140 Reviews
                </span>
              </div>
              <div className="extraOffer">
                Quantity
                {
                  data.map((values, index) => {
                    return (
                      values.quantity
                    )
                  })
                }
              </div>
              <div className="flexRow priceContainer">
                <span className="price">
                  Price 
                  {
                    data.map((values, index) => {
                      return (
                        values.price
                      )
                    })
                  }
                </span>
                <span className="discount" style={{ margin: "0 10px" }}>
                  {
                    data.map((values, index) => {
                      return (
                        values.sales
                      )
                    })
                  }
                  % off
                </span>
                {/* <span>i</span> */}
              </div>
              <div>
                <p
                  style={{
                    color: "#212121",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Available Offers
                </p>
                <p style={{ display: "flex" }}>
                  <span
                    style={{
                      width: "100px",
                      fontSize: "12px",
                      color: "#878787",
                      fontWeight: "600",
                      marginRight: "20px",
                    }}
                  >
                    Description
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#212121",
                    }}
                  >
                    {
                      data.map((values, index) => {
                        return (
                          values.description
                        )
                      })
                    }
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsPage);
