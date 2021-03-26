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
class ProductStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_product_name_local: "",
      sort_price_local: "-1",
      range_price_local: "",
      star_local: 0,
      statusSales_local: 0,
      sales_local: 0,
    };
  }
  onClickSales = (data, value) => {
    this.setState({
      statusSales_local: value,
      sales_local: data,
    });
    var tasks = {
      search_product_name_local: this.state.search_product_name_local,
      sort_price_local: this.state.sort_price_local,
      range_price_local: this.state.range_price_local,
      star_local: this.state.star_local,
      sales_local: data,
      status: this.state.status,
      statusSales_local : value
    };
    console.log(tasks);
    this.props.searchProductNameReducers(tasks);
  };
  onClickStar = (data, value) => {
    this.setState({
      star_local: data,
      status: value,
    });
    var tasks = {
      search_product_name_local: this.state.search_product_name_local,
      sort_price_local: this.state.sort_price_local,
      range_price_local: this.state.range_price_local,
      star_local: data,
      sales_local: this.state.sales_local,
      status: value
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
      search_product_name_local:
        name === "search_product_name_local"
          ? value
          : this.state.search_product_name_local,
      sort_price_local:
        name === "sort_price_local" ? value : this.state.sort_price_local,
      range_price_local:
        name === "range_price_local" ? value : this.state.range_price_local,
      star_local: this.state.star_local,
      sales_local: this.state.sales_local,
    };
    console.log(tasks);
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
        <Card
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
          <Card.Body className="productInfo">
            <Link
              style={{ textDecoration: "none" }}
              to={`/${match.params.slug}/${values.id}/p`}
            >
              <Card.Title className="productInfo_name product">
                {values.name}
              </Card.Title>
              <div className="productInfo_display product">
                <Card.Text>{this.showStar(values.star)}</Card.Text>
                <Card.Text className="showQuantity">
                  ({values.quantity})
                </Card.Text>
              </div>
              <Card.Text className="productPrice product">
                <p>{values.price * ((100 - values.sales) / 100)}$</p>
                <p className="Oldprice">{values.price}$</p>
              </Card.Text>
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
          </Card.Body>
        </Card>
      );
    });
    return result;
  };
  render() {
    var { match, product, category, cart, product_name_search } = this.props;
    console.log(this.props);
    console.log(product_name_search);
    console.log(match.params.slug);
    var id;
    category.forEach((values, index) => {
      if (values.name.toLowerCase() === match.params.slug.toLowerCase()) {
        id = values.id;
      }
    });
    var array;
    if (
      match.params.slug.toLowerCase() === "mobiles" ||
      match.params.slug.toLowerCase() === "laptops" ||
      match.params.slug.toLowerCase() === "keyboard"
    ) {
      console.log(id);
      array = product.filter((values, index) => {
        return values.parentID === id;
      });
    } else {
      console.log(id);
      array = product.filter((values, index) => {
        return values.categoryID === id;
      });
    }
    // var array = product.filter((values, index) => {
    //   return values.parentID === id;
    // });
    console.log(array);
    console.log(product_name_search);
    if (product_name_search.sort_price_local === "-1") {
      array = array;
    } else if (product_name_search.sort_price_local === "0") {
      array = array.sort((a, b) => {
        // console.log(a);
        return (
          a.price * ((100 - a.sales) / 100) - b.price * ((100 - b.sales) / 100)
        );
      });
    } else if (product_name_search.sort_price_local === "1") {
      array = array.sort((a, b) => {
        // console.log(a);
        return (
          b.price * ((100 - b.sales) / 100) - a.price * ((100 - a.sales) / 100)
        );
      });
    }

    if (product_name_search.range_price_local) {
      array = array.filter((values, index) => {
        return (
          values.price * ((100 - values.sales) / 100) <
          Number(product_name_search.range_price_local)
        );
      });
    }

    console.log(array);
    if (product_name_search.star_local && product_name_search.star_local > 0) {
      array = array.filter((values, index) => {
        return Number(values.star) === product_name_search.star_local;
      });
    }

    if (
      product_name_search.sales_local &&
      product_name_search.sales_local > 0
    ) {
      array = array.filter((values, index) => {
        console.log(values);
        return Number(values.sales) === product_name_search.sales_local;
      });
    }

    if (product_name_search.search_product_name_local) {
      array = array.filter((values, index) => {
        return (
          values.name
            .toLowerCase()
            .indexOf(
              product_name_search.search_product_name_local.toLowerCase()
            ) !== -1
        );
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
              name="sort_price_local"
              value={product_name_search.sort_price_local}
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
                  name="range_price_local"
                  id="input"
                  onChange={this.onChange}
                  checked={product_name_search.range_price_local === "200"}
                  value="200"
                />
                <div className="store_product_left_price_range_name_under">
                  200$ Under
                </div>
              </label>
              <label className="store_product_left_price_range_name">
                <input
                  type="radio"
                  name="range_price_local"
                  id="input"
                  onChange={this.onChange}
                  checked={product_name_search.range_price_local === "400"}
                  value="400"
                />
                <div className="store_product_left_price_range_name_under">
                  400$ Under
                </div>
              </label>
              <label className="store_product_left_price_range_name">
                <input
                  type="radio"
                  name="range_price_local"
                  id="input"
                  onChange={this.onChange}
                  checked={product_name_search.range_price_local === "600"}
                  value="600"
                />
                <div className="store_product_left_price_range_name_under">
                  600$ Under
                </div>
              </label>
              <label className="store_product_left_price_range_name">
                <input
                  type="radio"
                  name="range_price_local"
                  id="input"
                  onChange={this.onChange}
                  checked={product_name_search.range_price_local === "800"}
                  value="800"
                />
                <div className="store_product_left_price_range_name_under">
                  800$ Under
                </div>
              </label>
              <label className="store_product_left_price_range_name">
                <input
                  type="radio"
                  name="range_price_local"
                  id="input"
                  onChange={this.onChange}
                  checked={product_name_search.range_price_local === "999"}
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
                    product_name_search.status === 1
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <Star
                  className={
                    product_name_search.status === 1
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <Star
                  className={
                    product_name_search.status === 1
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <Star
                  className={
                    product_name_search.status === 1
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <Star
                  className={
                    product_name_search.status === 1
                      ? "star_left_press"
                      : "star_left"
                  }
                />
              </div>
              <div
                onClick={() => this.onClickStar(4, 2)}
                className="store_product_left_sort"
              >
                <Star
                  className={
                    product_name_search.status === 2
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <Star
                  className={
                    product_name_search.status === 2
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <Star
                  className={
                    product_name_search.status === 2
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <Star
                  className={
                    product_name_search.status === 2
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <StarBorder
                  className={
                    product_name_search.status === 2
                      ? "star_left_press"
                      : "star_left"
                  }
                />
              </div>
              <div
                onClick={() => this.onClickStar(3, 3)}
                className="store_product_left_sort"
              >
                <Star
                  className={
                    product_name_search.status === 3
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <Star
                  className={
                    product_name_search.status === 3
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <Star
                  className={
                    product_name_search.status === 3
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <StarBorder
                  className={
                    product_name_search.status === 3
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <StarBorder
                  className={
                    product_name_search.status === 3
                      ? "star_left_press"
                      : "star_left"
                  }
                />
              </div>
              <div
                onClick={() => this.onClickStar(2, 4)}
                className="store_product_left_sort"
              >
                <Star
                  className={
                    product_name_search.status === 4
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <Star
                  className={
                    product_name_search.status === 4
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <StarBorder
                  className={
                    product_name_search.status === 4
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <StarBorder
                  className={
                    product_name_search.status === 4
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <StarBorder
                  className={
                    product_name_search.status === 4
                      ? "star_left_press"
                      : "star_left"
                  }
                />
              </div>
              <div
                onClick={() => this.onClickStar(1, 5)}
                className="store_product_left_sort"
              >
                <Star
                  className={
                    product_name_search.status === 5
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <StarBorder
                  className={
                    product_name_search.status === 5
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <StarBorder
                  className={
                    product_name_search.status === 5
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <StarBorder
                  className={
                    product_name_search.status === 5
                      ? "star_left_press"
                      : "star_left"
                  }
                />
                <StarBorder
                  className={
                    product_name_search.status === 5
                      ? "star_left_press"
                      : "star_left"
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
                  product_name_search.statusSales_local === 6
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
                  product_name_search.statusSales_local === 7
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
                name="search_product_name_local"
                value={product_name_search.search_product_name_local}
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
    // product_name_search: state.search_product_name,
    product_name_search: state.search_local,
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
      dispatch(actions.searchLocalReducers(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductStore);
