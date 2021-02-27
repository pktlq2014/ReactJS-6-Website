import React, { Component } from "react";
import "./styles.css";
import { Row, Col, Container, Button, Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
class MenuHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getMenu = (currentLevel, category) => {
    const menuChildren = currentLevel.map((item, index) => {
      // giả sử không có proptery children hoặc length nó = 0
      //   if (!item.children || item.children.length === 0) {
      //     return <li key={index}>{item.name}</li>;
      //   } else {
      //     return (
      //       <li key={index}>
      //         {
      //             item.idParent && item.idParent.length > 0 ? <a href="">{item.name}</a>
      //             : <span>{item.name}</span>
      //         }
      //         {
      //           <ul>
      //             <li>{this.getMenu(item.children)}</li>
      //           </ul>
      //         }
      //       </li>
      //     );
      //   }
      return (
        <li key={index} className="category">
          {item.idParent.length > 0 ? <a href="samsung">{item.name}</a> : 
            <span>{item.name}</span>
          }
          
          {
            <ul>
              {this.getMenu(item.children)}
            </ul>
          }
        </li>
      );
    });
    return menuChildren;
  };
  componentDidMount() {
    this.props.onCategory();
  }
  createCategories = (categories, idParent = null) => {
    console.log(categories);
    const categoryList = [];
    let category;
    if (idParent === null) {
      category = categories.filter((cat, index) => {
        return cat.idParent === undefined || cat.idParent === "";
      });
    } else {
      category = categories.filter((cat) => cat.idParent === idParent);
    }
    console.log(category);
    for (let cate of category) {
      categoryList.push({
        id: cate.id,
        name: cate.name,
        idParent: cate.idParent,
        children: this.createCategories(categories, cate.id),
      });
    }
    console.log(categoryList);
    return categoryList;
  };
  render() {
    var { category } = this.props;
    console.log(category);
    var categorySort = this.createCategories(category);
    console.log(categorySort);
    return (
      <div>
        <Container fluid>
          <Row className="side_bar">
            <Col
              md={12}
              className="menuHeader textAlign-justify side_bar-marginLeft"
            >
              <ul>{this.getMenu(categorySort, category)}</ul>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onCategory: () => {
      dispatch(actions.categoryAPI());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuHeader);
