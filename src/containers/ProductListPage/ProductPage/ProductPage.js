import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles.css";
import { Card, ThemeProvider } from "react-bootstrap";
import * as actions from "./../../../actions/index";
import Star from "@material-ui/icons/Star";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import { DropdownButton, Dropdown, Button, ButtonGroup } from "react-bootstrap";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import FilterListIcon from "@material-ui/icons/FilterList";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import StarBorder from "@material-ui/icons/StarBorder";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_product_name: "",
      sort_price: "-1",
      range_price: "",
      star: 0,
      statusSales: 0,
      sales: 0,
      temp: 0,
      key: this.props.match.params.slug.split("="),
    };
  }
  onClickSales = (data, value) => {
    this.setState({
      statusSales: value,
      sales: data,
      key: "",
    });
    var tasks = {
      name: this.state.search_product_name,
      sort_price: this.state.sort_price,
      range_price: this.state.range_price,
      star: this.state.star,
      sales: data,
      status: 0,
    };
    console.log(tasks);
    this.props.searchProductNameReducers(tasks);
  };
  onClickStar = (data, value) => {
    this.setState({
      star: data,
      status: value,
      key: "",
    });
    var tasks = {
      name: this.state.search_product_name,
      sort_price: this.state.sort_price,
      range_price: this.state.range_price,
      star: data,
      sales: this.state.sales,
    };
    console.log(tasks);
    this.props.searchProductNameReducers(tasks);
  };
  onChange = (e) => {
    var { target } = e;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
    var tasks = {
      name:
        name === "search_product_name" ? value : this.state.search_product_name,
      sort_price: name === "sort_price" ? value : this.state.sort_price,
      range_price: name === "range_price" ? value : this.state.range_price,
      star: this.state.star,
      sales: this.state.sales,
    };
    console.log(tasks);
    this.setState({
      key: "",
    });
    this.props.searchProductNameReducers(tasks);
  };
  componentDidMount() {
    this.props.onProductAPI();
  }
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
  showProduct = (product, category, match, slug, slugProduct, cart) => {
    var result = product.map((values, index) => {
      var temp = 0;
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
              <div className="productInfo_name product">
                {values.name}
              </div>
              <div className="productInfo_display product">
                <div>{this.showStar(values.star)}</div>
                <div className="showQuantity">
                  ({values.quantity})
                </div>
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
    });
    return result;
  };
  render() {
    var { match, product, category, cart, product_name_search } = this.props;
    console.log(this.props);
    var temp = 0;
    console.log(product);
    console.log(match.params.slug);
    // var key = match.params.slug.split("=");
    // console.log(key[1]);
    //var key = JSON.parse(localStorage.getItem('key'));
    // var id;
    // category.forEach((values, index) => {
    //   if (values.name.toLowerCase() === match.params.slug) {
    //     id = values.id;
    //   }
    // });
    // console.log(id);
    // var array = product.filter((values, index) => {
    //   return values.parentID === id;
    // });
    var array = [];
    array = product;
    console.log(array);
    console.log(product_name_search);
    if (product_name_search.sort_price === "-1") {
      array = array;
    } else if (product_name_search.sort_price === "0") {
      array = array.sort((a, b) => {
        console.log(a);
        return (
          a.price * ((100 - a.sales) / 100) - b.price * ((100 - b.sales) / 100)
        );
      });
    } else if (product_name_search.sort_price === "1") {
      array = array.sort((a, b) => {
        console.log(a);
        return (
          b.price * ((100 - b.sales) / 100) - a.price * ((100 - a.sales) / 100)
        );
      });
    }
    if (product_name_search.range_price) {
      array = array.filter((values, index) => {
        return (
          values.price * ((100 - values.sales) / 100) <
          Number(product_name_search.range_price)
        );
      });
    }
    console.log(array);
    if (product_name_search.star && product_name_search.star > 0) {
      array = array.filter((values, index) => {
        return Number(values.star) === product_name_search.star;
      });
    }
    if (product_name_search.sales && product_name_search.sales > 0) {
      array = array.filter((values, index) => {
        console.log(values);
        return Number(values.sales) === product_name_search.sales;
      });
    }
    if (product_name_search.name) {
      array = array.filter((values, index) => {
        return (
          values.name.toLowerCase().indexOf(product_name_search.name) !== -1
        );
      });
    }
    if (this.state.key[1]) {
      array = array.filter((values, index) => {
        return values.name.toLowerCase().indexOf(this.state.key[1]) !== -1;
      });
    }
    return (
      <div className="store_product">
        <div className="store_product_left">
          <div className="store_product_left_title">
            <FilterListIcon />
            <div className="store_product_left_title_name">Search Filters</div>
          </div>
          <div className="store_product_left_price">
            <select
              className="form-control"
              name="sort_price"
              value={this.state.sort_price}
              onChange={this.onChange}
            >
              <option value="-1">Price</option>
              <option value="0">Low to high</option>
              <option value="1">High to low</option>
            </select>
          </div>
          <div>
            <label className="store_product_left_price_range">
              Price Range
            </label>
            <div className="radio">
              <label className="store_product_left_price_range_name">
                <input
                  type="radio"
                  name="range_price"
                  id="input"
                  onChange={this.onChange}
                  checked={this.state.range_price === "200"}
                  value="200"
                />
                <div className="store_product_left_price_range_name_under">
                  200$ Under
                </div>
              </label>
              <label className="store_product_left_price_range_name">
                <input
                  type="radio"
                  name="range_price"
                  id="input"
                  onChange={this.onChange}
                  checked={this.state.range_price === "400"}
                  value="400"
                />
                <div className="store_product_left_price_range_name_under">
                  400$ Under
                </div>
              </label>
              <label className="store_product_left_price_range_name">
                <input
                  type="radio"
                  name="range_price"
                  id="input"
                  onChange={this.onChange}
                  checked={this.state.range_price === "600"}
                  value="600"
                />
                <div className="store_product_left_price_range_name_under">
                  600$ Under
                </div>
              </label>
              <label className="store_product_left_price_range_name">
                <input
                  type="radio"
                  name="range_price"
                  id="input"
                  onChange={this.onChange}
                  checked={this.state.range_price === "800"}
                  value="800"
                />
                <div className="store_product_left_price_range_name_under">
                  800$ Under
                </div>
              </label>
              <label className="store_product_left_price_range_name">
                <input
                  type="radio"
                  name="range_price"
                  id="input"
                  onChange={this.onChange}
                  checked={this.state.range_price === "999"}
                  value="999"
                />
                <div className="store_product_left_price_range_name_under">
                  1000$ Under
                </div>
              </label>
            </div>
          </div>
          <div>
            <div className="store_product_left_price_range">Evaluate</div>
            <div className="store_product_left_star">
              <div
                onClick={() => this.onClickStar(5, 1)}
                className="store_product_left_sort"
              >
                <Star
                  className={
                    this.state.status === 1 ? "star_left_press" : "star_left"
                  }
                />
                <Star
                  className={
                    this.state.status === 1 ? "star_left_press" : "star_left"
                  }
                />
                <Star
                  className={
                    this.state.status === 1 ? "star_left_press" : "star_left"
                  }
                />
                <Star
                  className={
                    this.state.status === 1 ? "star_left_press" : "star_left"
                  }
                />
                <Star
                  className={
                    this.state.status === 1 ? "star_left_press" : "star_left"
                  }
                />
              </div>
              <div
                onClick={() => this.onClickStar(4, 2)}
                className="store_product_left_sort"
              >
                <Star
                  className={
                    this.state.status === 2 ? "star_left_press" : "star_left"
                  }
                />
                <Star
                  className={
                    this.state.status === 2 ? "star_left_press" : "star_left"
                  }
                />
                <Star
                  className={
                    this.state.status === 2 ? "star_left_press" : "star_left"
                  }
                />
                <Star
                  className={
                    this.state.status === 2 ? "star_left_press" : "star_left"
                  }
                />
                <StarBorder
                  className={
                    this.state.status === 2 ? "star_left_press" : "star_left"
                  }
                />
              </div>
              <div
                onClick={() => this.onClickStar(3, 3)}
                className="store_product_left_sort"
              >
                <Star
                  className={
                    this.state.status === 3 ? "star_left_press" : "star_left"
                  }
                />
                <Star
                  className={
                    this.state.status === 3 ? "star_left_press" : "star_left"
                  }
                />
                <Star
                  className={
                    this.state.status === 3 ? "star_left_press" : "star_left"
                  }
                />
                <StarBorder
                  className={
                    this.state.status === 3 ? "star_left_press" : "star_left"
                  }
                />
                <StarBorder
                  className={
                    this.state.status === 3 ? "star_left_press" : "star_left"
                  }
                />
              </div>
              <div
                onClick={() => this.onClickStar(2, 4)}
                className="store_product_left_sort"
              >
                <Star
                  className={
                    this.state.status === 4 ? "star_left_press" : "star_left"
                  }
                />
                <Star
                  className={
                    this.state.status === 4 ? "star_left_press" : "star_left"
                  }
                />
                <StarBorder
                  className={
                    this.state.status === 4 ? "star_left_press" : "star_left"
                  }
                />
                <StarBorder
                  className={
                    this.state.status === 4 ? "star_left_press" : "star_left"
                  }
                />
                <StarBorder
                  className={
                    this.state.status === 4 ? "star_left_press" : "star_left"
                  }
                />
              </div>
              <div
                onClick={() => this.onClickStar(1, 5)}
                className="store_product_left_sort"
              >
                <Star
                  className={
                    this.state.status === 5 ? "star_left_press" : "star_left"
                  }
                />
                <StarBorder
                  className={
                    this.state.status === 5 ? "star_left_press" : "star_left"
                  }
                />
                <StarBorder
                  className={
                    this.state.status === 5 ? "star_left_press" : "star_left"
                  }
                />
                <StarBorder
                  className={
                    this.state.status === 5 ? "star_left_press" : "star_left"
                  }
                />
                <StarBorder
                  className={
                    this.state.status === 5 ? "star_left_press" : "star_left"
                  }
                />
              </div>
            </div>
          </div>
          <div>
            <label className="store_product_left_price_range">Sales</label>
            <div className="sales_store">
              <div
                onClick={() => this.onClickSales(10, 6)}
                className={
                  this.state.statusSales === 6
                    ? "store_product_left_sales_press"
                    : "store_product_left_sales"
                }
              >
                <LoyaltyIcon className="sales_icon" />
                <div className="sales">10%</div>
              </div>
              <div
                onClick={() => this.onClickSales(15, 7)}
                className={
                  this.state.statusSales === 7
                    ? "store_product_left_sales_press"
                    : "store_product_left_sales"
                }
              >
                <LoyaltyIcon className="sales_icon" />
                <div className="sales">15%</div>
              </div>
            </div>
          </div>
        </div>
        <div className="store_product_right">
          <div className="store_product_right_top">
            <div className="store_product_right_top_left">
              Search for similar products by name :
            </div>
            <div className="store_product_right_top_right">
              <TextField
                name="search_product_name"
                value={this.props.search_product_name}
                onChange={this.onChange}
                id="standard-basic"
                size="small"
              />
            </div>
          </div>
          <div className="divide"></div>
          <div className="store_product_right_bottom">
            <div className="wrapper">
              {this.showProduct(
                array,
                category,
                match,
                "",
                match.params.slug,
                cart
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    category: state.category,
    cart: state.cart,
    product_name_search: state.search_product_name,
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
    searchProductNameReducers: (data) => {
      dispatch(actions.searchProductNameReducers(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
