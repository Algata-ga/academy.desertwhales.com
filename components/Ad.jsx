import style from "../styles/Ad.module.css";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper";
import Image from "next/image";
import banner from "..//public/hdf.png";
const Ad = ({ ads }) => {
    return (
        <div className={style.adsec}>
            <div className={style.adcontain}>
                <Swiper
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >
                    {ads.map((x) => (
                        <SwiperSlide key={x.title}>
                            <Image src={x.image} alt={x.title} layout="fill" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Ad;

