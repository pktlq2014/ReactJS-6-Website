import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/index";
import OrdersList from "./../OrdersList/OrdersList";
class OrdersContainer extends Component {
  componentDidMount() {
    this.props.onOrdersAPI();
  }
  render() {
    var { orders, onOrdersAPI, onOrdersDeleteAPI } = this.props;
    return (
      <OrdersList
        onOrdersDeleteAPI={onOrdersDeleteAPI}
        onOrdersAPI={onOrdersAPI}
        orders={orders}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onOrdersAPI: () => {
      dispatch(actions.ordersAPI());
    },
    onOrdersDeleteAPI: (data) => {
      dispatch(actions.deleteOrdersAPI(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer);
