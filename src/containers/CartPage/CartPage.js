import React, { Component } from "react";
import "./styles.css";
import { Table } from "react-bootstrap";
import a from "./../../assets/images/iphone3-1.jpg";
import Layout from "./../../components/Layout/layout";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddIcon from "@material-ui/icons/Add";
class CartPage extends Component {
  render() {
    return (
      <Layout>
        <div className="shopping_cart">
          <div className="shopping_cart_left">
            <div className="shopping_cart_left_length">Cart (2 items)</div>
            <div className="shopping_cart_left_scroll">
              <div className="shopping_cart_left_item">
                <img className="shopping_cart_left_item_image" src={a} alt="" />
                <div className="shopping_cart_left_item_parent">
                  <div className="shopping_cart_left_item_parent_one">
                    <div className="shopping_cart_left_item_parent_one_name">
                      Blue denim shirt
                    </div>
                    <div className="shopping_cart_left_item_parent_one_quantity">
                      <div className="shopping_cart_left_item_parent_one_quantity_sub">
                        <RemoveIcon className="shopping_cart_left_item_parent_one_quantity_sub_minus" />
                      </div>
                      <div className="shopping_cart_left_item_parent_one_quantity_sub">
                        <div className="value">0</div>
                      </div>
                      <div className="shopping_cart_left_item_parent_one_quantity_sub">
                        <AddIcon className="shopping_cart_left_item_parent_one_quantity_sub_add" />
                      </div>
                    </div>
                  </div>
                  <div className="shopping_cart_left_item_parent_two">
                    <div>Laptops</div>
                  </div>
                  <div className="shopping_cart_left_item_parent_three">
                    <div className="shopping_cart_left_item_parent_three_delete">
                      <DeleteForeverIcon className="shopping_cart_left_item_parent_three_remove" />
                      <div>Remove to cart</div>
                    </div>
                    <div>900$</div>
                  </div>
                </div>
              </div>
              <div className="shopping_cart_left_space"></div>
            </div>
          </div>
          <div className="shopping_cart_right">
            <div className="shopping_cart_left_length">The total amount of</div>
            <div className="shopping_cart_right_money">
              <div className="shopping_cart_right_money_child">
                <div>Temporary amount: </div>
                <div>$53,98</div>
              </div>
              <div className="shopping_cart_right_money_child">
                <div>Shipping: </div>
                <div>$53,98</div>
              </div>
            </div>
            <div className="shopping_cart_right_space"></div>
            <div className="shopping_cart_right_money_total">
              <div className="shopping_cart_left_item_parent_one_name">
                The total amount of (including VAT):{" "}
              </div>
              <div className="shopping_cart_left_item_parent_one_name_total">
                $1153,98
              </div>
            </div>
            <a href="" className="place_order">
              Place Order
            </a>
          </div>
        </div>
      </Layout>
    );
  }
}

export default CartPage;
