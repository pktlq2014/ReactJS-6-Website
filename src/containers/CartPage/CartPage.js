import React, { Component } from "react";
import "./styles.css";
import { Table } from "react-bootstrap";
import a from "./../../assets/images/iphone3-1.jpg";
import Layout from "./../../components/Layout/layout";
import { Link, Redirect } from "react-router-dom";
import * as actions from "./../../actions/index";
import { connect } from "react-redux";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddIcon from "@material-ui/icons/Add";
class CartPage extends Component {
  onClickRemoveProductCart = (index) => {
    this.props.onDeleteProductCart(index);
  };
  onClickRemove = (quantity, values, index) => {
    var object = {};
    var data = values.quantity;
    data -= quantity;
    if (data <= 0) {
      this.props.onDeleteProductCart(index);
    } else {
      object = {
        id: values.id,
        name: values.name,
        price: values.price,
        img: values.img,
        quantity: data,
        nameIdParent: values.nameIdParent,
      };
      this.props.onCart(object, index);
    }
  };
  onClickAdd = (quantity, values, index) => {
    var object = {};
    var data = values.quantity;
    data += quantity;
    if (data <= 10) {
      object = {
        id: values.id,
        name: values.name,
        price: values.price,
        img: values.img,
        quantity: data,
        nameIdParent: values.nameIdParent,
      };
      this.props.onCart(object, index);
    }
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
            <div className="shopping_cart_left_length">Cart ({cart.length} items)</div>
            <div className="shopping_cart_left_scroll">
              {cart.map((values, index) => {
                var image = require(`./../../assets/images/${values.img}`);
                return (
                  <div>
                    <div className="shopping_cart_left_item">
                      <img
                        className="shopping_cart_left_item_image"
                        src={image.default}
                        alt=""
                      />
                      <div className="shopping_cart_left_item_parent">
                        <div className="shopping_cart_left_item_parent_one">
                          <div className="shopping_cart_left_item_parent_one_name">
                            {values.name}
                          </div>
                          <div className="shopping_cart_left_item_parent_one_quantity">
                            <div className="shopping_cart_left_item_parent_one_quantity_sub">
                              <RemoveIcon
                                onClick={() =>
                                  this.onClickRemove(1, values, index)
                                }
                                className="shopping_cart_left_item_parent_one_quantity_sub_minus"
                              />
                            </div>
                            <div className="shopping_cart_left_item_parent_one_quantity_sub">
                              <div className="value">{values.quantity}</div>
                            </div>
                            <div className="shopping_cart_left_item_parent_one_quantity_sub">
                              <AddIcon
                                onClick={() =>
                                  this.onClickAdd(1, values, index)
                                }
                                className="shopping_cart_left_item_parent_one_quantity_sub_add"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="shopping_cart_left_item_parent_two">
                          <div>{values.nameIdParent}</div>
                        </div>
                        <div className="shopping_cart_left_item_parent_three">
                          <div
                            onClick={() => this.onClickRemoveProductCart(index)}
                            className="shopping_cart_left_item_parent_three_delete"
                          >
                            <DeleteForeverIcon className="shopping_cart_left_item_parent_three_remove" />
                            <div>Remove to cart</div>
                          </div>
                          <div> {values.price * values.quantity}$</div>
                        </div>
                      </div>
                    </div>
                    <div className="shopping_cart_left_space"></div>
                  </div>
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
              <Link to="/checkout" className="place_order">
                Checkout
              </Link>
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
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onCart: (data, index) => {
      dispatch(actions.quantityUpdateReducers(data, index));
    },
    onDeleteProductCart: (index) => {
      dispatch(actions.deleteProductReducers(index));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
