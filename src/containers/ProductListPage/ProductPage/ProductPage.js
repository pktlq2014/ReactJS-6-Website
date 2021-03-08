import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
import { ImageTwoTone } from "@material-ui/icons";
class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.onTypeAPI();
  }
  render() {
    var { type } = this.props;
    console.log(type);
    return (
      <div>
        {type.map((values, index) => {
          return <h3>{values.title}</h3>;
        })}
        {type.map((values, index) => {
          return (
            <Carousel renderThumbs={() => {}}>
              {values.banners &&
                values.banners.map((valuess, index) => {
                  console.log(valuess.img);
                  var image = require(`./../../../assets/images/${valuess.img}`);
                  return (
                    <a
                      href={valuess.navigateTo}
                      style={{ display: "block" }}
                      key={index}
                    >
                      <img src={image.default} alt="" />
                    </a>
                  );
                })}
            </Carousel>
          );
        })}
        {type.map((values, index) => {
          return (
            <div key={index}> 
              {values.products &&
                values.products.map((valuess, index1) => {
                  var image = require(`./../../../assets/images/${valuess.img}`);
                  return (
                    <div key={index1}>
                      <img src={image.default} alt="" />
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    type: state.type,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onTypeAPI: () => {
      dispatch(actions.typeAPI());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
