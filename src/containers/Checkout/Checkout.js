import React, { Component } from "react";
import "./styles.css";
import Layout from "./../../components/Layout/layout";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
class Checkout extends Component {
  render() {
    const dataLogin = JSON.parse(localStorage.getItem("statusLogin"));
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Layout>
    );
  }
}

export default Checkout;
