import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          page: {
            title: "title",
            banner: [
              {
                img: "banner1.jpg",
              },
              {
                img: "banner2.jpg",
              },
              {
                img: "banner3.jpg",
              },
              {
                img: "banner4.jpg",
              },
              {
                img: "banner5.jpg",
              },
              {
                img: "banner6.jpg",
              },
              {
                img: "banner7.jpg",
              },
            ],
          },
        },
      ],
    };
  }
  render() {
    var { data } = this.state;
    console.log(data);
    return (
      <div>
        {
          data.map((values, index) => {
            return <h3>{values.page.title}</h3>;
          })
        }
        {data.map((values, index) => {
          return (
              <Carousel renderThumbs={() => {}}>
                {values.page.banner &&
                  values.page.banner.map((valuess, index) => {
                    console.log(valuess.img);
                    var image = require(`./../../../assets/images/${valuess.img}`);
                    return (
                      <a style={{ display: "block" }} key={index}>
                        <img src={image.default} alt="" />
                      </a>
                    );
                  })}
              </Carousel>
          );
        })}
      </div>
    );
  }
}

export default ProductPage;
