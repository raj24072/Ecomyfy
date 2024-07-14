import React from "react";
import Slider from "react-slick";

function HeroSection() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    // Slidebar component
    <div className="w-[100%] overflow-hidden h-[250px] md:h-[500px]">
      <Slider {...settings}>
        <div className="h-[240px] md:h-[490px] object-cover">
          <img
            className="h-[102.5%] w-full"
            loading="lazy"
            src="https://plus.unsplash.com/premium_photo-1677995700941-100976883af7?q=80&w=1523&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <div className="h-[240px] md:h-[490px]">
          <img
            className="h-[102.5%] w-full"
            loading="lazy"
            src="https://plus.unsplash.com/premium_photo-1670863088251-500151f2117b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <div className="h-[240px] md:h-[490px]">
          <img
            className="h-[102.5%] w-full"
            loading="lazy"
            src="https://plus.unsplash.com/premium_photo-1664475347754-f633cb166d13?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <div className="h-[240px] md:h-[490px]">
          <img
            className="h-[102.5%] w-full"
            loading="lazy"
            src="https://plus.unsplash.com/premium_photo-1661484711690-3f3f6c7d7c8f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </Slider>
    </div>
  );
}

export default HeroSection;
