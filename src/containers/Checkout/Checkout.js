import React, { Component } from "react";
import "./styles.css";
import Layout from "./../../components/Layout/layout";
import Table from "react-bootstrap/Table";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      addressUpdate: "",
      addressSelect: "",
      temp: 0,
      index: -1,
      payment: "",
      currentDateTime: new Date().toLocaleString(),
    };
  }
  onClickOrder = (object) => {
    console.log(object);
    if (
      object.address === "" ||
      object.payment === "" ||
      object.order.length === 0
    ) {
      alert("Order information is incomplete. Please check again!!!");
    } else {
      var phone = object.address.split(" - ");
      this.props.onOrder(object);
      localStorage.removeItem("cart");
      this.props.onCartDelete([]);
      this.props.history.push(`/`);
      alert(
        `The order has been saved in the system. We will contact you by phone number ${phone[1]}, thank you for your order.`
      );
    }
  };
  onClickRemoveProductCart = (index) => {
    if (
      confirm("Are you sure you want to remove this product from the cart?")       // eslint-disable-line
    ) { 
      this.props.onDeleteProductCart(index);
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
  onClickDelete = (index) => {
    console.log(index);
    var id;
    var dataLogin = JSON.parse(localStorage.getItem("statusLogin"));
    var { signin } = this.props;
    signin.forEach((values, index1) => {
      if (values.email === dataLogin.email) {
        values.address.splice(index, 1);
        // console.log(values.address[index]);
        this.props.onAddress(values);
      }
    });
  };
  onClickCancel = () => {
    this.setState({
      temp: 0,
    });
  };
  onSubmitEdit = (e) => {
    e.preventDefault();
    console.log(this.state);
    var dataLogin = JSON.parse(localStorage.getItem("statusLogin"));
    var { signin } = this.props;
    var object = {};
    signin.forEach((values, index1) => {
      if (values.email === dataLogin.email) {
        values.address[this.state.index].name = this.state.addressUpdate;
        this.props.onAddress(values);
      }
    });
    console.log(object);
    this.setState({
      addressUpdate: "",
      temp: 0,
    });
  };
  onClickEdit = (index) => {
    console.log(index);
    var name;
    var { signin } = this.props;
    var dataLogin = JSON.parse(localStorage.getItem("statusLogin"));
    console.log(signin);
    signin.forEach((values, index1) => {
      if (values.email === dataLogin.email) {
        name = values.address[index].name;
      }
    });
    console.log(name);
    this.setState({
      temp: 1,
      addressUpdate: name,
      index: index,
    });
  };
  onChange = (e) => {
    var dataLogin = JSON.parse(localStorage.getItem("statusLogin"));
    var { target } = e;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.address);
    var dataLogin = JSON.parse(localStorage.getItem("statusLogin"));
    var { signin } = this.props;
    //var name = [];
    //name.push({name : this.state.address});
    signin.forEach((values, index) => {
      if (values.email === dataLogin.email) {
        var array = values.address;
        array.push({
          id: values.address.length + 1,
          name: `${this.state.address} - ${dataLogin.phone}`,
        });
        var object = {
          id: values.id,
          email: values.email,
          password: values.password,
          lastname: values.lastname,
          firstname: values.firstname,
          repassword: values.repassword,
          phone: values.phone,
          radio: values.radio,
          role: values.role,
          address: array,
        };
        this.props.onAddress(object);
      }
    });
    this.setState({
      address: "",
    });
  };
  render() {
    var { cart } = this.props;
    console.log(this.state);
    console.log(this.state.payment);
    const dataLogin = JSON.parse(localStorage.getItem("statusLogin"));
    var { address, signin } = this.props;
    console.log(address);
    console.log(signin);
    console.log(this.state.addressSelect);
    var array = [];
    signin.forEach((values, index) => {
      if (values.email === dataLogin.email) {
        array = values.address;
      }
    });
    var money = 0;
    cart.forEach((values, index) => {
      money += values.quantity * values.price;
    });
    var order = [];
    cart.forEach((values, index) => {
      order.push({
        productID: values.id,
        name: values.name,
        price: values.price,
        quantity: values.quantity,
      });
    });
    var object = {
      username: dataLogin.email,
      address: this.state.addressSelect,
      order: order,
      total: money,
      payment: this.state.payment,
      date: this.state.currentDateTime,
    };
    return (
      <Layout>
        <div className="checkout_parent">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="checkout_parent_title">
                <div className="checkout_parent_title_stt">1</div>
                <div className="checkout_parent_title_right">Login</div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails id="panel1a-header-child_one">
              <Typography className="checkout_parent_content">
                <b>Username</b> : {dataLogin.email}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="checkout_parent_title">
                <div className="checkout_parent_title_stt">2</div>
                <div className="checkout_parent_title_right">
                  Delivery Address
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails id="panel1a-header-child">
              <Typography className="checkout_parent_content">
                {this.state.temp === 0 ? (
                  <form onSubmit={this.onSubmit} className="">
                    <input
                      type="text"
                      className="address_input"
                      name="address"
                      value={this.state.address}
                      onChange={this.onChange}
                      placeholder="Add an address here including: house number, street, ward, county, city where you live "
                    />
                    <button type="submit" className="button_address">
                      Create
                    </button>
                  </form>
                ) : (
                  <div className="edit_status">
                    <form onSubmit={this.onSubmitEdit} className="">
                      <input
                        type="text"
                        className="address_input"
                        name="addressUpdate"
                        value={this.state.addressUpdate}
                        onChange={this.onChange}
                      />
                      <button type="submit" className="button_address">
                        Update
                      </button>
                    </form>
                    <button
                      onClick={this.onClickCancel}
                      type="submit"
                      className="button_address"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                <div className="address">
                  {array.map((values, index) => {
                    return (
                      <div className="address_full">
                        <label className="address_select">
                          <input
                            type="radio"
                            name="addressSelect"
                            id="input"
                            onChange={this.onChange}
                            checked={this.state.addressSelect === values.name}
                            value={values.name}
                          />
                          <div className="address_select_name">
                            {values.name}
                          </div>
                        </label>
                        <div>
                          <EditIcon
                            onClick={() => this.onClickEdit(index)}
                            fontSize="small"
                            className="address_full_edit"
                          />
                          <DeleteForeverIcon
                            fontSize="small"
                            className="address_full_delete"
                            onClick={() => this.onClickDelete(index)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="checkout_parent_title">
                <div className="checkout_parent_title_stt">3</div>
                <div className="checkout_parent_title_right">Order Summary</div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails id="panel1a-header-child_three">
              <Typography className="checkout_parent_content_child">
                <div className="order_summary">
                  <div className="shopping_cart_left_scroll_child">
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
                              <div className="shopping_cart_left_item_parent_one_child">
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
                                    <div className="value">
                                      {values.quantity}
                                    </div>
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
                              <div className="shopping_cart_left_item_parent_two_child">
                                <div>{values.nameIdParent}</div>
                              </div>
                              <div className="shopping_cart_left_item_parent_three_child">
                                <div
                                  onClick={() =>
                                    this.onClickRemoveProductCart(index)
                                  }
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
                    })}
                  </div>
                  <div className="order_summary_title">
                    <div className="order_summary_title_quantity">
                      ({cart.length} items)
                    </div>
                    <div className="order_summary_title_quantity">
                      The total amount of = {money}$ (temporary amount) + 6$
                      (shipping) = {money + 6}$ (including VAT)
                    </div>
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="checkout_parent_title">
                <div className="checkout_parent_title_stt">4</div>
                <div className="checkout_parent_title_right">
                  Choose Payment Method
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails id="panel1a-header-child">
              <Typography className="checkout_parent_content">
                <div className="payment_option">
                  <label className="payment_option_two_in_one">
                    <input
                      type="radio"
                      name="payment"
                      id=""
                      onChange={this.onChange}
                      checked={this.state.payment === "direct"}
                      value="direct"
                    />
                    <div className="option_name">
                      Direct payment (pay on delivery){" "}
                    </div>
                  </label>
                  <div className="space_option_payment"></div>
                  <label className="payment_option_two_in_one">
                    <input
                      type="radio"
                      name="payment"
                      id=""
                      onChange={this.onChange}
                      checked={this.state.payment === "online"}
                      value="online"
                    />
                    <div className="option_name">Online payment</div>
                  </label>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="checkout_parent_title">
                <div className="checkout_parent_title_stt">5</div>
                <div className="checkout_parent_title_right">
                  Payment Confirmation
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails id="panel1a-header-child">
              <Typography className="checkout_parent_content">
                <div className="confirmation">
                  <div className="confirmation_attention">
                    Please check the delivery address, order summary, payment
                    method before sending the order to the website system!!!
                  </div>
                  <Table
                    className="order_table"
                    striped
                    bordered
                    hover
                    size="sm"
                  >
                    <thead>
                      <tr className="order_table_item">
                        <th className="order_table_item_order_name">Usename</th>
                        <th className="order_table_item_order_content">
                          {object.username}
                        </th>
                      </tr>
                      <tr className="order_table_item">
                        <th className="order_table_item_order_name">
                          Delivery Address
                        </th>
                        <th className="order_table_item_order_content limit">
                          {object.address ? (
                            object.address
                          ) : (
                            <div className="order_table_item_available">
                              delivery address not available, please check again
                            </div>
                          )}
                        </th>
                      </tr>
                      <tr className="order_table_item">
                        <th className="order_table_item_order_name">Order</th>
                        <th className="order_table_item_order_content">
                          {object.order.map((values, index) => {
                            return (
                              <div>{`${values.name} : ${
                                values.price
                              }$ (price) x ${values.quantity} (quantity) = ${
                                values.price * values.quantity
                              }$`}</div>
                            );
                          })}
                        </th>
                      </tr>
                      <tr className="order_table_item">
                        <th className="order_table_item_order_name">
                          Total Amount
                        </th>
                        <th className="order_table_item_order_content">
                          {object.total + 6}$ (+6$ shipping)
                        </th>
                      </tr>
                      <tr className="order_table_item">
                        <th className="order_table_item_order_name">
                          Payment Method
                        </th>
                        <th className="order_table_item_order_content">
                          {object.payment ? (
                            object.payment
                          ) : (
                            <div className="order_table_item_available">
                              payment method not available, please check again
                            </div>
                          )}
                        </th>
                      </tr>
                    </thead>
                  </Table>
                  <button
                    onClick={() => this.onClickOrder(object)}
                    className="confirmation_button"
                  >
                    I have checked order carefully, confirmation
                  </button>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    address: state.address,
    signin: state.signin,
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddress: (data) => {
      dispatch(actions.updateCategoryAPI(data));
    },
    onDeleteAddress: (data) => {
      dispatch(actions.deleteCategoryAPI(data));
    },
    onCart: (data, index) => {
      dispatch(actions.quantityUpdateReducers(data, index));
    },
    onDeleteProductCart: (index) => {
      dispatch(actions.deleteProductReducers(index));
    },
    onOrder: (data) => {
      dispatch(actions.orderAPI(data));
    },
    onCartDelete: (data) => {
      dispatch(actions.cartDeleteReducers(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
