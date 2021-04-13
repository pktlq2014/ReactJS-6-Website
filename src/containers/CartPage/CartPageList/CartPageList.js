import React, { Component } from "react";
import "./styles.css";
import { Table } from "react-bootstrap";
import a from "./../../../assets/images/iphone3-1.jpg";
import Layout from "./../../../components/Layout/layout";
import { Link, Redirect } from "react-router-dom";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddIcon from "@material-ui/icons/Add";
import CartPageItem from "../CartPageItem/CartPageItem";
class CartPageList extends Component {
  onClickRemoveProductCart = (index) => {
    if (
      confirm("Are you sure you want to remove this product from the cart? ")) {//eslint-disable-line
      this.props.onDeleteProductCart(index);
    }
  };
  onClickCartNull = () => {
    alert("Cannot use checkout function. Please check the cart again!!!");
  };
  render() {
    var { cart } = this.props;
    const dataLogin = JSON.parse(localStorage.getItem("statusLogin"));
    console.log(cart);
    var money = 0;
    cart.forEach((values, index) => {
      money += values.quantity * values.price;
    });
    return (
      <Layout>
        <div className="shopping_cart">
          <div className="shopping_cart_left">
            <div className="shopping_cart_left_length">
              Cart ({cart.length} items)
            </div>
            <div className="shopping_cart_left_scroll">
              {cart.map((values, index) => {
                var image = require(`./../../../assets/images/${values.img}`);
                return (
                  <CartPageItem
                    onDeleteProductCart={this.props.onDeleteProductCart}
                    onCart={this.props.onCart}
                    values={values}
                    index={index}
                    image={image}
                  />
                );
              })}
            </div>
          </div>
          <div className="shopping_cart_right">
            <div className="shopping_cart_left_length">The total amount of</div>
            <div className="shopping_cart_right_money">
              <div className="shopping_cart_right_money_child">
                <div>Temporary amount: </div>
                <div>{money}$</div>
              </div>
              <div className="shopping_cart_right_money_child">
                <div>Shipping: </div>
                <div>6$</div>
              </div>
            </div>
            <div className="shopping_cart_right_space"></div>
            <div className="shopping_cart_right_money_total">
              <div className="shopping_cart_left_item_parent_one_name">
                The total amount of (including VAT):{" "}
              </div>
              <div className="shopping_cart_left_item_parent_one_name_total">
                {money <= 6 ? 0 : money + 6}$
              </div>
            </div>
            <div className="place_order_bottom">
              {money <= 6 ? (
                <a
                  onClick={this.onClickCartNull}
                  href="#"
                  className="place_order"
                >
                  Checkout
                </a>
              ) : (
                <Link to="/checkout" className="place_order">
                  Checkout
                </Link>
              )}
              <Link to="/" className="continue">
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default CartPageList;
