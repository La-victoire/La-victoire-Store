import React, { useContext } from "react";
import "swiper/swiper-bundle.css"; // Ensure Swiper styles are imported
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Import directly from 'swiper/modules'
import { ProductContext } from "./ProductProvider";
import { Link } from "react-router-dom";

const Hero = () => {
  const { products } = useContext(ProductContext);

  // Guard against missing or undefined products
  const limit = [
    products[110] ?? {},
    products[3] ?? {},
    products[70] ?? {},
    products[30] ?? {},
  ];

  return (
    <Swiper
      modules={[Pagination, Autoplay]} // Add modules here
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={true}
      className="w-full h-[80vh]"
    >
      {limit.map((product, index) => (
        <SwiperSlide key={index} className="relative">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${product?.images || "/placeholder.jpg"})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative text-center text-gold flex items-center justify-center flex-col h-full">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {product?.category ?? "Category"}
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Explore the best in {product?.category ?? "this category"}.
              </p>
              <Link to={product.category} >
              <button  className="px-6 py-2 bg-gold text-white rounded-md hover:bg-yellow-500 transition">
                Shop Now
              </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
