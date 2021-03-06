import React, { Component } from "react";
import "./styles.css";
import Star from "@material-ui/icons/Star";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import FilterListIcon from "@material-ui/icons/FilterList";
import ProductStoreItem from "./../ProductStoreItem/ProductStoreItem";
import StarBorder from "@material-ui/icons/StarBorder";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
class ProductStoreList extends Component {
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
  onClickReset = () => {
    var tasks = {
      search_product_name_local: "",
      sort_price_local: "-1",
      range_price_local: "",
      star_local: 0,
      sales_local: 0,
      status: 0,
      statusSales_local: 0,
    };
    console.log(tasks);
    this.props.searchProductNameReducers(tasks);
  };
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
      statusSales_local: value,
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
      status: value,
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
  showProduct = (product, category, match, slug, slugProduct, cart) => {
    var result = product.map((values, index) => {
      // var temp = 0;
      return (
        <ProductStoreItem
          index={index}
          name={values.name}
          category={category}
          values={values}
          match={match}
          price={values.price}
          quantity={values.quantity}
          star={values.star}
          onCart={this.props.onCart}
          id={values.id}
          productPictures={values.productPictures}
          slug={slug}
          slugProduct={slugProduct}
          cart={cart}
          sales={values.sales}
        />
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
          <div>
            <div className="store_product_left_price_range position">
              Reset Filter
            </div>
            <button
              onClick={this.onClickReset}
              className="reset"
              variant="danger"
            >
              Reset
            </button>
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
export default ProductStoreList;
