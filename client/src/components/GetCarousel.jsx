import React from "react";
import { Carousel } from "antd";

// Styling for carousel
const contentStyle = {
  height: "80vh",
  color: "#fff",
  lineHeight: "80vh",
  textAlign: "center",
  background: "#364d79",
};

function GetCarousel() {
  return (
    <div>
      <Carousel autoplay autoplaySpeed={2000} fade>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>
  );
}

export default GetCarousel;
