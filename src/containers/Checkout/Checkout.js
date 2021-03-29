import React, { Component } from "react";
import "./styles.css";
import Layout from "./../../components/Layout/layout";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
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
    };
  }
  onClickDelete = (index) => {
    console.log(index);
    var id;
    var dataLogin = JSON.parse(localStorage.getItem("statusLogin"));
    var {signin} = this.props;
    signin.forEach((values, index1) => {
      if(values.email === dataLogin.email) {
        values.address.splice(index, 1);
       // console.log(values.address[index]);
       this.props.onAddress(values);
      }
    });
  }
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
        array.push({id: values.address.length + 1, name: this.state.address });
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
            <AccordionDetails id="panel1a-header-child">
              <Typography className="checkout_parent_content">
                Username : {dataLogin.email}
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
                      placeholder="Address input here including: house number, street, ward, county, city where you live "
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
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    address: state.address,
    signin: state.signin,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddress: (data) => {
      dispatch(actions.updateCategoryAPI(data));
    },
    onDeleteAddress: (data) => {
      dispatch(actions.deleteCategoryAPI(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
