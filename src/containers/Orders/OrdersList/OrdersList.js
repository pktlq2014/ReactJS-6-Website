import React, { Component } from "react";
import "./styles.css";
import { Row, Col, Container, Table } from "react-bootstrap";
import OrdersItem from './../OrdersItem/OrdersItem';
import CloseIcon from "@material-ui/icons/Close";
import Layout from "../../../components/Layout/layout";
class OrdersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      status: 0,
      data: {},
    };
  }
  render() {
    var { orders } = this.props;
    const dataLogin = JSON.parse(localStorage.getItem("statusLogin"));
    console.log(orders);
    var array = [];
    orders.forEach((values, index) => {
      if (values.username === dataLogin.email) {
        array.push(values);
      }
    });
    console.log(array);
    return (
      <Layout>
        {array.length > 0 ? (
          <div>
            <div className="nearest_orders">Nearest Orders </div>
            <div className="orders_right">
              {array.reverse().map((object, index) => {
                var date = object.date.split(",");
                var dateDelivery = date[0].split("/");
                var dateSetup = 0,
                  monthSetup = 0,
                  yearSetup = 0;
                return <OrdersItem onOrdersAPI={this.props.onOrdersAPI} onOrdersDeleteAPI={this.props.onOrdersDeleteAPI} dateDelivery={dateDelivery} object={object} index={index}/>
              })}
            </div>
          </div>
        ) : (
          <div className="nearest_orders_yet">You Have No Orders Yet </div>
        )}
      </Layout>
    );
  }
}
export default OrdersList;
