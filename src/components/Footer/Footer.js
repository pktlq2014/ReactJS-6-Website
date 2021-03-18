import React, { Component } from "react";
import MailIcon from '@material-ui/icons/Mail';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import './styles.css'
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BusinessIcon from '@material-ui/icons/Business';
class Footer extends Component {
  render() {
    return (
      <div id="footer" className="section footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer-top__box">
              <h5>EXTRAS</h5>
              <a href="#">Brands</a>
              <a href="#">Gift Certificates</a>
              <a href="#">Affiliate</a>
              <a href="#">Specials</a>
              <a href="#">Site Map</a>
            </div>

            <div className="footer-top__box">
              <h5>INFORMATION</h5>
              <a href="#">About Us</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
              <a href="#">Contact Us</a>
              <a href="#">Site Map</a>
            </div>

            <div className="footer-top__box">
              <h5>MY ACCOUNT</h5>
              <a href="#">My Account</a>
              <a href="#">Order History</a>
              <a href="#">Wish List</a>
              <a href="#">Newsletter</a>
              <a href="#">Returns</a>
            </div>

            <div className="footer-top__box">
              <h5>CONTACT US</h5>
              <div>
                <div>
                  <LocationOnIcon className="icon"/>
                </div>
                <div>27/27, Ngo Y Linh street, An Lac ward, Binh Tan district.</div>
              </div>
              <div>
                <div>
                  <MailIcon className="icon"/>
                </div>
                <div>anhhung_so11@yahoo.com.</div>
              </div>
              <div>
                <div>
                  <PhoneIcon className="icon"/>
                </div>
                <div>038-494-3497.</div>
              </div>
              <div>
                <div>
                  <LocationCityIcon className="icon"/>
                </div>
                <div>Ho Chi Minh City, VietNam.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer-bottom__box"></div>
          <div className="footer-bottom__box"></div>
        </div>
      </div>
    );
  }
}

export default Footer;
