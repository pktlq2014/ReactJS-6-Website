import React, { Component } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
class CheckoutItem extends Component {
  onClickRemoveProductCart = (index) => {
    if (
      confirm("Are you sure you want to remove this product from the cart?") // eslint-disable-line
    ) {
      this.props.onDeleteProductCart(index);
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
  render() {
    var { image, values, index } = this.props;
    return (
      <div>
        <div className="shopping_cart_left_item">
          <img
            className="shopping_cart_left_item_image"
            src={image.default}
            alt=""
          />
          <div className="shopping_cart_left_item_parent">
            <div className="shopping_cart_left_item_parent_one_child">
              <div className="shopping_cart_left_item_parent_one_name">
                {values.name}
              </div>
              <div className="shopping_cart_left_item_parent_one_quantity">
                <div className="shopping_cart_left_item_parent_one_quantity_sub">
                  <RemoveIcon
                    onClick={() => this.onClickRemove(1, values, index)}
                    className="shopping_cart_left_item_parent_one_quantity_sub_minus"
                  />
                </div>
                <div className="shopping_cart_left_item_parent_one_quantity_sub">
                  <div className="value">{values.quantity}</div>
                </div>
                <div className="shopping_cart_left_item_parent_one_quantity_sub">
                  <AddIcon
                    onClick={() => this.onClickAdd(1, values, index)}
                    className="shopping_cart_left_item_parent_one_quantity_sub_add"
                  />
                </div>
              </div>
            </div>
            <div className="shopping_cart_left_item_parent_two_child">
              <div>{values.nameIdParent}</div>
            </div>
            <div className="shopping_cart_left_item_parent_three_child">
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
        <div className="shopping_cart_left_space_child"></div>
      </div>
    );
  }
}
export default CheckoutItem;
