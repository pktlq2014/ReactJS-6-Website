import React, { Component } from "react";
import FilterCenterFocusIcon from "@material-ui/icons/FilterCenterFocus";
import SearchIcon from "@material-ui/icons/Search";
import { Link, Redirect } from "react-router-dom";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
class HomePageItem extends Component {
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
  render() {
    var {
      image,
      index2,
      id,
      cart,
      stringParent,
      string,
      name,
      nameProduct,
      valuess,
      count,
      category,
    } = this.props;
    var count1 = count;
    var stringParent1 = stringParent;
    var string1 = string;
    return (
      <div className="product" key={index2}>
        <div className="product__header">
          {image && <img src={image.default} alt={image.default} />}
        </div>

        <ul>
          {cart &&
            cart.map((valuessss, index) => {
              if (valuessss.id === valuess.id) {
                count1 = 1;
                return (
                  <li className="in_cart_home">
                    <AddShoppingCartIcon className="in_cart_home" />
                  </li>
                );
              }
            })}
          {count1 === 0 ? (
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
              string1 = valuesss.name.toLowerCase();
              stringParent1 = valuesss.id;
            }
          })}
          <Link
            className="search_link"
            style={{ textDecoration: "none" }}
            to={`/${string1}/${valuess.id}/p`}
          >
            <li>
              <a>
                <SearchIcon className="product_icon" />
              </a>
            </li>
          </Link>
          <Link to={`/${nameProduct.toLowerCase()}?cid=${id}&type=store`}>
            <li>
              <a>
                <FilterCenterFocusIcon className="product_icon" />
              </a>
            </li>
          </Link>
        </ul>
      </div>
    );
  }
}
export default HomePageItem;
