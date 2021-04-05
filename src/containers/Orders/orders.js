import React, { Component } from "react";
import "./styles.css";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
import { Row, Col, Container, Table } from "react-bootstrap";
import CloseIcon from "@material-ui/icons/Close";
import Layout from "./../../components/Layout/layout";
class orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      status: 0,
      data: {},
    };
  }
  onClickDeleteOrders = (values, index) => {
    this.props.onOrdersDeleteAPI(values);
  };
  componentDidMount() {
    this.props.onOrdersAPI();
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
                return (
                  <div key={index} className="order_parent">
                    <div className="nearest_orders_parent">
                      <div className="order_title">{`Order number : ${object.id}`}</div>
                      <CloseIcon
                        onClick={() => this.onClickDeleteOrders(object, index)}
                        fontSize="large"
                        className="orders_delete"
                      />
                    </div>

                    <div className="divide_title_content"></div>
                    <div className="order_content">
                      <div>
                        <Table
                          className="order_table"
                          striped
                          bordered
                          hover
                          size="sm"
                        >
                          <thead>
                            <tr className="order_table_item">
                              <th className="order_table_item_order_name">
                                Account name
                              </th>
                              <th className="order_table_item_order_content">
                                {object.username}
                              </th>
                            </tr>
                            <tr className="order_table_item">
                              <th className="order_table_item_order_name">
                                Delivery address
                              </th>
                              <th className="order_table_item_order_content limit">
                                {object.address ? (
                                  object.address
                                ) : (
                                  <div className="order_table_item_available">
                                    delivery address not available, please check
                                    again
                                  </div>
                                )}
                              </th>
                            </tr>
                            <tr className="order_table_item">
                              <th className="order_table_item_order_name">
                                Total amount
                              </th>
                              <th className="order_table_item_order_content">
                                {object.total + 6}$ (+6$ shipping)
                              </th>
                            </tr>
                            <tr className="order_table_item">
                              <th className="order_table_item_order_name">
                                Payment method
                              </th>
                              <th className="order_table_item_order_content">
                                {object.payment ? (
                                  object.payment
                                ) : (
                                  <div className="order_table_item_available">
                                    payment method not available, please check
                                    again
                                  </div>
                                )}
                              </th>
                            </tr>
                            <tr>
                              <th>Date of order</th>
                              <th>{`${dateDelivery[1]}/${dateDelivery[0]}/${dateDelivery[2]}`}</th>
                            </tr>
                          </thead>
                        </Table>
                      </div>
                      <div key={index} className="status_order_web">
                        <div className="status_order_web_parent">
                          {object.cart &&
                            object.cart.map((valuess, index1) => {
                              var image = require(`./../../assets/images/${valuess.img}`);
                              return (
                                <div
                                  key={index1}
                                  className="status_order_web_left"
                                >
                                  <div>
                                    <img
                                      className="image_orders_product"
                                      src={image.default}
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <div className="image_orders_product_name">
                                      {valuess.name}
                                    </div>
                                    <div>
                                      {`${valuess.price}$ (price) x ${
                                        valuess.quantity
                                      } (quantity) = ${
                                        valuess.price * valuess.quantity
                                      }`}
                                      $
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                        <div className="timeline">
                          <div className="timeline_child">
                            <div>ordered</div>
                            <div className="timeline_child_status">
                              <div className="timeline_2_child">1</div>
                              {object.status > 0 ? (
                                <div className="timeline_status update_status"></div>
                              ) : (
                                <div className="timeline_status"></div>
                              )}
                            </div>
                            <div>{`${Number(dateDelivery[1])}/${
                              dateDelivery[0]
                            }/${dateDelivery[2]}`}</div>
                          </div>

                          {object.status > 1 ? (
                            <div className="timeline_child">
                              <div>packed</div>
                              <div className="timeline_child_status">
                                <div className="timeline_2_child">2</div>
                                <div className="timeline_status update_status"></div>
                              </div>
                              <div>{`${Number(dateDelivery[1]) + 1}/${
                                dateDelivery[0]
                              }/${dateDelivery[2]}`}</div>
                            </div>
                          ) : (
                            <div className="timeline_child_active">
                              <div>packed</div>
                              <div className="timeline_child_status">
                                <div className="timeline_2_child_active">2</div>
                                <div className="timeline_status"></div>
                              </div>
                              <div>{`${Number(dateDelivery[1]) + 1}/${
                                dateDelivery[0]
                              }/${dateDelivery[2]}`}</div>
                            </div>
                          )}

                          {object.status >= 3 && object.status <= 4 ? (
                            <div className="timeline_child">
                              <div>shipped</div>
                              <div className="timeline_child_status">
                                <div className="timeline_2_child">3</div>
                                <div className="timeline_status update_status"></div>
                              </div>
                              <div>{`${Number(dateDelivery[1]) + 2}/${
                                dateDelivery[0]
                              }/${dateDelivery[2]}`}</div>
                            </div>
                          ) : (
                            <div className="timeline_child_active">
                              <div>shipped</div>
                              <div className="timeline_child_status">
                                <div className="timeline_2_child_active">3</div>
                                <div className="timeline_status"></div>
                              </div>
                              <div>{`${Number(dateDelivery[1]) + 2}/${
                                dateDelivery[0]
                              }/${dateDelivery[2]}`}</div>
                            </div>
                          )}

                          {object.status > 3 && object.status <= 4 ? (
                            <div className="timeline_child">
                              <div>delivered</div>
                              <div className="timeline_child_status">
                                <div className="timeline_2_child">4</div>
                              </div>
                              <div>{`${Number(dateDelivery[1]) + 3}/${
                                dateDelivery[0]
                              }/${dateDelivery[2]}`}</div>
                            </div>
                          ) : (
                            <div className="timeline_child_active">
                              <div>delivered</div>
                              <div className="timeline_child_status">
                                <div className="timeline_2_child_active">4</div>
                              </div>
                              <div>{`${Number(dateDelivery[1]) + 3}/${
                                dateDelivery[0]
                              }/${dateDelivery[2]}`}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
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
export default connect(mapStateToProps, mapDispatchToProps)(orders);
