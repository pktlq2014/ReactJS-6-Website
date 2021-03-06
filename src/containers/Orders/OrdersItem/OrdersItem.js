import React, { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Row, Col, Container, Table } from "react-bootstrap";
class OrdersItem extends Component {
  onClickDeleteOrders = (values, index, status) => {
    if(status >= 2) {
      alert('It is too late, orders are shipped or delivered so you cannot delete!!!');
    }
    else {
      this.props.onOrdersDeleteAPI(values);
    }
  };
  render() {
    var { index, object, dateDelivery } = this.props;
    return (
      <div key={index} className="order_parent">
        <div className="nearest_orders_parent">
          <div className="order_title">{`Order number : ${object.id}`}</div>
          <CloseIcon
            onClick={() =>
              this.onClickDeleteOrders(object, index, object.status)
            }
            fontSize="large"
            className="orders_delete"
          />
        </div>

        <div className="divide_title_content"></div>
        <div className="order_content">
          <div>
            <Table className="order_table" striped bordered hover size="sm">
              <thead>
                <tr className="order_table_item">
                  <th className="order_table_item_order_name">Account name</th>
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
                        delivery address not available, please check again
                      </div>
                    )}
                  </th>
                </tr>
                <tr className="order_table_item">
                  <th className="order_table_item_order_name">Total amount</th>
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
                        payment method not available, please check again
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
                  var image = require(`./../../../assets/images/${valuess.img}`);
                  return (
                    <div key={index1} className="status_order_web_left">
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
                          } (quantity) = ${valuess.price * valuess.quantity}`}
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
                <div>{`${Number(dateDelivery[1])}/${dateDelivery[0]}/${
                  dateDelivery[2]
                }`}</div>
              </div>

              {object.status > 1 ? (
                <div className="timeline_child">
                  <div>packed</div>
                  <div className="timeline_child_status">
                    <div className="timeline_2_child">2</div>
                    <div className="timeline_status update_status"></div>
                  </div>
                  <div>{`${Number(dateDelivery[1]) + 1}/${dateDelivery[0]}/${
                    dateDelivery[2]
                  }`}</div>
                </div>
              ) : (
                <div className="timeline_child_active">
                  <div>packed</div>
                  <div className="timeline_child_status">
                    <div className="timeline_2_child_active">2</div>
                    <div className="timeline_status"></div>
                  </div>
                  <div>{`${Number(dateDelivery[1]) + 1}/${dateDelivery[0]}/${
                    dateDelivery[2]
                  }`}</div>
                </div>
              )}

              {object.status >= 3 && object.status <= 4 ? (
                <div className="timeline_child">
                  <div>shipped</div>
                  <div className="timeline_child_status">
                    <div className="timeline_2_child">3</div>
                    <div className="timeline_status update_status"></div>
                  </div>
                  <div>{`${Number(dateDelivery[1]) + 2}/${dateDelivery[0]}/${
                    dateDelivery[2]
                  }`}</div>
                </div>
              ) : (
                <div className="timeline_child_active">
                  <div>shipped</div>
                  <div className="timeline_child_status">
                    <div className="timeline_2_child_active">3</div>
                    <div className="timeline_status"></div>
                  </div>
                  <div>{`${Number(dateDelivery[1]) + 2}/${dateDelivery[0]}/${
                    dateDelivery[2]
                  }`}</div>
                </div>
              )}

              {object.status > 3 && object.status <= 4 ? (
                <div className="timeline_child">
                  <div>delivered</div>
                  <div className="timeline_child_status">
                    <div className="timeline_2_child">4</div>
                  </div>
                  <div>{`${Number(dateDelivery[1]) + 3}/${dateDelivery[0]}/${
                    dateDelivery[2]
                  }`}</div>
                </div>
              ) : (
                <div className="timeline_child_active">
                  <div>delivered</div>
                  <div className="timeline_child_status">
                    <div className="timeline_2_child_active">4</div>
                  </div>
                  <div>{`${Number(dateDelivery[1]) + 3}/${dateDelivery[0]}/${
                    dateDelivery[2]
                  }`}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default OrdersItem;
