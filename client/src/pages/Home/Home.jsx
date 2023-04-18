import React from "react";
import Carousel from "../../components/GetCarousel";
import Navbar from "../../components/Navbar";

function Home() {
  return (
    <>
      <div>
        <Navbar />
        <div>
          <Carousel />
        </div>
      </div>
    </>
  );
}

export default Home;
