import React, { Component } from "react";
import Layout from "./../../components/Layout/layout";
import { connect } from "react-redux";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import * as actions from "./../../actions/index";
import { BiRupee } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import EmailIcon from "@material-ui/icons/Email";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link, Redirect } from "react-router-dom";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { AiFillThunderbolt } from "react-icons/ai";
import StarBorder from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";
import Button1 from "react-bootstrap/Button";
import TextField from "@material-ui/core/TextField";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Star from "@material-ui/icons/Star";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { MaterialButton } from "./../../components/MaterialUI/materialUI";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import FaceIcon from "@material-ui/icons/Face";
import store from "./../../assets/images/store.jpg";
import DoneIcon from "@material-ui/icons/Done";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import FeedbackIcon from "@material-ui/icons/Feedback";
import HelpIcon from "@material-ui/icons/Help";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./styles.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

class ProductDetailsPage extends Component {
  constructor(props) {
    super(props);
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    this.state = {
      arrayCart: [],
      productStatus: 0,
      show: "show",
      hidden: "hidden",
      value: 0,
      currentDateTime: new Date().toLocaleString(),
      question: "",
      feedback: "",
      array: [],
      countFavourite: 0,
      countDislike: 0,
      countLike: 0,
      countQuestion: 0,
      localArray: [],
      imageData: "",
    };
  }
  onClickLike = () => {
    this.setState({
      countLike: this.state.countLike + 1,
    });
    var { product, signin } = this.props;
    var { productId } = this.props.match.params;
    var local = JSON.parse(localStorage.getItem("statusLogin"));
    this.props.onFavourite(local);
    console.log(signin);
    var data = product.filter((values, index) => {
      if (values.id === productId) {
        return values;
      }
    });
    var temp1 = 0,
      temp2 = 0;
    if (local) {
      data.forEach((values, index) => {
        if (values.like.length <= 0) {
          var object = {
            date: this.state.currentDateTime,
            img: local.img,
            email: local.email,
          };
          console.log(object);
          this.state.array.push(object);
          product.forEach((values, index) => {
            if (values.id === productId) {
              //values.question = this.state.array;
              values.like.push(object);
              console.log(values);
              this.props.onQuestion(values);
            }
          });
        } else {
          values.like.forEach((valuess, index) => {
            if (valuess.email.toLowerCase() === local.email.toLowerCase()) {
              temp1 = 1;
            } else {
              temp2 = 1;
            }
          });
        }
      });
      if (temp1 === 0 && temp2 === 1) {
        var object = {
          date: this.state.currentDateTime,
          img: local.img,
          email: local.email,
        };
        console.log(object);
        this.state.array.push(object);
        product.forEach((values, index) => {
          if (values.id === productId) {
            //values.question = this.state.array;
            values.like.push(object);
            console.log(values);
            this.props.onQuestion(values);
          }
        });
      }
    } else {
      alert("You need to be signin before executing this function ");
    }
  };
  onClickDislike = () => {
    this.setState({
      countDislike: this.state.countDislike + 1,
    });
    var { product, signin } = this.props;
    var { productId } = this.props.match.params;
    var local = JSON.parse(localStorage.getItem("statusLogin"));
    this.props.onFavourite(local);
    console.log(signin);
    var data = product.filter((values, index) => {
      if (values.id === productId) {
        return values;
      }
    });
    var temp1 = 0,
      temp2 = 0;
    if (local) {
      data.forEach((values, index) => {
        if (values.dislike.length <= 0) {
          var object = {
            date: this.state.currentDateTime,
            img: local.img,
            email: local.email,
          };
          console.log(object);
          this.state.array.push(object);
          product.forEach((values, index) => {
            if (values.id === productId) {
              //values.question = this.state.array;
              values.dislike.push(object);
              console.log(values);
              this.props.onQuestion(values);
            }
          });
        } else {
          values.dislike.forEach((valuess, index) => {
            if (valuess.email.toLowerCase() === local.email.toLowerCase()) {
              temp1 = 1;
            } else {
              temp2 = 1;
            }
          });
        }
      });
      if (temp1 === 0 && temp2 === 1) {
        var object = {
          date: this.state.currentDateTime,
          img: local.img,
          email: local.email,
        };
        console.log(object);
        this.state.array.push(object);
        product.forEach((values, index) => {
          if (values.id === productId) {
            //values.question = this.state.array;
            values.dislike.push(object);
            console.log(values);
            this.props.onQuestion(values);
          }
        });
      }
    } else {
      alert("You need to be signin before executing this function ");
    }
  };
  onClickFavourite = () => {
    this.setState({
      countFavourite: this.state.countFavourite + 1,
    });
    var { product, signin } = this.props;
    var { productId } = this.props.match.params;
    var local = JSON.parse(localStorage.getItem("statusLogin"));
    this.props.onFavourite(local);
    console.log(signin);
    var array = [];

    var data = product.filter((values, index) => {
      if (values.id === productId) {
        return values;
      }
    });
    var temp1 = 0,
      temp2 = 0;
    if (local) {
      data.forEach((values, index) => {
        if (values.favourite.length <= 0) {
          var object = {
            date: this.state.currentDateTime,
            img: local.img,
            email: local.email,
          };
          console.log(object);
          this.state.array.push(object);
          product.forEach((values, index) => {
            if (values.id === productId) {
              //values.question = this.state.array;
              values.favourite.push(object);
              console.log(values);
              this.props.onQuestion(values);
            }
          });
        } else {
          values.favourite.forEach((valuess, index) => {
            if (valuess.email.toLowerCase() === local.email.toLowerCase()) {
              temp1 = 1;
            } else {
              temp2 = 1;
            }
          });
        }
      });
      if (temp1 === 0 && temp2 === 1) {
        var object = {
          date: this.state.currentDateTime,
          img: local.img,
          email: local.email,
        };
        console.log(object);
        this.state.array.push(object);
        product.forEach((values, index) => {
          if (values.id === productId) {
            //values.question = this.state.array;
            values.favourite.push(object);
            console.log(values);
            this.props.onQuestion(values);
          }
        });
      }
    } else {
      alert("You need to be signin before executing this function ");
    }
  };
  onChange = (e) => {
    var { target } = e;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };
  onSubmitQuestion = (e) => {
    e.preventDefault();
    var local = JSON.parse(localStorage.getItem("statusLogin"));
    console.log(this.state.question);
    var { product } = this.props;
    var { productId } = this.props.match.params;
    var data = product.filter((values, index) => {
      if (values.id === productId) {
        return values;
      }
    });
    var count = 0,
      count2 = 0;
    var resultDateCurrent = this.state.currentDateTime.split(",");
    data.forEach((values, index) => {
      values.question.forEach((valuess, index) => {
        var resultDate = valuess.date.split(",");
        if (valuess.email === local.email) {
          // this.setState({
          //   countQuestion: this.state.countQuestion + 1,
          // });
          count++;
        }
        if (resultDate === resultDateCurrent) {
          count2++;
        }
      });
    });
    if (local) {
      if (count <= 2 && count2 <= 2) {
        var object = {
          data: this.state.question,
          date: this.state.currentDateTime,
          img: local.img,
          email: local.email,
        };
        console.log(object);
        this.state.array.push(object);
        product.forEach((values, index) => {
          if (values.id === productId) {
            //values.question = this.state.array;
            values.question.push(object);
            console.log(values);
            this.props.onQuestion(values);
          }
        });
      }
    } else {
      alert("You need to be signin before executing this function ");
    }
    this.setState({
      question: "",
    });
  };
  onSubmitFeedback = (e) => {
    e.preventDefault();
    var local = JSON.parse(localStorage.getItem("statusLogin"));
    console.log(this.state.question);
    var { product } = this.props;
    var { productId } = this.props.match.params;
    var data = product.filter((values, index) => {
      if (values.id === productId) {
        return values;
      }
    });
    var count = 0,
      count2 = 0;
    var resultDateCurrent = this.state.currentDateTime.split(",");
    data.forEach((values, index) => {
      values.feedback.forEach((valuess, index) => {
        var resultDate = valuess.date.split(",");
        if (valuess.email === local.email) {
          // this.setState({
          //   countQuestion: this.state.countQuestion + 1,
          // });
          count++;
        }
        if (resultDate === resultDateCurrent) {
          count2++;
        }
      });
    });
    if (local) {
      if (count <= 2 && count2 <= 2) {
        var object = {
          data: this.state.feedback,
          date: this.state.currentDateTime,
          img: local.img,
          email: local.email,
        };
        console.log(object);
        this.state.array.push(object);
        product.forEach((values, index) => {
          if (values.id === productId) {
            //values.feedback = this.state.array;
            values.feedback.push(object);
            console.log(values);
            this.props.onQuestion(values);
          }
        });
      }
    } else {
      alert("You need to be signin before executing this function ");
    }
    this.setState({
      feedback: "",
    });
  };
  handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  handleClick = () => {
    console.info("You clicked the Chip.");
  };
  handleChangeIndex = (index) => {
    this.setState({
      value: index,
    });
  };
  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };
  onClickByNow = (data, temp, nameIdParent) => {
    var object = {};
    console.log(data);
    if (temp === 0) {
      data.forEach((values, index) => {
        object = {
          id: values.id,
          name: values.name,
          price: values.price,
          img: values.productPictures[0].img,
          quantity: 1,
          nameIdParent: nameIdParent,
        };
      });
      this.props.onCart(object);
      this.props.history.push(`/cart`);
      //return <Redirect to="/cart"></Redirect>;
    } else {
      //return <Redirect to="/cart"></Redirect>;
      this.props.history.push(`/cart`);
    }
    console.log(object);
  };
  onClickAddToCart = (data) => {
    var object = {};
    console.log(data);
    data.forEach((values, index) => {
      object = {
        id: values.id,
        name: values.name,
        price: values.price,
        img: values.productPictures[0].img,
      };
    });
    this.props.onCart(object);
    console.log(object);
  };
  componentDidMount() {
    this.props.onProductAPI();
  }
  showStar = (data) => {
    var result = [];
    for (var i = 0; i < data; i++) {
      result.push(<Star className="star" />);
    }
    for (var j = 0; j < 5 - data; j++) {
      result.push(<StarBorder />);
    }
    return result;
  };
  onClickImage = (index, array) => {
    var data = array[index].img;
    var image = require(`./../../assets/images/${data}`);
    this.setState({
      imageData: image,
    });
  };
  render() {
    var resultSplit, resultDateSplitNow, count;
    var { productId } = this.props.match.params;
    var date = [...this.state.currentDateTime];
    var saveDate = [...date];
    console.log(productId);
    var temp = 0;
    var { product, category } = this.props;
    var status = JSON.parse(localStorage.getItem("productStatus"));
    var cart = JSON.parse(localStorage.getItem("cart"));
    var productStatus = status ? status : 0;
    console.log(category);
    console.log(this.props);
    console.log(productId);
    console.log(product);
    var data = product.filter((values, index) => {
      if (values.id === productId) {
        return values;
      }
    });
    // lấy ra object thằng cha của thằng sp này để lấy ra name
    var objectNameCategory = {};
    var objectNameIdParent = {};
    var nameCurrent, nameIdParent, idParent;
    category.forEach((values, index) => {
      data.forEach((valuess, index) => {
        if (values.id === valuess.categoryID) {
          objectNameCategory = values;
        }
      });
    });
    console.log(objectNameCategory);
    nameCurrent = objectNameCategory.name;
    idParent = objectNameCategory.idParent;
    category.forEach((values, index) => {
      if (values.id === idParent) {
        objectNameIdParent = values;
      }
    });
    console.log(objectNameIdParent);
    nameIdParent = objectNameIdParent.name;
    console.log(nameIdParent);
    console.log(nameCurrent);
    console.log(data);
    var array = [];
    data.forEach((values, index) => {
      array = values.productPictures;
    });
    var result = data.map((values, index) => {
      console.log(values.productPictures);
      var resultImage = values.productPictures.map((valuess, index) => {
        var image = require(`./../../assets/images/${valuess.img}`);
        return (
          <div key={index} className="pictures__container">
            <img
              className="picture"
              id="pic1"
              onClick={() => this.onClickImage(index, array)}
              key={index}
              src={image.default}
              alt={valuess.img}
            />
          </div>
        );
      });
      return resultImage;
    });
    return (
      <Layout>
        <main id="watch_product_main">
          <div className="watch_product_body">
            <section className="product-details__section">
              <div className="product-detail__container">
                <div className="product-detail__left">
                  <div className="details__container--left">
                    <div className="product__pictures">{result}</div>

                    <div className="product__picture" id="product__picture">
                      <div className="picture__container">
                        {this.state.imageData.length <= 0 ? (
                          data &&
                          data.map((values, index) => {
                            var image = require(`./../../assets/images/${values.productPictures[0].img}`);
                            return (
                              <img
                                className="image_product_watch"
                                key={index}
                                id="pic"
                                src={image.default}
                                alt={`${values.productPictures[0].img}`}
                              />
                            );
                          })
                        ) : (
                          <img
                            className="image_product_watch"
                            id="pic"
                            src={this.state.imageData.default}
                            alt=""
                          />
                        )}
                      </div>
                    </div>

                    <div className="zoom" id="zoom"></div>
                  </div>

                  <div className="product-details__btn">
                    {cart &&
                      cart.map((values, index) => {
                        if (values.id === productId) {
                          temp = 1;
                          return (
                            <a
                              key={index}
                              className={`product__btn_product`}
                              data-id=""
                            >
                              <ShoppingCartIcon className="margin-right-10" />
                              IN CART
                            </a>
                          );
                        }
                      })}
                    {temp === 0 ? (
                      <a
                        onClick={() => this.onClickAddToCart(data)}
                        className={`product__btn_product add`}
                        data-id=""
                      >
                        <ShoppingCartIcon className="margin-right-10" />
                        ADD TO CART
                      </a>
                    ) : (
                      ""
                    )}
                    <a
                      className="buy_now buy"
                      onClick={() =>
                        this.onClickByNow(data, temp, nameIdParent)
                      }
                    >
                      <CreditCardIcon className="margin-right-10" />
                      BUY NOW
                    </a>
                  </div>
                </div>

                <div className="product-detail__right">
                  {data.map((values, index) => {
                    return (
                      <div key={index} className="product-detail__content">
                        <div className="breed">
                          <ul>
                            <li>
                              <a href="#">Home</a>
                              <IoIosArrowForward />
                            </li>
                            <li>
                              <a href="#">{nameIdParent}</a>
                              <IoIosArrowForward />
                            </li>
                            <li>
                              <a href="#">{nameCurrent}</a>
                              <IoIosArrowForward />
                            </li>
                            <li>
                              <a href="#">
                                <div>{values.name}</div>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <h3 className="title_product">{values.name}</h3>

                        <div className="price">
                          <span className="new__price price_product">
                            {values.price * ((100 - values.sales) / 100)}$
                          </span>
                        </div>

                        <div className="product__review">
                          <div className="rating">
                            {this.showStar(values.star)}
                          </div>
                          <a href="#" className="rating__quatity">
                            {values.star} reviews
                          </a>
                        </div>

                        <p>{values.description}</p>

                        <div className="product__info-container">
                          <ul className="product__info">
                            <li>
                              <p>Old Price:</p>
                              <a href="#" className="priceOld_product">
                                {values.price}$
                              </a>
                            </li>
                            <li>
                              <p>Quantity:</p>
                              <a className="origin_product" href="#">
                                {values.quantity}
                              </a>
                            </li>
                            <li>
                              <p>Product Type:</p>
                              <a className="category_product" href="#">
                                {nameCurrent}
                              </a>
                            </li>
                            <li>
                              <p>Availability:</p>
                              <a href="#" className="in-stock">
                                In Stock (7 Items)
                              </a>
                            </li>
                          </ul>

                          <div className="product-info__btn">
                            <a href="#">
                              <LocalShippingIcon className="margin-right-10" />
                              Shipping
                            </a>
                            <a href="#">
                              <EmailIcon className="margin-right-10" />
                              Ask About This Product
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {data.map((values, index) => {
                var image = require(`./../../assets/images/${values.productPictures[0].img}`);
                return (
                  <div className="root">
                    <AppBar position="static" color="default">
                      <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="scrollable force tabs example"
                      >
                        <Tab
                          label="Contact"
                          icon={<PhoneIcon />}
                          {...a11yProps(0)}
                        />
                        <Tab
                          label="Product Details "
                          icon={<ListAltIcon />}
                          {...a11yProps(1)}
                        />
                        <Tab
                          label="Question"
                          icon={<HelpIcon />}
                          {...a11yProps(2)}
                        />
                        <Tab
                          label="Feedback"
                          icon={<FeedbackIcon />}
                          {...a11yProps(3)}
                        />
                        <Tab
                          label="Favourite"
                          icon={<FavoriteIcon />}
                          {...a11yProps(4)}
                        />
                        <Tab
                          label="Item Six"
                          icon={<ThumbDown />}
                          {...a11yProps(5)}
                        />
                        <Tab
                          label="Item Seven"
                          icon={<ThumbUp />}
                          {...a11yProps(6)}
                        />
                      </Tabs>
                    </AppBar>
                    <TabPanel
                      className="parent_tab"
                      value={this.state.value}
                      index={0}
                    >
                      <List className="child_tab">
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <img src={store} alt="" />
                            </Avatar>
                          </ListItemAvatar>
                          <div className="content">
                            <div className="content_tab">{values.contact}</div>
                            <div>{values.currentTime}</div>
                          </div>
                        </ListItem>
                      </List>
                    </TabPanel>
                    <TabPanel
                      className="parent_tab"
                      value={this.state.value}
                      index={1}
                    >
                      <List className="child_tab">
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <img
                                className="description_tab"
                                src={image.default}
                                alt=""
                              />
                            </Avatar>
                          </ListItemAvatar>
                          <div className="content">
                            <div className="content_tab">
                              {values.description}
                            </div>
                            {values.currentTime}
                          </div>
                        </ListItem>
                      </List>
                    </TabPanel>
                    <TabPanel
                      className="parent_tab"
                      value={this.state.value}
                      index={2}
                    >
                      <List className="child_tab">
                        <form
                          onSubmit={this.onSubmitQuestion}
                          className="form_question"
                        >
                          <input
                            type="text"
                            className="question_input"
                            name="question"
                            value={this.state.question}
                            onChange={this.onChange}
                            placeholder="Question input here.."
                          />
                          <button type="submit" class="button">
                            Sent
                          </button>
                        </form>
                        {values.question &&
                          values.question.map((valuesssss, index) => {
                            var image = require(`./../../assets/images/${valuesssss.img}`);
                            return (
                              <ListItem className="list_question" key={index}>
                                <img
                                  className="question_image"
                                  src={image.default}
                                  alt=""
                                />
                                <div className="content">
                                  <div className="content_tab">
                                    {valuesssss.email} : {valuesssss.data}
                                  </div>
                                  <div>{valuesssss.date}</div>
                                </div>
                              </ListItem>
                            );
                          })}
                      </List>
                    </TabPanel>
                    <TabPanel
                      className="parent_tab"
                      value={this.state.value}
                      index={3}
                    >
                      <List className="child_tab">
                        <form
                          onSubmit={this.onSubmitFeedback}
                          className="form_question"
                        >
                          <input
                            type="text"
                            className="question_input"
                            name="feedback"
                            value={this.state.feedback}
                            onChange={this.onChange}
                            placeholder="Feedback input here.."
                          />
                          <button type="submit" class="button">
                            Sent
                          </button>
                        </form>
                        {values.feedback &&
                          values.feedback.map((valuesssss, index) => {
                            var image = require(`./../../assets/images/${valuesssss.img}`);
                            return (
                              <ListItem className="list_question" key={index}>
                                <img
                                  className="question_image"
                                  src={image.default}
                                  alt=""
                                />
                                <div className="content">
                                  <div className="content_tab">
                                    {valuesssss.email} : {valuesssss.data}
                                  </div>
                                  <div>{valuesssss.date}</div>
                                </div>
                              </ListItem>
                            );
                          })}
                      </List>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={4}>
                      <div className="heard">
                        <div className="heard_title">Click</div>
                        <div
                          onClick={this.onClickFavourite}
                          className="header__cart-container_heard"
                        >
                          <FavoriteIcon className="cart_icon_heard" />
                          <span className="header__cart-notice_heard">
                            {values.favourite.length}
                          </span>
                        </div>
                        <div className="heard_title">
                          to vote for this product
                        </div>
                      </div>
                      <List className="child_tab">
                        {values.favourite &&
                          values.favourite.map((valuesssss, index) => {
                            var image = require(`./../../assets/images/${valuesssss.img}`);
                            return (
                              <ListItem className="list_question" key={index}>
                                <img
                                  className="question_image"
                                  src={image.default}
                                  alt=""
                                />
                                <div className="content">
                                  <div className="content_tab">
                                    {valuesssss.email} : voted 1 favorite for
                                    this product
                                  </div>
                                  <div>{valuesssss.date}</div>
                                </div>
                              </ListItem>
                            );
                          })}
                      </List>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={5}>
                      <div className="heard">
                        <div className="heard_title">Click</div>
                        <div
                          onClick={this.onClickDislike}
                          className="header__cart-container_heard"
                        >
                          <ThumbDownIcon className="cart_icon_heard" />
                          <span className="header__cart-notice_heard">
                            {values.dislike.length}
                          </span>
                        </div>
                        <div className="heard_title">
                          to vote for this product
                        </div>
                      </div>
                      <List className="child_tab">
                        {values.dislike &&
                          values.dislike.map((valuesssss, index) => {
                            var image = require(`./../../assets/images/${valuesssss.img}`);
                            return (
                              <ListItem className="list_question" key={index}>
                                <img
                                  className="question_image"
                                  src={image.default}
                                  alt=""
                                />
                                <div className="content">
                                  <div className="content_tab">
                                    {valuesssss.email} : voted 1 dislike for
                                    this product
                                  </div>
                                  <div>{valuesssss.date}</div>
                                </div>
                              </ListItem>
                            );
                          })}
                      </List>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={6}>
                      <div className="heard">
                        <div className="heard_title">Click</div>
                        <div
                          onClick={this.onClickLike}
                          className="header__cart-container_heard"
                        >
                          <ThumbUpAltIcon className="cart_icon_heard" />
                          <span className="header__cart-notice_heard">
                            {values.like.length}
                          </span>
                        </div>
                        <div className="heard_title">
                          to vote for this product
                        </div>
                      </div>
                      <List className="child_tab">
                        {values.like &&
                          values.like.map((valuesssss, index) => {
                            var image = require(`./../../assets/images/${valuesssss.img}`);
                            return (
                              <ListItem className="list_question" key={index}>
                                <img
                                  className="question_image"
                                  src={image.default}
                                  alt=""
                                />
                                <div className="content">
                                  <div className="content_tab">
                                    {valuesssss.email} : voted 1 like for this
                                    product
                                  </div>
                                  <div>{valuesssss.date}</div>
                                </div>
                              </ListItem>
                            );
                          })}
                      </List>
                    </TabPanel>
                  </div>
                );
              })}
            </section>
          </div>
        </main>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    product: state.product,
    category: state.category,
    cart: state.cart,
    favourite: state.favourite,
    signin: state.signin,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onProductAPI: () => {
      dispatch(actions.productAPI());
    },
    onCart: (data) => {
      dispatch(actions.cartReducers(data));
    },
    onQuestion: (data) => {
      dispatch(actions.questionAPI(data));
    },
    onFavourite: (data) => {
      dispatch(actions.favouriteReducers(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsPage);
